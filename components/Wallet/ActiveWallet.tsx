import type * as Stitches from "@stitches/react";
import { isAddress } from "@vanilladefi/core-sdk";
import { getJuiceStakingContract } from "@vanilladefi/stake-sdk";
import { ContractTransaction } from "ethers";
import Link from "next/link";
import { ArrowCircleUpRight, Copy } from "phosphor-react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
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
          target="_blank"
          rel="noopener noreferrer"
          css={{
            color: "$link",
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

  const [juiceAmount, setJuiceAmount] = useState("");
  const [txDisabled, setTxDisabled] = useState<false | TxTypes>(false);

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text);
    toast.success(`Address copied to clipboard`, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }, []);

  const handleTx = useCallback(
    async (type: TxTypes) => {
      if (txDisabled) return;
      if (!signer) return connectWallet();

      const _disabled = !(juiceAmount && +juiceAmount);
      if (_disabled) {
        return;
      }

      setTxDisabled(type);

      const waitingToast = toast.loading("Transaction pending user...", {
        position: toast.POSITION.BOTTOM_CENTER,
      });

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

        toast.update(waitingToast, {
          render: "Waiting for transaction to go through",
        });

        const rec = await tx.wait();
        if (rec.status === 1) {
          toast.update(waitingToast, {
            render: "Transaction successful [LINK]",
            type: "success",
            isLoading: false,
            closeButton: true,
            autoClose: 7000,
          });
        } else {
          toast.update(waitingToast, {
            render: "Transaction failed! [LINK]",
            type: "error",
            isLoading: false,
            closeButton: true,
          });
        }
      } catch (error) {
        console.warn("Error depositing!, ", error);
        let msg = "Some error occured, try again later!";
        if ((error as any)?.code === 4001) {
          msg = "The request was rejected by the user";
        }
        toast.update(waitingToast, {
          render: msg,
          type: "error",
          isLoading: false,
          closeButton: true,
        });
      }
      setJuiceAmount("");
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
            <Box>
              {" "}
              <Text
                css={{
                  fontFamily: "$monospace",
                  fontSize: "$xl",
                }}
              >
                {truncatedWalletAddress}
              </Text>
              <Box
                css={{
                  display: "inline-block",
                  marginRight: "$space$1",
                  height: "30px",
                  cursor: "pointer",
                  pl: "$3",
                  color: "$primary",
                }}
                onClick={() => copyToClipboard(walletAddress)}
              >
                <Copy size={"22px"} style={{ color: "$primary" }} />
              </Box>
            </Box>

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
            <TradeLink
              href={`https://polygonscan.com/address/${walletAddress}`}
            >
              View on Polygonscan
            </TradeLink>
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

            <Box
              css={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-between",
                mb: "$space$1",
              }}
            >
              {balances.matic ? (
                <>
                  <Text css={{ color: "$textA", fontSize: "$xl" }}>
                    {balances.matic} MATIC
                  </Text>
                  <TradeLink href="">Buy MATIC</TradeLink>
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
                Unstaked JUICE: {unstakedBalance}
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
            {Number(unstakedBalance) <= 0 && Number(balances.juice) <= 0 ? (
              <Text muted>
                {/* TODO: don't show this message if user has active positions */}
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
                  disabled={txDisabled == false ? false : true}
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
                    disabled={txDisabled == false ? false : true}
                    onClick={() => handleTx(TxTypes.withdraw)}
                    variant="bordered"
                    css={{ display: "flex", fontSize: "$sm", flex: "1 0" }}
                  >
                    Withdraw {juiceAmount} JUICE
                  </Button>
                )}
                {Number(balances.juice) > 0 && (
                  <Button
                    disabled={txDisabled == false ? false : true}
                    onClick={() => handleTx(TxTypes.deposit)}
                    variant="bordered"
                    css={{ display: "flex", fontSize: "$sm", flex: "1 0" }}
                  >
                    Deposit {juiceAmount} JUICE
                  </Button>
                )}
              </>
            </Box>
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
