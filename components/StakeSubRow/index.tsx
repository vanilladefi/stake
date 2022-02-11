import * as sdk from "@vanilladefi/stake-sdk";
import Image from "next/image";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Row } from "react-table";
import { useSnapshot } from "valtio";
import { state } from "../../state";
import { showDialog } from "../../state/actions/dialog";
import { connectWallet } from "../../state/actions/wallet";
import tokens from "../../tokensV2";
import { parseJuice } from "../../utils/helpers";
import Box from "../Box";
import Button from "../Button";
import Flex from "../Flex";
import Input from "../Input";
import Text from "../Text";

export type ColumnType = {
  __typename?: "AssetPair";
  id: string;
  currentPrice: any;
  juiceStake?: string;
  juiceValue?: string;
  sentiment?: "long" | "short";
  decimals: number;
  roundId: any;
  hourRoundId: number;
  timestamp: any;
  hourlyHistory: Array<{
    __typename?: "HourlyPriceHistory";
    hourStamp: any;
    id: string;
    openingPrice: any;
    closingPrice: any;
    lowPrice: any;
    highPrice: any;
    timestamp: any;
  }>;
};

interface SubRowProps {
  row: Row<ColumnType>;
  defaultStake?: string;
  type?: "edit" | "make";
}

const StakeSubRow: FC<SubRowProps> = ({
  row,
  type = "make",
  defaultStake = "",
}) => {
  const { signer } = useSnapshot(state);

  const [stakeAmount, setStakeAmount] = useState(defaultStake);
  const [stakePosition, setStakePosition] = useState<"long" | "short">("long");
  const [stakePending, setStakePending] = useState(false);
  const [stakingDisabled, setStakingDisabled] = useState(true);
  const [closingDisabled, setClosingDisabled] = useState(true);

  useEffect(() => {
    const _disabled = !(stakeAmount && +stakeAmount) || stakePending;
    if (_disabled && !stakingDisabled) setStakingDisabled(true);
    else if (!_disabled && stakingDisabled) setStakingDisabled(false);
  }, [stakingDisabled, setStakingDisabled, stakeAmount, stakePending]);

  useEffect(() => {
    const _disabled = stakePending;
    if (_disabled && !closingDisabled) setClosingDisabled(true);
    else if (!_disabled && closingDisabled) setClosingDisabled(false);
  }, [stakePending, closingDisabled]);

  const modifyStake = useCallback(async () => {
    if (stakingDisabled) return;

    if (!signer) {
      return connectWallet();
    }

    const token = tokens
      // .filter((t) => t.enabled)
      .find((t) => t.id === row.original.id.split("/")[0])?.address;

    if (!token) {
      // TODO Something better
      return showDialog("Invalid operation", {
        body: "Token is not available to stake yet",
      });
    }

    setStakePending(true);
    try {
      const amount = parseJuice(stakeAmount).toString();
      const sentiment = stakePosition === "short" ? false : true;

      const stake = { token, amount, sentiment };

      const tx = await sdk.modifyStake(stake, { signerOrProvider: signer });
      const res = await tx.wait();
      if (res.status === 1) {
        showDialog("Successs", {
          body: "Transaction was successful, [LINK]",
        });
      } else {
        showDialog("Error", {
          body: "Transaction failed, [LINK]",
        });
      }
    } catch (error) {
      console.warn(error);
      let body = (error as any)?.data?.message || "Something went wrong!";
      showDialog("Error", { body });
    }
    setStakePending(false);
  }, [stakingDisabled, row.original.id, signer, stakeAmount, stakePosition]);

  const closeStakePosition = useCallback(async () => {
    if (closingDisabled) return;

    if (!signer) {
      return connectWallet();
    }

    const token = tokens
      // .filter((t) => t.enabled)
      .find((t) => t.id === row.original.id.split("/")[0])?.address;

    if (!token) {
      // TODO Something better
      return showDialog("Error", {
        body: "Not allowed as of now!",
      });
    }
    setStakePending(true);
    try {
      const stake = { token, amount: 0, sentiment: false };
      console.log("Callin sdk with stake: ", stake);

      const tx = await sdk.modifyStake(stake, { signerOrProvider: signer });
      const res = await tx.wait();

      if (res.status === 1)
        showDialog("Success", {
          body: "Stake position closed",
        });
      else
        showDialog("Error", {
          body: "Transaction failed [LINK]",
        });
    } catch (error) {
      showDialog("Error", {
        body: error as any,
      });
    }

    setStakePending(false);
  }, [closingDisabled, signer, row.original.id]);

  return (
    <Flex
      css={{
        flex: 1,
        boxShadow: "inset 0px 0px 0px 1px $colors$extraMuted",
        background: "$background",
      }}
    >
      <Flex
        css={{
          p: "0px $5",
          borderRight: "1px solid $colors$extraMuted",
          alignItems: "center",
        }}
      >
        <Text css={{ color: "$muted", fontSize: "$xl", mr: "$2" }}>Stake</Text>
        <Input
          disabled={stakePending}
          size="lg"
          type="number"
          placeholder="100"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          css={{ width: "200px", textAlign: "right", mx: "$3" }}
        />{" "}
        <Image
          alt="Vanilla drop icon"
          width="20px"
          height="20px"
          src="/vanilla-drop.svg"
        />
      </Flex>
      <Box css={{ p: "$5" }}>
        <Text css={{ color: "$muted", fontSize: "$xl", mr: "$5" }}>To</Text>
        <Button
          onClick={() => setStakePosition("long")}
          outline
          disabled={stakePending}
          uppercase
          size="sm"
          css={{
            width: "90px",
          }}
          active={stakePosition === "long"}
        >
          Long
        </Button>
        <Button
          onClick={() => setStakePosition("short")}
          outline
          uppercase
          disabled={stakePending}
          size="sm"
          css={{
            width: "90px",
          }}
          active={stakePosition === "short"}
        >
          Short
        </Button>
      </Box>
      <Flex
        css={{
          p: "$5",
          alignItems: "center",
          borderRight: "1px solid $colors$extraMuted",
          flex: 1,
        }}
      >
        <Box
          css={{
            width: "24px",
            height: "24px",
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            position: "relative",
            overflow: "hidden",
            padding: "3px",
          }}
        >
          {tokens.find((tt) => tt.id === row.original.id.split("/")[0])
            ?.imageUrl ? (
            <Image
              width="18px"
              height="18px"
              layout="fixed"
              objectFit="cover"
              src={`/token-assets/${row.original.id.split("/")[0]}.png`}
              alt="Token icon"
            />
          ) : null}
        </Box>
        <Box css={{ ml: "10px" }}>
          {
            tokens.find((token) => token.id === row.original.id.split("/")[0])
              ?.name
          }
        </Box>
      </Flex>
      {type === "edit" ? (
        stakePending ? (
          <Flex justify="center" align="center" css={{ width: "220px" }}>
            Pending...
          </Flex>
        ) : (
          <>
            <Button
              ghost
              variant="primary"
              disabled={closingDisabled}
              onClick={closeStakePosition}
              css={{
                color: "$red",
                width: "120px",
                marginRight: "1px",
                height: "auto",
                px: "0",
                fontSize: "15px",
                fontWeight: 300,
                textAlign: "center",
                borderRight: "1px solid $extraMuted",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Close position
            </Button>
            <Button
              ghost
              variant="primary"
              disabled={stakingDisabled}
              onClick={modifyStake}
              css={{
                width: "100px",
                marginRight: "1px",
                height: "auto",
                px: "0",
                fontSize: "15px",
                fontWeight: 300,
                textAlign: "center",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Save
            </Button>
          </>
        )
      ) : (
        <Button
          ghost
          variant="primary"
          disabled={stakingDisabled}
          onClick={modifyStake}
          css={{
            width: "140px",
            marginRight: "1px",
            height: "auto",
            px: "0",
            fontSize: "18px",
            fontWeight: 300,
            textAlign: "center",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          {stakePending ? "Pending..." : "Make stake"}
        </Button>
      )}
    </Flex>
  );
};

export default StakeSubRow;
