import Image from "next/image";
import React, { FC, useCallback, useState } from "react";
import * as sdk from "@vanilladefi/stake-sdk";
import { isAddress, juiceDecimals } from "@vanilladefi/core-sdk";
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
import { formatUnits } from "ethers/lib/utils";

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

  const [stakeAmount, setStakeAmount] = useState(
    staked?.rawJuiceValue
      ? formatUnits(staked?.rawJuiceValue, juiceDecimals)
      : 0
  );
  const [stakePosition, setStakePosition] = useState<"long" | "short">(
    staked?.sentiment || "long"
  );
  const [stakePending, setStakePending] = useState(false);
  const [txLink, setTxLink] = useState<string>();

  const stakingDisabled = stakePending || !(stakeAmount && +stakeAmount);
  const closingDisabled = stakePending;

  const stakeUnchanged =
    staked?.sentiment === stakePosition
      ? parseJuice(stakeAmount).eq(staked?.rawJuiceValue)
      : false;

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

  const PendingView = (
    <Flex
      justify="center"
      align="center"
      css={{ px: "$5", borderLeft: "1px solid $extraMuted" }}
    >
      <Link
        external
        variant={txLink ? "default" : "subtle"}
        href={txLink}
        css={{ color: txLink ? "$link" : "$muted" }}
      >
        {txLink && <PolygonScanIcon css={{ mr: "$2" }} fill="inherit" />}
        <Text css={{ color: "inherit", fontSize: "$md" }}>Pending...</Text>
      </Link>
    </Flex>
  );

  return (
    <Flex
      css={{
        flex: 1,
        flexDirection: "column",
        flexWrap: "wrap",
        boxShadow: "inset 0px 0px 0px 1px $colors$extraMuted",
        position: "relative",
        "@sm": {
          flexDirection: "row",
          flexWrap: "nowrap",
        },
      }}
    >
      <Box css={{ display: "flex", flex: 1, minHeight: "44px" }}>
        <Flex
          css={{
            p: "0px $2",
            alignItems: "center",
            "@sm": {
              borderRight: "1px solid $colors$extraMuted",
            },
            "@lg": {
              p: "0px $4",
            },
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
                display: "none",
                "@lg": {
                  display: "inline",
                },
              }}
            >
              Stake
            </Text>{" "}
            <Input
              disabled={stakePending}
              autoFocus
              size="lg"
              type="number"
              placeholder="0.0"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              css={{
                width: "100%",
                minWidth: "30px",
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
        <Box
          css={{
            p: "$2",
            display: "flex",
            flex: 1,

            "@md": {
              p: "$3",
            },
          }}
        >
          <Text
            css={{
              color: "$muted",
              fontSize: "$xl",
              mr: "$5",
              alignItems: "center",
              display: "none",
              "@xl": {
                display: "flex",
              },
            }}
          >
            To
          </Text>
          <Box
            css={{
              display: "flex",
              width: "100%",
              maxWidth: "280px",
              backgroundColor: "$tableZebra",
            }}
          >
            <Button
              onClick={() => setStakePosition("long")}
              outline
              disabled={stakePending}
              uppercase
              size="md"
              active={stakePosition === "long"}
              css={{
                boxShadow: "none",
                border: 0,
                width: "50%",
                padding: 0,
                color: stakePosition === "long" ? "$background" : "$muted",
                backgroundColor:
                  stakePosition === "long" ? "$text" : "transparent",
              }}
            >
              Long
            </Button>
            <Button
              onClick={() => setStakePosition("short")}
              outline
              uppercase
              disabled={stakePending}
              size="md"
              active={stakePosition === "short"}
              css={{
                boxShadow: "none",
                border: 0,
                width: "50%",
                padding: 0,
                color: stakePosition === "short" ? "$background" : "$muted",
                backgroundColor:
                  stakePosition === "short" ? "$text" : "transparent",
              }}
            >
              Short
            </Button>
          </Box>

          <Flex
            css={{
              pl: "$5",
              alignItems: "center",
              justifyContent: "left",
              display: "none",
              "@lg": {
                display: "flex",
              },
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
            <Box css={{ ml: "10px", lineHeight: "$lg" }}>
              {findToken(row.original.id)?.name}
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box
        css={{
          display: "flex",
          justifyContent: "center",
          minHeight: "44px",
          borderTop: "1px solid $extraMuted",
          "@sm": {
            borderTop: "none",
          },
        }}
      >
        {type === "edit" ? (
          stakePending ? (
            PendingView
          ) : (
            <>
              <Button
                ghost
                variant="primary"
                disabled={closingDisabled}
                onClick={() => handleStake("close")}
                css={{
                  color: "$red",
                  width: "100%",
                  marginRight: "1px",
                  height: "auto",
                  px: "$2",
                  fontSize: "$md",
                  fontWeight: 300,
                  textAlign: "center",
                  borderRight: "1px solid $extraMuted",
                  borderLeft: "1px solid $colors$extraMuted",
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
                disabled={stakingDisabled || stakeUnchanged}
                onClick={() => handleStake()}
                css={{
                  marginRight: "1px",
                  height: "auto",
                  px: "$2",
                  width: "100%",
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
          PendingView
        ) : (
          <Button
            ghost
            variant="primary"
            disabled={stakingDisabled}
            onClick={() => handleStake()}
            css={{
              width: "auto",
              height: "auto",
              px: "$6",
              fontSize: "$md",
              maxWidth: "100px",
              fontWeight: 300,
              textAlign: "center",
              borderLeft: "1px solid $colors$extraMuted",
              borderRight: "1px solid $colors$extraMuted",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Add Stake
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default StakeSubRow;
