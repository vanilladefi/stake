import React, { FC, useCallback, useEffect, useState } from "react";
import { Row } from "react-table";
import Image from "next/image";
import * as sdk from "@vanilladefi/stake-sdk";
import { BigNumber, ethers } from "ethers";

import tokens from "../../tokensV2";
import Box from "../Box";
import Button from "../Button";
import Flex from "../Flex";
import Input from "../Input";
import Text from "../Text";
import { useSnapshot } from "valtio";
import { state } from "../../state";
import { connectWallet } from "../../state/actions/wallet";

export type ColumnType = {
  __typename?: "AssetPair";
  id: string;
  currentPrice: any;
  stakedAmount?: any;
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
  type?: "edit" | "make";
}
const StakeSubRow: FC<SubRowProps> = ({ row, type = "make" }) => {
  const snap = useSnapshot(state);
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakePosition, setStakePosition] = useState<"long" | "short">("long");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const _disabled = !(stakeAmount && +stakeAmount);
    if (_disabled && !disabled) setDisabled(true);
    else if (!_disabled && disabled) setDisabled(false);
  }, [disabled, setDisabled, stakeAmount]);

  const makeStake = useCallback(async () => {
    if (disabled) return;

    if (!snap.signer) {
      return connectWallet();
    }
    const token = tokens
      // .filter((t) => t.enabled)
      .find((t) => t.id === row.original.id.split("/")[0])?.address;
    if (!token) {
      // TODO Something better
      return alert("Not implemented yet");
    }
    const amount = ethers.BigNumber.from(stakeAmount).mul(10 ** 8);
    const sentiment = stakePosition === "short" ? false : true;

    if (BigNumber.from(snap.unstakedBalance).mul(10 ** 8) < amount) {
      return alert("Insufficient juice");
    }
    try {
      const stake = { token, amount, sentiment };
      console.log("Callin sdk with stake: ", stake);
      const tx = await sdk.modifyStake(stake, snap.signer);
      console.log("Transaction: ", tx);
    } catch (error) {
      console.log({ error });
    }
  }, [disabled, row.original.id, snap.signer, stakeAmount, stakePosition]);

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
        <>
          <Button
            ghost
            variant="primary"
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
            Close partition
          </Button>
          <Button
            ghost
            variant="primary"
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
      ) : (
        <Button
          ghost
          variant="primary"
          disabled={disabled}
          onClick={makeStake}
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
          Make stake
        </Button>
      )}
    </Flex>
  );
};

export default StakeSubRow;
