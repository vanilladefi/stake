import type * as Stitches from "@stitches/react";
import * as sdk from '@vanilladefi/sdk';
import Link from "next/link";
import {
  ArrowCircleUpRight
} from "phosphor-react";
import { useCallback } from "react";
import { persistedKeys, state, useSnapshot } from '../../state';
import Box from "../Box";
import Button from "../Button";
import Heading from "../Heading";
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
          <Box>
            <ArrowCircleUpRight size={"24px"} style={{ marginLeft: "$space$5" }} />
          </Box>
        </Text>
      ) : (
        children
      )}
    </Link>
  );
};

const ActiveWallet: React.FC<{ css?: Stitches.CSS }> = ({css}) => {
  const { modal, walletOpen, walletAddress, balances, staked } = useSnapshot(state)

  const disconnect = useCallback(
    async () => {
      modal?.clearCachedProvider()
      state.signer = null
      state.walletAddress = null
      state.balances = {}
      state.walletOpen = false
      localStorage.removeItem(persistedKeys.walletAddress)
    },
    [modal]
  )

  const getCachedProviderName = useCallback(() => {
    let name = ''
    switch (modal?.cachedProvider) {
      case 'injected': {
        name = 'Metamask'
        break
      }
      case 'walletconnect': {
        name = 'WalletConnect'
        break
      }
      default: {
        name = ''
      }
    }
    return name
  }, [modal?.cachedProvider])

  const getTruncatedAddress = useCallback(() => {
    return walletAddress ? `${walletAddress?.substring(0, 6)}…${walletAddress?.substring(walletAddress.length - 4)}` : ''
  }, [walletAddress])

  return walletOpen ? <Box css={{ display: 'flex', position: 'absolute', top: '0', left: '0', width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center',  ...css }}>
    <Curtain />
    <Box css={{ display: 'flex', position: 'relative', background: '$background', flexDirection: 'column', zIndex: '43', border: '$extraMuted 1px solid' }}>
      <Box as='section' css={{ px: '$space$4', py: '$space$5', width: '$md', borderBottom: '1px $extraMuted solid'}}>
        <Box css={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', mb: '$space$5' }}>
          <Heading>WALLET</Heading>
          <Text css={{color: '$muted', fontSize: '$sm' }}>Connected with {getCachedProviderName()}</Text>
        </Box>

        <Box css={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', mb: '$space$5', pb: '$space$5', borderBottom: '1px $extraMuted solid' }}>
          <Text css={{ fontFamily: '$monospace', fontSize: '$xl' }}>{getTruncatedAddress()}</Text>
          <Button variant="primary" size="sm" css={{borderRadius: '999px', border: '0', fontSize: '$sm', fontWeight: 'lighter' }} onClick={disconnect}>Disconnect</Button>
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
      </Box>

      <Box as='section' css={{ px: '$space$4', py: '$space$5', width: '$md', borderBottom: '1px $extraMuted solid'}}>
        <Box css={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', mb: '$space$5' }}>
          <Heading>STAKING BALANCE</Heading>
          <Text css={{color: '$muted', fontSize: '$sm' }}>{staked} JUICE</Text>
        </Box>

        <Button variant="primary" css={{width: '100%', position: 'relative', boxSizing: 'border-box' }}
        onClick={() => state.walletOpen = false}>Close</Button>
      </Box>

    </Box>
  </Box> : <></>
}

export default ActiveWallet
