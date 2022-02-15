import { BlockForkEvent } from "@ethersproject/abstract-provider";
import type * as Stitches from "@stitches/react";
import { isAddress } from "@vanilladefi/core-sdk";
import { getJuiceStakingContract } from "@vanilladefi/stake-sdk";
import { ContractTransaction } from "ethers";
import Link from "next/link";
import { ArrowCircleUpRight, Check, Copy } from "phosphor-react";
import { useCallback, useEffect, useState } from "react";
import { state, useSnapshot } from "../../state";
import { connectWallet, disconnect } from "../../state/actions/wallet";
import { parseJuice } from "../../utils/helpers";
import Box from "../Box";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../Input";
import Loader from "../Loader";
import Text from "../Text";
import Curtain from "./Curtain";

enum TxTypes {
  deposit,
  withdraw,
}

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
            fontSize: "$sm",
            alignItems: "center",
          }}
        >
          {children}
          <Box css={{ marginLeft: "$space$1", height: "20px" }}>
            <ArrowCircleUpRight size={"20px"} />
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
  const [txDisabled, setTxDisabled] = useState<false | TxTypes>(false);
  const [message, setMessage] = useState({
    value: null,
    error: undefined,
  } as { value: string | null; error?: boolean });

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
    setMessage({ value: null });
  }, [walletOpen]);

  const handleTx = useCallback(
    async (type: TxTypes) => {
      if (txDisabled) return;
      if (!signer) return connectWallet();

      const _disabled = !(juiceAmount && +juiceAmount);
      if (_disabled) {
        setMessage({ value: "Please enter some amount!" });
        return;
      }

      setTxDisabled(type);
      setMessage({ value: null });

      try {
        const amount = parseJuice(juiceAmount).toString();
        const contractAddress = isAddress(
          process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || ""
        );
        const contract = getJuiceStakingContract({
          signerOrProvider: signer,
          optionalAddress: contractAddress || undefined,
        });
        if (!contract) throw Error("Cannot access contract ");

        let tx: ContractTransaction;
        if (type === TxTypes.deposit) {
          tx = await contract.deposit(amount);
        } else {
          tx = await contract.withdraw(amount);
        }
        setMessage({
          value: "Transaction pending...",
        });
        setJuiceAmount("");

        const rec = await tx.wait();
        if (rec.status === 1) {
          setMessage({
            value: "Transaction successful [LINK]",
          });
        } else {
          setMessage({
            value: "Transaction failed! [LINK]",
            error: true,
          });
        }
      } catch (error) {
        console.warn("Error depositing!, ", error);
        let msg = "Some error occured, try again later!";
        if ((error as any)?.code === 4001) {
          msg = "The request was rejected by the user";
        }
        setMessage({
          value: msg,
          error: true,
        });
      }
      setTxDisabled(false);
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
              mb: "$space$4",
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
              alignItems: "center",
              justifyContent: "space-between",
              pb: "$space$4",
            }}
          >
            <Text
              css={{
                fontFamily: "$monospace",
                fontSize: "$xl",
              }}
            >
              {truncatedWalletAddress}
            </Text>
            <Button
              variant="bordered"
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
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              pb: "$space$5",
              mb: "$space$5",
              borderBottom: "1px $extraMuted solid",
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
                  fontSize: "$sm",
                }}
                onClick={() => copyToClipboard(walletAddress)}
              >
                <Box css={{ marginRight: "$space$1", height: "20px" }}>
                  <Check size={"20px"} style={{ color: "$primary" }} />
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
                  fontSize: "$sm",
                  "&:hover": {
                    color: "$text",
                  },
                }}
                onClick={() => copyToClipboard(walletAddress)}
              >
                <Box css={{ marginRight: "$space$1", height: "20px" }}>
                  <Copy size={"20px"} style={{ color: "$primary" }} />
                </Box>{" "}
                Copy address
              </Text>
            )}

            <TradeLink href={`https://etherscan.io/address/${walletAddress}`}>
              View on Etherscan
            </TradeLink>
          </Box>

          <Box
            css={{
              display: "flex",
              flexDirection: "column",
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
            css={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              mb: "$space$5",
            }}
          >
            {Number(unstakedBalance) <= 0 && Number(balances.juice) <= 0 ? (
              <Text muted>
                You need to get some $JUICE first, before you can add it to your
                staking account and start making stakes.
              </Text>
            ) : (
              <Box
                css={{
                  "&::after": {
                    display: "inline-block",
                    content: "JUICE",
                    color: "$muted",
                    position: "absolute",
                    top: 0,
                    lineHeight: "3.5rem",
                    right: "1rem",
                  },
                }}
              >
                <Input
                  type="number"
                  value={juiceAmount}
                  onChange={(e) => setJuiceAmount(e.target.value)}
                  size="xl"
                  placeholder="0.0"
                  css={{
                    padding: "1rem 1.5rem",
                  }}
                  variant="bordered"
                ></Input>
              </Box>
            )}
            <Box css={{ display: "flex", flexDirection: "row", mt: "1px" }}>
              <>
                {Number(unstakedBalance) > 0 && (
                  <Button
                    disabled={txDisabled === TxTypes.withdraw}
                    onClick={() => handleTx(TxTypes.withdraw)}
                    variant="bordered"
                    css={{ display: "flex", fontSize: "$sm", flex: "1 0" }}
                  >
                    {txDisabled === TxTypes.withdraw ? (
                      <Loader css={{ height: "$1" }} />
                    ) : (
                      `Withdraw ${juiceAmount} JUICE`
                    )}
                  </Button>
                )}
                {Number(balances.juice) > 0 && (
                  <Button
                    disabled={txDisabled === TxTypes.deposit}
                    onClick={() => handleTx(TxTypes.deposit)}
                    variant="bordered"
                    css={{ display: "flex", fontSize: "$sm", flex: "1 0" }}
                  >
                    {txDisabled === TxTypes.deposit ? (
                      <Loader css={{ height: "$1" }} />
                    ) : (
                      `Deposit ${juiceAmount} JUICE`
                    )}
                  </Button>
                )}
              </>
            </Box>
            <Text
              size="small"
              css={{ mt: "$4", color: message.error ? "$red" : "$primary" }}
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
