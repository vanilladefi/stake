import type * as Stitches from "@stitches/react";
import { isAddress } from "@vanilladefi/core-sdk";
import { getJuiceStakingContract } from "@vanilladefi/stake-sdk";
import { ContractTransaction } from "ethers";
import NextLink from "next/link";
import Link from "../Link";
import { ArrowCircleUpRight, Copy, ArrowUp, ArrowDown } from "phosphor-react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { state, useSnapshot, VanillaEvents } from "../../state";
import { connectWallet, disconnect } from "../../state/actions/wallet";
import { emitEvent, getTransactionLink, parseJuice } from "../../utils/helpers";
import Box from "../Box";
import Button from "../Button";
import Input from "../Input";
import Loader from "../Loader";
import Text from "../Text";
import Curtain from "./Curtain";

import { PolygonScanIcon } from "../../assets";

enum TxTypes {
  deposit,
  withdraw,
}

const TradeLink: React.FC<{ href: string }> = ({ href, children }) => {
  return (
    <NextLink href={href} passHref>
      {typeof children === "string" ? (
        <Text
          as="a"
          target="_blank"
          rel="noopener noreferrer"
          css={{
            color: "$link",
            textDecoration: "none",
            textTransform: "uppercase",
            display: "inline-flex",
            fontSize: "$sm",
            px: "$2",
            lineHeight: "$md",
            alignItems: "center",
            borderRadius: "400px",
            "&:hover": {
              color: "$text",
              background: "$backgroundSecondary",
            },
          }}
        >
          {children}
          <Box css={{ marginLeft: "$space$1", height: "20px" }}>
            <ArrowCircleUpRight size={"17px"} />
          </Box>
        </Text>
      ) : (
        children
      )}
    </NextLink>
  );
};

