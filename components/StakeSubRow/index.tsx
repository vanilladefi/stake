import Image from "next/image";
import React, { FC, useCallback, useState } from "react";
import * as sdk from "@vanilladefi/stake-sdk";
import { isAddress } from "@vanilladefi/core-sdk";
import { Row } from "react-table";
import { toast } from "react-toastify";
import { useSnapshot } from "valtio";
import { Stake, state, VanillaEvents } from "../../state";
import { connectWallet } from "../../state/actions/wallet";
import {
  emitEvent,
  findToken,
  getTransactionLink,
  parseJuice,
} from "../../utils/helpers";
import Box from "../Box";
import Button from "../Button";
import Flex from "../Flex";
import Input from "../Input";
import Link from "../Link";
import Text from "../Text";

import { PolygonScanIcon } from "../../assets";
import { BigNumber } from "ethers";

export type ColumnType = {
  __typename?: "AssetPair";
  id: string;
  currentStake?: Stake;
  currentPrice: any;
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
  const { signer, rawBalances } = useSnapshot(state);

  const staked = row.original.currentStake;

  const [stakeAmount, setStakeAmount] = useState(staked?.juiceValue || "");
  const [stakePosition, setStakePosition] = useState<"long" | "short">(
    staked?.sentiment || "long"
  );
  const [stakePending, setStakePending] = useState(false);
  const [txLink, setTxLink] = useState<string>();

  const stakingDisabled = stakePending || !(stakeAmount && +stakeAmount);
  const closingDisabled = stakePending;

  const handleStake = useCallback(
    async (type: "close" | "modify" = "modify") => {
      if (type === "modify" && stakingDisabled) return;
      if (type === "close" && closingDisabled) return;

      if (!signer) {
        return connectWallet();
      }

      const token = findToken(row.original.id)?.address;
      if (!token) {
        return toast.error("Error: Token is not available to stake");
      }

      const amount =
        type === "close" ? BigNumber.from(0) : parseJuice(stakeAmount);

      if (
        type === "modify" &&
        !rawBalances.unstakedJuice?.gte(amount.sub(staked?.rawJuiceValue || 0))
      ) {
        return toast.error("You don't have enough juice to stake this amount");
      }

      setTxLink(undefined);
      setStakePending(true);
      try {
        const sentiment = stakePosition === "short" ? false : true;

        const stake = { token, amount, sentiment };

        const contractAddress = isAddress(
          process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || ""
        );
        const tx = await sdk.modifyStake(stake, {
          signerOrProvider: signer,
          optionalAddress: contractAddress || "",
        });

        const _txLink = getTransactionLink(tx.hash);
        setTxLink(_txLink);

        const reciept = await tx.wait();
        const transactionLink = getTransactionLink(reciept.transactionHash);

        if (reciept.status === 1) {
          toast.success(
            <>
              Transaction was successful.{" "}
              <Link href={transactionLink} external text="View on explorer" />{" "}
            </>
          );

          emitEvent(VanillaEvents.stakesChanged);
          row.toggleRowExpanded(false);
        } else {
          toast.error(
            <>
              Transaction failed!{" "}
              <Link href={transactionLink} external text="View on explorer" />{" "}
            </>
          );
        }
      } catch (error) {
        console.warn(error);

        let body = "Something went wrong, try again later!";
        if ((error as any)?.code === 4001) {
          body = "Request was rejected by the user";
        }
        toast.error(body);
      }

      setStakePending(false);
    },
    [
      stakingDisabled,
      closingDisabled,
      signer,
      row,
      stakePosition,
      stakeAmount,
      rawBalances.unstakedJuice,
      staked?.rawJuiceValue,
    ]
  );

  return (
    <Flex
      css={{
        flex: 1,
        boxShadow: "inset 0px 0px 0px 1px $colors$extraMuted",
        background: "$background",
        position: "relative",
        "&::before": {
          display: "block",
          content: "",
          width: "10px",
          height: "10px",
          borderTop: "1px solid $colors$extraMuted",
          borderLeft: "1px solid $colors$extraMuted",
          position: "absolute",
          top: "-5px",
          transform: "rotate(45deg)",
          backgroundColor: "$background",
          left: "1.55rem",
        },
      }}
    >
      <Flex
        css={{
          p: "0px $5",
          borderRight: "1px solid $colors$extraMuted",
          alignItems: "center",
        }}
      >
        <Box
          css={{
            position: "relative",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Text
            css={{
              color: "$muted",
              fontSize: "$xl",
              marginBottom: 0,
              mr: "$2",
            }}
          >
            Stake
          </Text>{" "}
          <Input
            disabled={stakePending}
            size="lg"
            type="number"
            placeholder="0.0"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            css={{
              width: "100%",
              minWidth: "40px",
              maxWidth: "140px",
              textAlign: "right",
              mx: "$3",
            }}
          />
        </Box>
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
          size="md"
          css={{
            width: "20%",
            maxWidth: "80px",
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
          size="md"
          css={{
            width: "20%",
            maxWidth: "80px",
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
          flex: 1,
          borderRight: "1px solid $colors$extraMuted",
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
          {findToken(row.original.id)?.imageUrl ? (
            <Image
              width="18px"
              height="18px"
              layout="fixed"
              objectFit="cover"
              src={`/token-assets/${findToken(row.original.id)?.imageUrl}`}
              alt="Token icon"
            />
          ) : null}
        </Box>
        <Box css={{ ml: "10px" }}>{findToken(row.original.id)?.name}</Box>
      </Flex>
      {type === "edit" ? (
        stakePending ? (
          <Flex justify="center" align="center" css={{ width: "220px" }}>
            <Link
              external
              variant={txLink ? "default" : "subtle"}
              href={txLink}
            >
              {txLink && <PolygonScanIcon css={{ mr: "$2" }} fill="inherit" />}
              Pending...
            </Link>
          </Flex>
        ) : (
          <>
            <Button
              ghost
              variant="primary"
              disabled={closingDisabled}
              onClick={() => handleStake("close")}
              css={{
                color: "$red",
                width: "120px",
                marginRight: "1px",
                height: "auto",
                px: "$2",
                fontSize: "$md",
                maxWidth: "80px",
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
              onClick={() => handleStake()}
              css={{
                marginRight: "1px",
                height: "auto",
                px: "$8",
                width: "auto",
                maxWidth: "100px",
                fontSize: "$md",
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
      ) : stakePending ? (
        <Flex row align="center" justify="center" css={{ width: "135px" }}>
          <Link external variant={txLink ? "default" : "subtle"} href={txLink}>
            {txLink && <PolygonScanIcon css={{ mr: "$2" }} fill="inherit" />}
            Pending...
          </Link>
        </Flex>
      ) : (
        <Button
          ghost
          variant="primary"
          disabled={stakingDisabled}
          onClick={() => handleStake()}
          css={{
            width: "auto",
            marginRight: "1px",
            height: "auto",
            px: "$6",
            fontSize: "$md",
            maxWidth: "100px",
            fontWeight: 300,
            textAlign: "center",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          Add Stake
        </Button>
      )}
    </Flex>
  );
};

export default StakeSubRow;
