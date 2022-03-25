import { isAddress } from "@vanilladefi/core-sdk";
import { getJuiceStakingContract } from "@vanilladefi/stake-sdk";
import { GetStaticProps } from "next";
import { FC, useEffect } from "react";
import { snapshot, useSnapshot } from "valtio";
import { JuicingIcon } from "../assets";
import { ArrowLink } from "../components/ArrowLink";
import { AvailableStakes } from "../components/AvailableStakes";
import Box from "../components/Box";
import Container from "../components/Container";
import Flex from "../components/Flex";
import Heading from "../components/Heading";
import Leaderboard, { ILeaderboard } from "../components/Leaderboard";
import { MyStakes } from "../components/MyStakes";
import Stack from "../components/Stack";
import Text from "../components/Text";
import { GetAssetPairsDocument } from "../generated/graphql";
import { fetchLeaderboard } from "../lib/fetch-leaderboard";
import { state, VanillaEvents } from "../state";
import { fetchStakes } from "../state/actions/stakes";
import { connectWallet } from "../state/actions/wallet";
import client, { ssrCache } from "../urql";
import { emitEvent } from "../utils/helpers";

const StakingIntro = () => (
  <Stack
    css={{
      py: "$16",
      flexDirection: "column-reverse",
      flex: 1,
      "@md": {
        flexDirection: "row",
      },
    }}
  >
    <Stack
      css={{
        width: "70%",
        flexDirection: "column",
        gap: "$8",
      }}
    >
      <Heading css={{ fontSize: "$6xl", maxWidth: "300px" }}>
        Start
        <br /> Staking
      </Heading>
      <Text
        css={{
          fontWeight: 300,
          fontSize: "$2xl",
          color: "$offWhite85",
          maxWidth: "450px",
        }}
      >
        Create an investment portfolio by staking $JUICE. Earn rewards.
      </Text>
      <Stack
        css={{
          flexDirection: "column",
          gap: "$3",
          mt: "$3",
          alignItems: "flex-start",
        }}
      >
        <Flex css={{ flexDirection: "column" }}>
          <ArrowLink href="/litepaper" text="Read the Litepaper" />
          {/* {!snap.walletAddress && ( */}
          <ArrowLink
            onClick={() => connectWallet()}
            text="Connect wallet to stake"
          />
          {/* )} */}
        </Flex>
      </Stack>
    </Stack>
    <Flex
      css={{
        width: "30%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        css={{
          position: "relative",
          width: "153px",
          height: "199px",
        }}
      >
        <JuicingIcon />
      </Box>
    </Flex>
  </Stack>
);

const Stake: FC<{ leaderboard?: ILeaderboard }> = ({ leaderboard }) => {
  const { walletAddress, signer, polygonProvider } = useSnapshot(state);

  useEffect(() => {
    if (!walletAddress) return;

    const contractAddress = isAddress(
      process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || ""
    );
    const contract = getJuiceStakingContract({
      signerOrProvider: signer || polygonProvider || undefined,
      optionalAddress: contractAddress || undefined,
    });
    if (!contract) return;

    const onStakesChange = (user: string) => {
      const { walletAddress } = snapshot(state);
      // Check that the event was created by the logged in user
      if (user.toLowerCase() === walletAddress?.toLowerCase()) {
        emitEvent(VanillaEvents.stakesChanged);
      }
    };

    contract.on("StakeAdded", onStakesChange);
    contract.on("StakeRemoved", onStakesChange);

    return () => {
      contract.off("StakeAdded", onStakesChange);
      contract.off("StakeRemoved", onStakesChange);
    };
  }, [polygonProvider, signer, walletAddress]);

  useEffect(() => {
    const onStakesChange = () => {
      fetchStakes();
    };
    window.addEventListener(VanillaEvents.stakesChanged, onStakesChange);
    return () => {
      window.removeEventListener(VanillaEvents.stakesChanged, onStakesChange);
    };
  }, []);

  return (
    <>
      <Flex
        css={{
          backgroundColor: "rgba(255, 201, 170, 0.02)",
        }}
      >
        <Container>{walletAddress ? <MyStakes /> : <StakingIntro />}</Container>
      </Flex>
      <AvailableStakes />
      <Flex
        css={{
          py: "$5",
          width: "100%",
          borderTop: "1px solid $extraMuted",
        }}
      >
        <Container>
          {leaderboard && <Leaderboard {...leaderboard} />}
        </Container>
      </Flex>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    await client.query(GetAssetPairsDocument).toPromise();
  } catch (err) {
    console.warn(err);
  }
  return {
    props: {
      // urql uses this to rehydrate cache
      urqlState: ssrCache.extractData(),
      leaderboard: await fetchLeaderboard(),
    },
    revalidate: 10 * 60, // rebuild every 10 minutes
  };
};

export default Stake;