const ActiveWallet: React.FC<{ css?: Stitches.CSS }> = ({ css }) => {
  const {
    providerName,
    walletOpen,
    walletAddress,
    truncatedWalletAddress,
    balances,
    rawBalances,
    signer,
  } = useSnapshot(state);

  const [juiceAmount, setJuiceAmount] = useState("");
  const [txDisabled, setTxDisabled] = useState<false | TxTypes>(false);
  const [transactionType, setTransactionType] = useState<
    "deposit" | "withdraw"
  >(Number(balances.juice) > 0 ? "deposit" : "withdraw");

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text);
    toast.success(`Address copied to clipboard`, {
      autoClose: 2000,
      hideProgressBar: true,
    });
  }, []);

  const vnlToDao = 1500 - Number(balances.vnl);

  const handleTx = useCallback(
    async (type: TxTypes) => {
      if (txDisabled) return;
      if (!signer) return connectWallet();

      const _disabled = !(juiceAmount && +juiceAmount);
      if (_disabled) {
        return;
      }

      setTxDisabled(type);

      const waitingToast = toast.loading(
        "Awaiting user confirmation, please confirm this transaction in your wallet."
      );

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

        const waitingLink = getTransactionLink(tx.hash);
        toast.update(waitingToast, {
          render: (
            <>
              Transaction submitted, awaiting confirmation in blockchain.{" "}
              <Link external href={waitingLink} text="View on explorer" />
            </>
          ),
          autoClose: false,
        });

        const rec = await tx.wait();
        const recLink = getTransactionLink(rec.transactionHash);
        if (rec.status === 1) {
          toast.update(waitingToast, {
            render: (
              <>
                Transaction confirmed.{" "}
                <Link external href={recLink} text="View on explorer" />
              </>
            ),
            type: "success",
            isLoading: false,
            closeButton: true,
            autoClose: 5000,
          });

          emitEvent(VanillaEvents.balancesChanged);
        } else {
          toast.update(waitingToast, {
            render: (
              <>
                Transaction failed.{" "}
                <Link external href={recLink} text="View on explorer" />
              </>
            ),
            type: "error",
            isLoading: false,
            closeButton: true,
            autoClose: 5000,
          });
        }

        setJuiceAmount("");
      } catch (error) {
        console.warn("Error: , ", error);
        let msg = "Some error occured, try again later!";
        if ((error as any)?.code === 4001) {
          msg = "Request was rejected by the user";
        }
        toast.update(waitingToast, {
          render: msg,
          type: "error",
          isLoading: false,
          closeButton: true,
          autoClose: 3000,
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
      <Box>
        <Box
          css={{
            display: "flex",
            position: "relative",
            textAlign: "right",
            color: "$link",
            flexDirection: "column",
            zIndex: "43",
            padding: "$2 $4",
          }}
        >
          <Text as="a" onClick={() => (state.walletOpen = false)}>
            Close
          </Text>
        </Box>
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
            }}
          >
            <Box
              css={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderBottom: "1px solid $extraMuted",
                justifyContent: "space-between",
                pb: "$5",
                mb: "$4",
              }}
            >
              <Box
                css={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  title={`Connected with ${providerName}`}
                  css={{
                    fontFamily: "$monospace",
                    fontSize: "$xl",
                    display: "inline-block",
                    lineHeight: "$9",
                    marginRight: "$4",
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
                }}
              >
                <Box
                  css={{
                    display: "inline-block",
                    marginRight: "$space$1",
                    cursor: "pointer",
                    color: "$primary",
                  }}
                  onClick={() => copyToClipboard(walletAddress)}
                >
                  <Copy size={"22px"} style={{ color: "$primary" }} />
                </Box>
                <Link
                  css={{ paddingLeft: "$1" }}
                  as="a"
                  title="View account on Polygonscan"
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`https://polygonscan.com/address/${walletAddress}`}
                >
                  <PolygonScanIcon fill="inherit" />
                </Link>
              </Box>
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
                  mb: "$space$2",
                }}
              >
                {balances.vnl ? (
                  <>
                    <Text css={{ color: "$textA", fontSize: "$xl" }}>
                      {balances.vnl} VNL <TradeLink href="">Buy</TradeLink>
                    </Text>
                    <Text muted>+{vnlToDao} to DAO</Text>
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
                {balances.juice ? (
                  <>
                    <Text css={{ color: "$textA", fontSize: "$xl" }}>
                      {balances.juice} JUICE <TradeLink href="">Buy</TradeLink>
                    </Text>
                    <Text muted>In your wallet</Text>
                  </>
                ) : (
                  <Loader />
                )}
              </Box>
            </Box>
          </Box>

          <Box
            css={{
              display: "flex",
              flexDirection: "row",
              mb: "$space$2",
              width: "$md",
            }}
          >
            <Box
              css={{
                position: "relative",
                width: "100%",
                boxShadow: "inset 0 0 40px rgba(0,0,0.25)",
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
                disabled={txDisabled == false ? false : true}
                value={juiceAmount}
                onChange={(e) => setJuiceAmount(e.target.value)}
                size="xl"
                placeholder="0.0"
                css={{
                  height: "57px",
                  padding: "1rem 1rem",
                  border: 0,
                }}
                variant="bordered"
              />
            </Box>

            <Box
              css={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <>
                {rawBalances.juice > 0 && (
                  <Button
                    disabled={txDisabled == false ? false : true}
                    uppercase
                    outline
                    onClick={() => setTransactionType("deposit")}
                    active={transactionType === "deposit"}
                    css={{
                      display: "flex",
                      fontSize: "$xs",
                      flex: "1 0",
                      padding: "0 $3",
                      height: "56px",
                      borderColor: "1px solid $extraMuted",
                    }}
                  >
                    Deposit{" "}
                    <ArrowDown
                      style={{ paddingLeft: ".25rem" }}
                      size={"21px"}
                    />
                  </Button>
                )}
                {rawBalances.unstakedJuice > 0 && (
                  <Button
                    disabled={txDisabled == false ? false : true}
                    uppercase
                    onClick={() => setTransactionType("withdraw")}
                    outline
                    css={{
                      display: "flex",
                      flex: "1 0",
                      fontSize: "$xs",
                      padding: "0 $3",
                      height: "56px",
                      borderColor: "1px solid $extraMuted",
                    }}
                    active={transactionType === "withdraw"}
                  >
                    <ArrowUp style={{ paddingRight: ".25rem" }} size={"21px"} />{" "}
                    Withdraw
                  </Button>
                )}
              </>
            </Box>
          </Box>

          <Box
            as="section"
            css={{
              px: "$space$4",
              py: "$space$5",
              width: "$md",
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
                    {unstakedBalance} JUICE
                  </Text>
                  <Text muted>Unstaked in Juicenet</Text>
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
            <Heading>STAKING ACCOUNT</Heading>
            <Box>
              <Text css={{ color: "$muted", fontSize: "$sm" }}>
                Unstaked JUICE: {balances.unstakedJuice}
              </Text>
            </Box>
          </Box>

          <Box
            css={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              mb: "$space$5",
            }}
          >
            {rawBalances.unstakedJuice?.isZero() &&
            rawBalances.juice?.isZero() ? (
              <Text muted>
                {/* TODO: don't show this message if user has active positions */}
                You need to get some $JUICE first, before you can add it to your
                staking account and start making stakes.
              </Text>
            )}
          </Box>
        </Box>
        {Number(juiceAmount) > 0 && (
          <Button
            variant="primary"
            disabled={txDisabled == false ? false : true}
            css={{
              width: "100%",
              boxSizing: "border-box",
              position: "relative",
              zIndex: "43",
              marginTop: "$3",
              height: "56px",
            }}
            onClick={() =>
              transactionType === "deposit"
                ? handleTx(TxTypes.deposit)
                : handleTx(TxTypes.withdraw)
            }
          >
            {transactionType === "deposit"
              ? `Deposit ${juiceAmount} JUICE to Juicenet`
              : `Withdraw ${juiceAmount} JUICE from Juicenet`}
          </Button>
        )}
      </Box>
    </Box>
  ) : (
    <></>
  );
};

export default ActiveWallet;
