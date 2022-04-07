import type * as Stitches from "@stitches/react";
import { isAddress, juiceDecimals } from "@vanilladefi/core-sdk";
import { getJuiceStakingContract } from "@vanilladefi/stake-sdk";
import { ContractTransaction, ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { ArrowDown, ArrowUp, Copy, XCircle } from "phosphor-react";
import { useCallback, useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { toast } from "react-toastify";
import { PolygonScanIcon } from "../../assets";
import { state, useSnapshot, VanillaEvents } from "../../state";
import { connectWallet, disconnect } from "../../state/actions/wallet";
import { emitEvent, getTransactionLink, parseJuice } from "../../utils/helpers";
import Box from "../Box";
import Button from "../Button";
import Input from "../Input";
import Link from "../Link";
import Loader from "../Loader";
import Text from "../Text";
import Curtain from "./Curtain";


enum TxTypes {
  deposit,
  withdraw,
}

{
  /* TradeLinks are added as soon as it's figured out where tokens are to be purchased
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
            ml: "$1",
            lineHeight: "$md",
            alignItems: "center",
            borderRadius: "400px",
            "&:hover": {
              color: "$text",
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
}; */
}

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
  >("deposit");

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text);
    toast.success(`Address copied to clipboard`, {
      autoClose: 2000,
      hideProgressBar: true,
    });
  }, []);

  function usePrevious(value: string | undefined) {
    const ref = useRef<string | undefined>();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  useEffect(() => {
    const close = (e: { key: string }) => {
      if (e.key === "Escape") {
        state.walletOpen = false;
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const prevWalletJuice = usePrevious(balances.juice);
  const prevUnstakedJuice = usePrevious(balances.unstakedJuice);

  const handleTx = useCallback(
    async (type: TxTypes) => {
      if (txDisabled) return;
      if (!signer) return connectWallet();

      const _disabled = !(juiceAmount && +juiceAmount);
      if (_disabled) {
        return;
      }

      const amount = parseJuice(juiceAmount);

      if (type === TxTypes.deposit && amount.gt(rawBalances.juice || 0)) {
        return toast.error("Insufficient JUICE in Wallet.");
      }
      if (
        type === TxTypes.withdraw &&
        amount.gt(rawBalances.unstakedJuice || 0)
      ) {
        return toast.error("Insufficient balance in Juicenet");
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
    [
      juiceAmount,
      rawBalances.juice,
      rawBalances.unstakedJuice,
      signer,
      txDisabled,
    ]
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
          width: "100%",
          maxWidth: "$md",
          minWidth: "300px",
          mx: "$2",
        }}
      >
        <Box
          css={{
            display: "flex",
            position: "relative",
            alignItems: "flex-end",
            justifyContent: "right",
            width: "100%",
            color: "$primary",
            flexDirection: "column",
            zIndex: "43",
            padding: "$2 0",
            height: "44px",
            cursor: "pointer",
            "&:hover": {
              color: "$text",
            },
          }}
          onClick={() => (state.walletOpen = false)}
        >
          <XCircle size={"24px"} />
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
              py: "$space$4",
            }}
          >
            <Box
              css={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Box
                css={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "left",
                }}
              >
                <Text
                  css={{
                    fontFamily: "$monospace",
                    fontSize: "$xl",
                    display: "inline-block",
                    lineHeight: "$9",
                    width: "100%",
                  }}
                >
                  {truncatedWalletAddress}
                </Text>
                <Text
                  css={{
                    fontSize: "$xs",
                    textTransform: "uppercase",
                    color: "$offWhite50",
                    width: "100%",
                    mt: "$1",
                  }}
                >
                  Connected with {providerName}
                </Text>
              </Box>

              <Box
                css={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  border: "1px solid $extraMuted",
                }}
              >
                <Button
                  variant="bordered"
                  title="Disconnect wallet"
                  size="sm"
                  css={{
                    fontSize: "$sm",
                    boxShadow: "none",
                    borderRight: "1px solid $extraMuted",
                    height: "40px",
                    fontWeight: "lighter",
                    "&:hover": {
                      color: "$text",
                    },
                  }}
                  onClick={() => disconnect()}
                >
                  Disconnect
                </Button>
                <Box
                  title="Copy wallet address to clipboard"
                  css={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "$link",
                    width: "40px",
                    height: "40px",
                    borderRight: "1px solid $extraMuted",
                    "&:hover": {
                      color: "$text",
                    },
                  }}
                  onClick={() => copyToClipboard(walletAddress)}
                >
                  <Copy size={"22px"} style={{ color: "$link" }} />
                </Box>
                <Link
                  css={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    "&:hover": {
                      color: "$text",
                    },
                  }}
                  as="a"
                  title="View account on Polygonscan"
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`https://polygonscan.com/address/${walletAddress}`}
                >
                  <PolygonScanIcon fill="currentColor" />
                </Link>
              </Box>
            </Box>

            <Box
              css={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                mt: "$2",
                pb: "$3",
                borderBottom: "1px solid $extraMuted",
              }}
            >
              <Box
                css={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                {balances.vnl ? (
                  <>
                    <Text css={{ color: "$offWhite50", fontSize: "$sm" }}>
                      {balances.vnl} VNL{" "}
                      {/*<TradeLink href="">Buy</TradeLink>*/}
                    </Text>
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
                }}
              >
                {balances.matic ? (
                  <>
                    <Text css={{ color: "$offWhite50", fontSize: "$sm" }}>
                      {balances.matic} MATIC{" "}
                      {/*<TradeLink href="">Buy</TradeLink> */}
                    </Text>
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
                alignItems: "baseline",
                justifyContent: "space-between",
                mt: "$5",
              }}
            >
              {balances.juice ? (
                <>
                  <Box>
                    <Text
                      css={{
                        borderBottom: "1px solid transparent",
                        borderColor:
                          transactionType === "deposit"
                            ? "$extraMuted"
                            : "transparent",
                        color: "$textA",
                        fontSize: "$xxl",
                        marginRight: "$1",
                        cursor:
                          transactionType === "deposit" ? "pointer" : "default",
                      }}
                      onClick={() =>
                        transactionType === "deposit" &&
                        txDisabled === false &&
                        rawBalances.juice &&
                        setJuiceAmount(
                          formatUnits(rawBalances.juice, juiceDecimals)
                        )
                      }
                    >
                      <CountUp
                        start={Number(prevWalletJuice) > 0 ? Number(prevWalletJuice) : 0}
                        end={Number(ethers.utils.formatUnits(rawBalances.juice || 0, juiceDecimals))}
                        duration={2}
                        decimals={3}
                        decimal="."
                        suffix=" JUICE"
                      />
                    </Text>
                    {/* <TradeLink href="">Buy</TradeLink> */}
                  </Box>
                  <Text muted>In your wallet</Text>
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
              borderTop: "1px solid $extraMuted",
              borderBottom: "1px solid $extraMuted",
              mb: "$space$2",
              height: "60px",
              width: "100%",
              backgroundColor: "$tableZebra",
            }}
          >
            <Box
              css={{
                position: "relative",
                width: "50%",
              }}
            >
              <Input
                type="number"
                autoFocus
                disabled={txDisabled === false ? false : true}
                value={juiceAmount}
                onChange={(e) => setJuiceAmount(e.target.value)}
                size="xl"
                placeholder="0.0"
                css={{
                  height: "100%",
                  width: "92.5%", // TODO revise, just to prevent x button on overlaping
                  padding: "1rem 1rem",
                  border: 0,
                  fontSize: "$xxl",
                  boxShadow: "none !important",
                }}
              />
              <Box
                css={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "right",
                  textAlign: "right",
                  color: "$offWhite50",
                  position: "absolute",
                  top: 0,
                  height: "100%",
                  right: "$2",
                  cursor: juiceAmount ? "pointer" : "default",
                  zIndex: 5,
                  minWidth: "40px",
                  "&:hover": {
                    color: juiceAmount ? "$muted" : "$offWhite50",
                  },
                }}
                onClick={() => (!txDisabled ? setJuiceAmount("") : null)}
              >
                {juiceAmount ? (
                  <XCircle style={{ marginRight: "-0.2rem" }} size={"20px"} />
                ) : (
                  <>JUICE</>
                )}
              </Box>
            </Box>

            <Box
              css={{
                width: "50%",
                display: "flex",
                flexShrink: "0",
                flexDirection: "row",
                marginLeft: "2px",
                padding: "8px",
              }}
            >
              <Button
                disabled={txDisabled != false}
                uppercase
                outline
                onClick={() => setTransactionType("deposit")}
                active={transactionType === "deposit"}
                css={{
                  boxShadow: "none",
                  display: "flex",
                  fontSize: "$xs",
                  padding: "0 $3",
                  color:
                    transactionType === "deposit" ? "$background" : "$muted",
                  transition: "background-color .15s",
                  height: "100%",
                  width: "100%",
                  backgroundColor:
                    transactionType === "deposit" ? "$text" : "$tableZebra",
                }}
              >
                <Text
                  css={{
                    lineHeight: "$xs",
                    color: "inherit",
                  }}
                  display={{
                    "@initial": "none",
                    "@sm": "inline",
                  }}
                >
                  Deposit
                </Text>
                <ArrowDown
                  style={{
                    paddingLeft: ".25rem",
                    transformOrigin: "top",
                    animationDuration: "2s",
                    animationFillMode: "forwards",
                    animationIterationCount: "1",
                    animationName:
                      transactionType === "deposit" ? "bounce-down" : "none",
                    animationTimingFunction: "ease",
                  }}
                  size={"21px"}
                />
              </Button>

              {rawBalances.unstakedJuice?.gt(0) && (
                <Button
                  disabled={txDisabled != false}
                  uppercase
                  onClick={() => setTransactionType("withdraw")}
                  outline
                  css={{
                    boxShadow: "none",
                    display: "flex",
                    fontSize: "$xs",
                    color:
                      transactionType === "withdraw" ? "$background" : "$muted",
                    padding: "0 $3",
                    transition: "background-color .15s",
                    width: "100%",
                    height: "100%",
                    backgroundColor:
                      transactionType === "withdraw" ? "$text" : "$tableZebra",
                  }}
                  active={transactionType === "withdraw"}
                >
                  <ArrowUp
                    style={{
                      paddingRight: ".25rem",
                      transformOrigin: "bottom",
                      animationDuration: "2s",
                      animationFillMode: "forwards",
                      animationIterationCount: "1",
                      animationName:
                        transactionType === "withdraw" ? "bounce-up" : "none",
                      animationTimingFunction: "ease",
                    }}
                    size={"21px"}
                  />{" "}
                  <Text
                    display={{
                      "@initial": "none",
                      "@sm": "inline",
                    }}
                    css={{ lineHeight: "$xs", color: "inherit" }}
                  >
                    Withdraw
                  </Text>
                </Button>
              )}
            </Box>
          </Box>

          <Box
            as="section"
            css={{
              px: "$space$4",
              my: "$3",
              width: "100%",
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
              {balances.unstakedJuice ? (
                <>
                  <Text
                    css={{
                      borderBottom: "1px solid transparent",
                      borderColor:
                        transactionType === "withdraw"
                          ? "$extraMuted"
                          : "transparent",
                      color: "$textA",
                      fontSize: "$xxl",
                      marginRight: "$1",
                      cursor:
                        transactionType === "withdraw" ? "pointer" : "default",
                    }}
                    onClick={() =>
                      transactionType === "withdraw" &&
                      txDisabled === false &&
                      rawBalances.unstakedJuice &&
                      setJuiceAmount(
                        formatUnits(rawBalances.unstakedJuice, juiceDecimals)
                      )
                    }
                  >
                    {/* {balances.unstakedJuice} JUICE */}
                    <CountUp
                      start={Number(prevUnstakedJuice)}
                      end={Number(ethers.utils.formatUnits(rawBalances.unstakedJuice || 0, juiceDecimals))}
                      duration={2}
                      decimals={3}
                      decimal="."
                      suffix=" JUICE"
                    />
                  </Text>
                  <Text muted>Unstaked in Juicenet</Text>
                </>
              ) : (
                <Loader />
              )}
            </Box>
            {rawBalances.unstakedJuice?.isZero() &&
              rawBalances.stakedJuice?.isZero() && (
                <Text muted>
                  You need to{" "}
                  {rawBalances.juice?.isZero() && "get $JUICE and then"} deposit
                  $JUICE to Juicenet before you can start making stakes.
                </Text>
              )}
          </Box>
        </Box>

        <Button
          variant="primary"
          disabled={txDisabled != false || +juiceAmount == 0}
          css={{
            width: "100%",
            height: "auto",
            textAlign: "center",
            boxSizing: "border-box",
            position: "relative",
            zIndex: "43",
            marginTop: "$3",
            fontSize: "$xl",
            minHeight: "56px",
            display: "flex",
            padding: "1rem 2rem",
            alignItems: "center",
            transition: "opacity 0.3s",
          }}
          onClick={() =>
            transactionType === "deposit"
              ? handleTx(TxTypes.deposit)
              : handleTx(TxTypes.withdraw)
          }
        >
          {+juiceAmount > 0 && transactionType === "deposit" ? (
            `Deposit ${juiceAmount} JUICE to Juicenet`
          ) : +juiceAmount > 0 && transactionType === "withdraw" ? (
            `Withdraw ${juiceAmount} JUICE from Juicenet`
          ) : (
            <>Enter a JUICE Amount to transfer</>
          )}
        </Button>
      </Box>
    </Box>
  ) : (
    <></>
  );
};

export default ActiveWallet;
