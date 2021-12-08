import type * as Stitches from "@stitches/react";
import * as sdk from '@vanilladefi/sdk';
import Link from "next/link";
import {
  ArrowCircleUpRight, Check, Copy
} from "phosphor-react";
import { useCallback, useState } from "react";
import { state, useSnapshot } from '../../state';
import { disconnect } from "../../state/actions/wallet";
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
          <Box css={{ marginLeft: "$space$1", height: '24px' }}>
            <ArrowCircleUpRight size={"24px"} />
          </Box>
        </Text>
      ) : (
        children
      )}
    </Link>
  );
};

const ActiveWallet: React.FC<{ css?: Stitches.CSS }> = ({css}) => {
  const { providerName, walletOpen, walletAddress, truncatedWalletAddress, balances, staked } = useSnapshot(state)

  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback((text) => {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
      }, () => {
        setCopied(false)
      });
    }
  , [])

  return walletOpen ? <Box css={{ display: 'flex', position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center', zIndex: '41',  ...css }}>
    <Curtain />
    <Box css={{ display: 'flex', position: 'relative', background: '$background', flexDirection: 'column', zIndex: '43', border: '$extraMuted 1px solid' }}>
      <Box as='section' css={{ px: '$space$4', py: '$space$5', width: '$md', borderBottom: '1px $extraMuted solid'}}>
        <Box css={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', mb: '$space$5' }}>
          <Heading>WALLET</Heading>
          <Text css={{color: '$muted', fontSize: '$sm' }}>Connected with {providerName}</Text>
        </Box>

        <Box css={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', mb: '$space$5', pb: '$space$5', borderBottom: '1px $extraMuted solid' }}>
          <Text css={{ fontFamily: '$monospace', fontSize: '$xl' }}>{truncatedWalletAddress}</Text>
          <Button variant="primary" size="sm" css={{borderRadius: '999px', border: '0', fontSize: '$sm', fontWeight: 'lighter' }} onClick={() => disconnect()}>Disconnect</Button>
        </Box>

        <Box css={{ display: 'flex', flexDirection: 'column', mb: '$space$5', pb: '$space$5', borderBottom: '1px $extraMuted solid' }}>

          <Box css={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', mb: '$space$1' }}>
            {balances[0] ? (
                <>
                  <Text css={{ color: '$textA', fontSize: '$xl' }}>{balances[0]} JUICE</Text>
                  <TradeLink href="">Buy JUICE</TradeLink>
                </>
              ) : (
                <Loader />
              )}
          </Box>

          <Box css={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', mb: '$space$1' }}>
            {balances[0] ? (
                <>
                  <Text css={{ color: '$textA', fontSize: '$xl' }}>{balances[sdk.vnl.address]} VNL</Text>
                  <TradeLink href="">Buy VNL</TradeLink>
                </>
              ) : (
                <Loader />
              )}
          </Box>
          
        </Box>

        <Box css={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', mb: '$space$1' }}>
          {copied ? (
            <Text css={{ color: "$green",
              textDecoration: "none", display: 'flex', alignItems: 'center', cursor: 'pointer'
            }} onClick={() => copyToClipboard(walletAddress)}>
              <Box css={{ marginRight: "$space$1", height: '24px' }}>
                <Check size={"24px"} style={{ color: "$primary" }} />
              </Box> Copied to clipboard
            </Text>
          ) : (
            <Text css={{ color: "$primary",
              textDecoration: "none", display: 'flex', alignItems: 'center', cursor: 'pointer',
              "&:hover": {
                color: "$text",
              }, }} onClick={() => copyToClipboard(walletAddress)}>
              <Box css={{ marginRight: "$space$1", height: '24px' }}>
                <Copy size={"24px"} style={{ color: "$primary" }} />
              </Box> Copy address
            </Text>
          )}

          <TradeLink href={`https://etherscan.io/address/${walletAddress}`}>View on Etherscan</TradeLink>
        </Box>
      </Box>

      <Box as='section' css={{ px: '$space$4', py: '$space$5', width: '$md', borderBottom: '1px $extraMuted solid'}}>
        <Box css={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', mb: '$space$5' }}>
          <Heading>STAKING BALANCE</Heading>
          <Text css={{color: '$muted', fontSize: '$sm' }}>{staked} JUICE</Text>
        </Box>

        <Box css={{ display: 'flex', flexDirection: 'column', mb: '$space$5' }}>
          <Input size="xl" variant='bordered'></Input>
          <Box css={{ display: 'flex', flexDirection: 'row' }}><Button variant='bordered' css={{display: 'flex', flex: '1 0'}}>Withdraw</Button><Button variant='bordered' css={{display: 'flex', flex: '1 0'}}>Add</Button></Box>
        </Box>
        <Button variant="primary" css={{width: '100%', position: 'relative', boxSizing: 'border-box' }}
        onClick={() => state.walletOpen = false}>Close</Button>
      </Box>


    </Box>
  </Box> : <></>
}

export default ActiveWallet
