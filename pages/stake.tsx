import Flex from "../components/Flex";
import Heading from "../components/Heading";
import Text from "../components/Text";

import { GetAssetPairsDocument } from "../generated/graphql";
import client, { ssrCache } from "../urql";
import { useSnapshot } from "valtio";
import { state } from "../state";
import Stack from "../components/Stack";
import { JuicingIcon } from "../assets";
import { GetStaticProps } from "next";
import { ArrowLink } from "../components/ArrowLink";
import Container from "../components/Container";
import { connectWallet } from "../state/actions/wallet";
import Box from "../components/Box";
import { MyStakes } from "../components/MyStakes";
import { AvailableStakes } from "../components/AvailableStakes";

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
          <ArrowLink text="Read more" />
          {/* {!snap.walletAddress && ( */}
          <ArrowLink onClick={() => connectWallet()} text="Connect Wallet" />
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

const Stake = () => {
  const snap = useSnapshot(state);

  return (
    <>
      <Flex
        css={{
          backgroundColor: "rgba(255, 201, 170, 0.02)",
        }}
      >
        <Container>
          {snap.walletAddress ? <MyStakes /> : <StakingIntro />}
        </Container>
      </Flex>
      <AvailableStakes />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    await client.query(GetAssetPairsDocument).toPromise();
    return {
      props: {
        // urql uses this to rehydrate cache
        urqlState: ssrCache.extractData(),
      },
      revalidate: 60,
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
      revalidate: 60,
    };
  }
};

export default Stake;
