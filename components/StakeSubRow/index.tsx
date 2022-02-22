import { isAddress } from "@vanilladefi/core-sdk";
import * as sdk from "@vanilladefi/stake-sdk";
import Image from "next/image";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Row } from "react-table";
import { toast } from "react-toastify";
import { useSnapshot } from "valtio";
import { state, VanillaEvents } from "../../state";
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
  defaultStake?: {
    amount?: string;
    position?: "long" | "short";
  };
  type?: "edit" | "make";
}

const StakeSubRow: FC<SubRowProps> = ({ row, type = "make", defaultStake }) => {
  const { signer } = useSnapshot(state);

  const [stakeAmount, setStakeAmount] = useState(defaultStake?.amount || "");
  const [stakePosition, setStakePosition] = useState<"long" | "short">(
    defaultStake?.position || "long"
  );
  const [stakePending, setStakePending] = useState(false);
  const [stakingDisabled, setStakingDisabled] = useState(true);
  const [closingDisabled, setClosingDisabled] = useState(true);
  const [txLink, setTxLink] = useState<string>();

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

    const token = findToken(row.original.id)?.address;

    if (!token) {
      return toast.error("Error: Token is not available to stake", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setTxLink(undefined);
    setStakePending(true);
    try {
      const amount = parseJuice(stakeAmount).toString();
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

      const rec = await tx.wait();

      const transactionLink = getTransactionLink(rec.transactionHash);
      if (rec.status === 1) {
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
  }, [stakingDisabled, signer, row, stakeAmount, stakePosition]);

  const closeStakePosition = useCallback(async () => {
    if (closingDisabled) return;

    if (!signer) {
      return connectWallet();
    }

    const token = findToken(row.original.id)?.address;

    if (!token) {
      return toast.error("Error: Token is not available to stake", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setTxLink(undefined);
    setStakePending(true);
    try {
      const stake = { token, amount: 0, sentiment: false };

      const contractAddress = isAddress(
        process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || ""
      );
      const tx = await sdk.modifyStake(stake, {
        signerOrProvider: signer,
        optionalAddress: contractAddress || "",
      });
      const _txLink = getTransactionLink(tx.hash);
      setTxLink(_txLink);

      const res = await tx.wait();

      const transactionLink = getTransactionLink(res.transactionHash);
      if (res.status === 1) {
        toast.success(
          <>
            Stake position closed.{" "}
            <Link href={transactionLink} external text="View on explorer" />{" "}
          </>
        );

        emitEvent(VanillaEvents.stakesChanged);

        row.toggleRowExpanded(false);
      } else
        toast.error(
          <>
            Transaction failed!{" "}
            <Link href={transactionLink} external text="View on explorer" />{" "}
          </>
        );
    } catch (error) {
      console.warn(error);

      let body = "Something went wrong, try again later!";
      if ((error as any)?.code === 4001) {
        body = "The request was rejected by the user";
      }

      toast.error(body);
    }

    setStakePending(false);
  }, [closingDisabled, signer, row]);

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
              onClick={closeStakePosition}
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
              onClick={modifyStake}
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
          onClick={modifyStake}
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
