import type * as Stitches from "@stitches/react";
import { isAddress } from "@vanilladefi/core-sdk";
import { getJuiceStakingContract } from "@vanilladefi/stake-sdk";
import { ContractTransaction } from "ethers";
import Link from "next/link";
import { ArrowCircleUpRight, Check, Copy } from "phosphor-react";
import { useCallback, useEffect, useState } from "react";
import { state, useSnapshot } from "../../state";
import {
  connectWallet,
  disconnect
} from "../../state/actions/wallet";
import { toJuice } from "../../utils/helpers";
import Box from "../Box";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../Input";
import Loader from "../Loader";
import Text from "../Text";
import Curtain from "./Curtain";

const TradeLink: React.FC<{ href: string }> = ({ href, children }) => {
  return (
    <Link href={href} passHref>
      {typeof children === "string" ? (
        <Text
          as="a"
          css={{
            color: "$primary",
            textDecoration: "none",
            "&:hover": {
              color: "$text",
            },
            display: "flex",
            alignItems: "center",
          }}
        >
          {children}
          <Box css={{ marginLeft: "$space$1", height: "24px" }}>
            <ArrowCircleUpRight size={"24px"} />
          </Box>
        </Text>
      ) : (
        children
      )}
    </Link>
  );
};

const ActiveWallet: React.FC<{ css?: Stitches.CSS }> = ({ css }) => {
  const {
    providerName,
    walletOpen,
    walletAddress,
    truncatedWalletAddress,
    balances,
    unstakedBalance,
    signer,
  } = useSnapshot(state);

  const [copied, setCopied] = useState(false);
  const [juiceAmount, setJuiceAmount] = useState("");
  const [txLoading, setTxLoading] = useState(false);
  const [txDisabled, setTxDisabled] = useState(false);
  const [message, setMessage] = useState({
    value: null as string | null,
    error: false,
  });

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      },
      () => {
        setCopied(false);
      }
    );
  }, []);

  useEffect(() => {
    const _disabled = !(juiceAmount && +juiceAmount) || !signer;
    if (_disabled && !txDisabled) setTxDisabled(true);
    else if (!_disabled && txDisabled) setTxDisabled(false);
  }, [juiceAmount, signer, txDisabled]);

  const handleTx = useCallback(
    async (type: "deposit" | "withdraw") => {
      if (txDisabled) return;
      if (!signer) return connectWallet();

      setTxLoading(true);
      setMessage({ value: null, error: false });
      try {
        const amount = toJuice(juiceAmount).toString();
        const contract = getJuiceStakingContract({
          signerOrProvider: signer,
          optionalAddress:
            isAddress(process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || "") || undefined,
        });
        if (!contract) throw Error("Cannot access contract ");

        let tx: ContractTransaction;
        if (type === "deposit") {
          tx = await contract.deposit(amount);
        } else {
          tx = await contract.withdraw(amount);
        }
        setMessage({
          value: "Transaction pending...",
          error: false,
        });
        setJuiceAmount("");

        const rec = await tx.wait();
        if (rec.status === 1) {
          setMessage({
            value: "Transaction successful",
            error: false,
          });
        } else throw Error("reciept.status == 0"); //TODO we can do better
      } catch (error) {
        console.warn("Error depositing!, ", error);
        setMessage({
          value: "Tansaction failed!",
          error: true,
        });
      }
      setTxLoading(false);
    },
    [juiceAmount, signer, txDisabled]
  );

  return walletOpen ? (
    <Box
      css={{
        display: "flex",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "41",
        ...css,
      }}
    >
      <Curtain />
      <Box
        css={{
          display: "flex",
          position: "relative",
          background: "$background",
          flexDirection: "column",
          zIndex: "43",
          border: "$extraMuted 1px solid",
        }}
      >
        <Box
          as="section"
          css={{
            px: "$space$4",
            py: "$space$5",
            width: "$md",
            borderBottom: "1px $extraMuted solid",
          }}
        >
          <Box
            css={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "space-between",
              mb: "$space$5",
            }}
          >
            <Heading>WALLET</Heading>
            <Text css={{ color: "$muted", fontSize: "$sm" }}>
              Connected with {providerName}
            </Text>
          </Box>

          <Box
            css={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "space-between",
              mb: "$space$5",
              pb: "$space$5",
              borderBottom: "1px $extraMuted solid",
            }}
          >
            <Text css={{ fontFamily: "$monospace", fontSize: "$xl" }}>
              {truncatedWalletAddress}
            </Text>
            <Button
              variant="primary"
              size="sm"
              css={{
                borderRadius: "999px",
                border: "0",
                fontSize: "$sm",
                fontWeight: "lighter",
              }}
              onClick={() => disconnect()}
            >
              Disconnect
            </Button>
          </Box>

          <Box
            css={{
              display: "flex",
              flexDirection: "column",
              mb: "$space$5",
              pb: "$space$5",
              borderBottom: "1px $extraMuted solid",
            }}
          >
            <Box
              css={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-between",
                mb: "$space$1",
              }}
            >
              {balances.juice ? (
                <>
                  <Text css={{ color: "$textA", fontSize: "$xl" }}>
                    {balances.juice} JUICE
                  </Text>
                  <TradeLink href="">Buy JUICE</TradeLink>
                </>
              ) : (
                <Loader />
              )}
            </Box>

            <Box
              css={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-between",
                mb: "$space$1",
              }}
            >
              {balances.vnl ? (
                <>
                  <Text css={{ color: "$textA", fontSize: "$xl" }}>
                    {balances.vnl} VNL
                  </Text>
                  <TradeLink href="">Buy VNL</TradeLink>
                </>
              ) : (
                <Loader />
              )}
            </Box>
          </Box>

          <Box
            css={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              mb: "$space$1",
            }}
          >
            {copied ? (
              <Text
                css={{
                  color: "$green",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => copyToClipboard(walletAddress)}
              >
                <Box css={{ marginRight: "$space$1", height: "24px" }}>
                  <Check size={"24px"} style={{ color: "$primary" }} />
                </Box>{" "}
                Copied to clipboard
              </Text>
            ) : (
              <Text
                css={{
                  color: "$primary",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": {
                    color: "$text",
                  },
                }}
                onClick={() => copyToClipboard(walletAddress)}
              >
                <Box css={{ marginRight: "$space$1", height: "24px" }}>
                  <Copy size={"24px"} style={{ color: "$primary" }} />
                </Box>{" "}
                Copy address
              </Text>
            )}

            <TradeLink href={`https://etherscan.io/address/${walletAddress}`}>
              View on Etherscan
            </TradeLink>
          </Box>
        </Box>

        <Box
          as="section"
          css={{
            px: "$space$4",
            py: "$space$5",
            width: "$md",
            borderBottom: "1px $extraMuted solid",
          }}
        >
          <Box
            css={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "space-between",
              mb: "$space$5",
            }}
          >
            <Heading>STAKING BALANCE</Heading>
            <Text css={{ color: "$muted", fontSize: "$sm" }}>
              {unstakedBalance} JUICE
            </Text>
          </Box>

          <Box
            css={{ display: "flex", flexDirection: "column", mb: "$space$5" }}
          >
            <Input
              type="number"
              value={juiceAmount}
              onChange={(e) => setJuiceAmount(e.target.value)}
              size="xl"
              variant="bordered"
            ></Input>
            <Box css={{ display: "flex", flexDirection: "row", mt: "1px" }}>
              {!txLoading ? (
                <>
                  <Button
                    disabled={txDisabled}
                    onClick={() => handleTx("withdraw")}
                    variant="bordered"
                    css={{ display: "flex", flex: "1 0" }}
                  >
                    Withdraw
                  </Button>
                  <Button
                    disabled={txDisabled}
                    onClick={() => handleTx("deposit")}
                    variant="bordered"
                    css={{ display: "flex", flex: "1 0" }}
                  >
                    Add
                  </Button>
                </>
              ) : (
                <Loader css={{ height: "$10" }} />
              )}
            </Box>
            <Text
              size="small"
              css={{ mt: "$1", color: message.error ? "$red" : "$primary" }}
            >
              {message.value}
            </Text>
          </Box>
          <Button
            variant="primary"
            css={{
              width: "100%",
              position: "relative",
              boxSizing: "border-box",
            }}
            onClick={() => (state.walletOpen = false)}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Box>
  ) : (
    <></>
  );
};

export default ActiveWallet;
