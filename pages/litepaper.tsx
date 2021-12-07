import { styled } from "../stitches.config";
import Image from "next/image";
import TeX from "@matejmazur/react-katex";
import { Link as LinkIconP, ArrowUpRight } from "phosphor-react";
import "katex/dist/katex.min.css";
import type * as Stitches from "@stitches/react";

import Box from "../components/Box";
import Text from "../components/Text";
import Paragraph from "../components/Paragraph";
import Link from "../components/Link";
import Button from "../components/Button";
import ThemeHeading from "../components/Heading";
import Container from "../components/Container";

import Stack from "../components/Stack";

const Heading = styled(ThemeHeading, {
  fontFamily: "$body",
  textTransform: "none",
  my: "$6",
  lineHeight: "$body",
});

const LinkIcon = styled(LinkIconP, {
  color: "$text",
});

const ThemeLink = styled(Link, {
  color: "$link",
});

const ExtLink: React.FC<{ href: string; css?: Stitches.CSS }> = ({
  href,
  children,
  css,
}) => {
  return (
    <Link href={href} passHref>
      {typeof children === "string" ? (
        <ThemeLink as="a" target="_blank" rel="noreferrer noopener">
          {children}
          <ArrowUpRight
            weight="light"
            style={{ marginLeft: "3px" }}
            size="14px"
          />
        </ThemeLink>
      ) : (
        ""
      )}
    </Link>
  );
};

const Faq = () => {
  return (
    <Container
      css={{
        maxWidth: "$4xl",
      }}
    >
      <Box
        css={{
          borderBottom: "1px solid $muted",
          pb: "$8",
        }}
      >
        <ThemeHeading
          as="h1"
          css={{
            boxSizing: "border-box",
            pt: "$16",
            pb: "$8",
            my: 0,

            "@initial": {
              fontSize: "$3xl",
            },
            "@sm": {
              fontSize: "$4xl",
            },
            "@md": {
              fontSize: "$6xl",
            },
            "@lg": {
              fontSize: "$7xl",
            },
          }}
        >
          A Decentralized Asset Manager for Web3
        </ThemeHeading>
        <Text
          css={{
            fontSize: "$2xl",
          }}
        >
          Vanilla is a decentralized asset manager for Web3. It uses a novel
          prediction market mechanism to actively manage a permissionless,
          on-chain investment portfolio.
        </Text>
      </Box>
      <Stack
        css={{
          flexDirection: "column",
          mb: "$5",
          [`> ${Box}`]: {
            borderBottom: "1px solid $muted",
            pb: "$9",
            "&:last-child": {
              borderBottom: 0,
            },
          },
        }}
      >
        <Box>
          <Heading as="h2" id="1-introduction">
            <ThemeLink href="#1-introduction">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            1. Introduction
          </Heading>
          <Paragraph>
            The core value proposition of blockchains is programmable ownership.
            This ability to imbue explicit and verifiable rights to a digital
            asset has created a Cambrian explosion of innovation. Along with
            this innovation, the blockchain industry, which we refer to as Web3,
            has also seen unprecedented wealth creation. In 2021, just 13 years
            after the launch of bitcoin, the entire industry had a market
            capitalization of almost three trillion dollars. DAO treasuries are
            now measured in the billions, with Uniswap alone controlling over
            $10B in assets.
          </Paragraph>
          <Paragraph>
            This incredible wealth creation brings new problems to tackle. As an
            industry, we now have the resources of a nation state we can put to
            use in building out our decentralized future, but we also have the
            responsibilities of a nation state to manage those assets in a way
            that allows us to weather any storm in the future. In other words,
            Web3 now needs to get as good at asset management as we are in
            distributed systems engineering.
          </Paragraph>
          <Paragraph>
            We can, of course, look to the traditional finance world for
            inspiration, but we should be wary of incorporating old ideas too
            readily. The legacy financial system was designed for a pen and
            paper world that hardly even exists anymore and has a questionable
            track record at best. So, while there are lessons to be learned from
            the traditional financial system, a more sensible approach would be
            to design natively for the Web3 ecosystem, using all the tools we
            now have at our disposal. That is what we have attempted to do.
          </Paragraph>
          <Paragraph>
            Vanilla is a decentralized asset manager for Web3. It uses a
            prediction market-like mechanism (Juicenet) to dynamically assign
            and modify portfolio weights in a{" "}
            <ExtLink href="https://docs.balancer.fi/products/balancer-pools/managed-pools">
              Balancer Managed Pool
            </ExtLink>{" "}
            (Vanilla Investment Pool). Juicenet users take synthetic long and
            short positions in tokens, and the aggregate weights of these
            positions form target portfolio weights for the Vanilla Investment
            Pool. The system is self-improving in that it rewards Juicenet users
            (Juicers) who contribute positions that generate a positive return
            with more influence over the system while removing influence from
            users who contribute unprofitable positions. The system is also
            permissionless, and thus anyone can participate in Juicenet or
            contribute their capital to the Vanilla Investment Pool to be
            managed by Juicenet.
          </Paragraph>{" "}
          <p>SIMPLE GRAPH 1 HERE</p>
          <Paragraph>
            Vanilla uses a dual token system to achieve the desired incentives.
            Juicenet users stake JUICE to take long and short positions, where
            profitable positions earn more JUICE, while unprofitable positions
            lose JUICE.
          </Paragraph>
          <Paragraph>
            VNL is the governance token of the Vanilla system. Holders of VNL
            operate the Vanilla protocol and control the treasury. The treasury
            receives fees from the Vanilla Investment Pool and uses the fees to
            invest in the ecosystem and incentivize JUICE holders.
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h2" id="1-1-history">
            <ThemeLink href="#1-1-history">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            History Of Decentralized Asset Management
          </Heading>
          <Paragraph>
            In 2016,{" "}
            <ExtLink href="https://en.wikipedia.org/wiki/The_DAO_(organization)">
              TheDAO
            </ExtLink>{" "}
            was the first attempt at decentralized asset management. It gained
            notoriety due to the vast amount of crowdsourced funding it received
            and the major exploit that caused a third of the funds to be locked,
            leading to an Ethereum hard fork to reclaim the funds. While the
            outcome was less than ideal, TheDAO demonstrated significant demand
            for decentralized asset management. Since then, many projects have
            attempted to tackle the problem in various ways.
          </Paragraph>
          <Paragraph>
            Post-TheDAO, venture-capital-style asset management was pioneered by{" "}
            <ExtLink href="https://www.molochdao.com/">MolochDAO</ExtLink> and
            later{" "}
            <ExtLink href="https://metacartel.xyz/">
              MetaCartel Ventures
            </ExtLink>
            . These entities are comparable to syndicates, whereby a group of
            individuals or organizations pool their capital and vote on
            investments from the pool. These structures work well for small
            groups of people making a limited amount of due diligence heavy
            investments into mainly non-liquid tokens. However, they are not
            permissionless nor automated.
          </Paragraph>
          <Paragraph>
            <ExtLink href="https://enzyme.finance/">Enzyme Finance</ExtLink> and{" "}
            <ExtLink href="https://www.tokensets.com/">TokenSets</ExtLink> have
            focused on building out infrastructure for on-chain asset
            management, whereby anyone can effortlessly launch an on-chain,
            non-custodial (and in most cases permissionless) fund, which can
            invest in liquid tokens. These technologies make it easier to pool
            capital under a single entity responsible for managing the assets,
            but they do not provide any solutions for making asset management
            decisions.
          </Paragraph>
          <Paragraph>
            Finally, there has been a lot of progress in automating and
            yield-optimizing lending activities. Projects such as Yearn Finance
            and CREAM allow investors to passively invest in “yield farming”
            strategies that programmatically allocate capital to wherever the
            highest yields are to be found. These services help optimize
            existing portfolios, but they don’t assist in portfolio construction
            or provide solutions for asset management.
          </Paragraph>
          <Paragraph>
            A largely unexplored area is a decentralized asset manager for
            liquid tokens, which could automatically construct and manage a
            dynamic portfolio of assets. While there are already assets, which
            resemble index funds, such as DeFi Pulse Index, they are not
            automated and use static techniques for determining portfolio
            weights, such as weighting by market cap. We imagine a dynamic
            system where portfolio weights are automatically determined using as
            much information and nuance as is available in the market, which, if
            successful, should yield considerably higher returns while
            maintaining a similar risk profile to static techniques.
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h2" id="what-is-profitmining">
            <ThemeLink href="what-is-profitmining">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            What is #ProfitMining?
          </Heading>
          <Text>
            Profit mining is a novel token distribution mechanism, where you
            &ldquo;mine&rdquo; VNL tokens by making a profit calculated in ETH.
            The more profit you make and the longer you&quot;ve held your
            positions before selling, the more VNL you mine. Mining difficulty
            also increases over time, making early mining more lucrative. You
            can see which tokens are eligible for profit mining on the Trade
            page.
          </Text>
        </Box>
        <Box>
          <Heading as="h2" id="how-do-i-trade-tokens-using-vanilla">
            <ThemeLink href="#how-do-i-trade-tokens-using-vanilla">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            How do I trade tokens using Vanilla?
          </Heading>
          <Text>
            Simply go to the trade page, choose a token and execute the purchase
            with ETH using{" "}
            <ThemeLink href="https://metamask.io/">Metamask</ThemeLink> or
            <ThemeLink href="https://walletconnect.org/">
              WalletConnect
            </ThemeLink>
            . The Vanilla contracts will execute the purchase on{" "}
            <ThemeLink href="https://uniswap.org">Uniswap</ThemeLink> and the
            tokens will be stored in the Vanilla smart contract. You can sell
            the tokens at any time to claim profit mining rewards and once sold,
            the ETH, including any profit you&quot;ve made, will be returned to
            your wallet along with the VNL tokens you&quot;ve mined.
          </Text>
        </Box>
        <Box>
          <Heading
            as="h2"
            id="can-i-move-tokens-ive-purchased-through-vanilla?"
          >
            <ThemeLink href="#can-i-move-tokens-ive-purchased-through-vanilla?">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            Can I move tokens I&apos;ve purchased through Vanilla?
          </Heading>
          <Text>
            Not right now. We will be adding this capability in the future, but
            it makes calculating profit mining rewards more difficult so we have
            left it out of scope for now.
          </Text>
        </Box>
        <Box>
          <Heading as="h2" id="does-vanilla-include-a-native-token">
            <ThemeLink href="#does-vanilla-include-a-native-token">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            Does Vanilla include a native token?
          </Heading>
          <Text>
            Yes. VNL is the native asset of the Vanilla ecosystem. VNL is
            created by profit mining and is used for governance of the protocol.
          </Text>
        </Box>
        <Box>
          <Heading as="h2" id="was-there-an-ico-or-premine">
            <ThemeLink href="#was-there-an-ico-or-premine">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            Was there an ICO or premine?
          </Heading>
          <Text>
            No. The entire initial supply of VNL was created via profit mining
            by the community. Later the community collectively decided to fund
            the VanillaDAO alongside the Vanilla v1.1 launch by minting an
            amount equal to 15% of total supply to the Vanilla Treasury.
          </Text>
        </Box>
        <Box>
          <Heading as="h2" id="who-created-vanilla">
            <ThemeLink href="#who-created-vanilla">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            Who created Vanilla?
          </Heading>
          <Text>
            Vanilla was developed by{" "}
            <ThemeLink href="https://equilibrium.co/">Equilibrium</ThemeLink>{" "}
            and the initial smart contracts were deployed by an anonymous
            community member to the Ethereum blockchain.
          </Text>
        </Box>
        <Box>
          <Heading as="h2" id="is-vanilla-secure">
            <ThemeLink href="#is-vanilla-secure">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            Is Vanilla secure?
          </Heading>
          <Text>
            The Vanilla system has been security audited extensively by{" "}
            <ThemeLink href="https://peckshield.com/en">Peckshield</ThemeLink>{" "}
            and{" "}
            <ThemeLink href="https://leastauthority.com/">
              Least Authority
            </ThemeLink>{" "}
            and there is an active bug bounty, but it is still experimental beta
            software as with most things built on Ethereum. We take the safety
            of your funds extremely seriously, but perfect security doesn&apos;t
            exist so tread carefully.
          </Text>
        </Box>
        <Box>
          <Heading as="h2" id="is-vanilla-decentralized">
            <ThemeLink href="#is-vanilla-decentralized">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            Is Vanilla decentralized?
          </Heading>
          <Text>
            Yes. Most of Vanilla&apos;s contract logic is non-upgradable and
            thus can&apos;t be changed by anyone. The only exception to this is
            the dynamic safelist which is controlled by the VanillaDAO.
          </Text>
        </Box>
        <Box>
          <Heading as="h2" id="what-is-the-vanilladao">
            <ThemeLink href="#what-is-the-vanilladao">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            What is the VanillaDAO?
          </Heading>
          <Text>
            The VanillaDAO is a community controlled 4-out-of-7 ethereum
            multi-sig wallet, which hosts the VanillaDAO treasury and is used
            for deploying some parts of the Vanilla protocol. Equilibrium
            controls 3 of the 7 signers and the remaining 4 signers are the
            largest VNL holders from the community who volunteered.
          </Text>
        </Box>
        <Box>
          <Heading as="h2" id="can-i-profit-mine-with-any-erc-20">
            <ThemeLink href="#can-i-profit-mine-with-any-erc-20">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            Can I profit-mine with any ERC-20?
          </Heading>
          <Text>
            No. Vanilla incorporates a dynamic <em>safe-list</em> of tokens,
            which is controlled by the VanillaDAO and defines the ERC-20 tokens
            that are eligible for profit mining rewards. The safelist allows the
            community to ensure that only legitimate tokens with enough
            liquidity can be traded through Vanilla Trade.
          </Text>
        </Box>
        <Box>
          <Heading
            as="h2"
            id="how-are-profit-mining-rewards-calculated-for-trading"
          >
            <ThemeLink href="#how-are-profit-mining-rewards-calculated-for-trading">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            How are profit mining rewards calculated for trading?
          </Heading>
          <Text>
            To calculate mining rewards in trade <TeX math="i" /> which sells
            tokens, Vanilla uses the following algorithm:
            <TeX math="R_{i}=P_{i}*H_{i}" block />
            where
            <ul>
              <li>
                <TeX math="R_{i}" /> is the amount of VNL reward the trader
                gets.
              </li>
              <li>
                <TeX math="P_{i}" /> is the amount of rewardable Ether profit
                made in the trade.
              </li>
              <li>
                <TeX math="H_{i}" /> is the{" "}
                <em>Holding/Trading Ratio (Squared)</em>
              </li>
            </ul>
          </Text>
        </Box>
        <Box>
          <Heading as="h2" id="how-is-rewardable-profit-calculated">
            <ThemeLink href="#how-is-rewardable-profit-calculated">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            How is rewardable profit calculated?
          </Heading>
          <Text>
            Absolute profit is determined by the positive difference of how much
            WETH the trader used to buy tokens and how much WETH the trader got
            back when selling those tokens. For example, buying 1000 USDC with 1
            WETH, and selling them all for 2 WETH would equal 1 WETH profit. To
            calculate the profit of the trade, the Vanilla contract must keep
            track of the purchase price. However, if the trader buys 1000 USDC
            for 1 WETH, then 1000 USDC for 0.5 WETH, and finally sells 1500 USDC
            for 1.5 WETH, what is the profit? Unfortunately, the traditionally
            used pricing conventions{" "}
            <ThemeLink href="https://en.wikipedia.org/wiki/FIFO_and_LIFO_accounting">
              FIFO and LIFO
            </ThemeLink>{" "}
            are impractical to implement in smart contracts due to the gas costs
            of keeping track of all purchases. Instead, Vanilla uses a
            <em>Weighted Average Exchange Rate</em> to maintain the average
            purchase price for all token inventory in a fair and gas efficient
            way. Weighted Average Exchange Rate after `i` trades is calculated
            using two variables, (
            <TeX math="E_{i}" />) which represents the adjusted sum of WETHs
            used in trading and (
            <TeX math="T_{i}" />) which represents the trader&quot;s token
            balance. When buying <TeX math="Q_{token}" /> tokens with{" "}
            <TeX math="Q_{eth}" />, Vanilla updates the variables as:
            <TeX
              math="\begin{aligned}
T_{i} &= T_{i-1} + Q_{token} \\
E_{i} &= E_{i-1} + Q_{eth}
\end{aligned}"
              block
            />
            When selling <TeX math="Q_{token}" /> tokens for{" "}
            <TeX math="Q_{eth}" />, Vanilla calculates the absolute profit as:
            <TeX
              math="P_{i}^{abs}=max(Q_{eth}-\frac{Q_{token}*E_{i-1}}{T_{i-1}},0)"
              block
            />
            and updates the variables for the next trade as
            <TeX
              math="\begin{aligned}
T_{i}&=T_{i-1}-Q_{token} \\
E_{i}&=\frac{E_{i-1}*T_{i}}{T_{i-1}}
\end{aligned}"
              block
            />
            For reference, the quote for the average purchase price is
            calculated simply as a ratio of the two variables:
            <TeX math="{price}_{i}^{avg}=\frac{T_{i}}{E_{i}}" />
            Finally, the rewardable Ether profit is calculated as the positive
            difference of average purchase price and the rewardable price.{" "}
            <TeX math="{P}_{i}= max(P_{i}^{R} - {price}_{i}^{avg}, 0)" />
          </Text>
        </Box>
        <Box>
          <Heading as="h2" id="            {">
            <ThemeLink href="#            {">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            What is &quot;observation cardinality&quot; and why it matters in
            profit mining?
          </Heading>
          <Text>
            Price manipulation is one of the biggest risks for VNL value. If a
            malicious trader can manipulate the token&apos;s ETH price in
            Uniswap at will, then they can easily rig the VNL supply. Price
            oracles are commonly used to mitigate this. Uniswap v3 introduced
            robust price oracles which enable the pool to store variable amount
            of price observations on-chain. Integrating smart contracts can then
            use the observations to calculate a{" "}
            <ThemeLink href="https://docs.uniswap.org/protocol/concepts/V3-overview/oracle#deriving-price-from-a-tick">
              time-weighted average price
            </ThemeLink>
            (TWAP) across a time interval. Larger the time interval, the
            costlier it becomes to manipulate the average price. The
            <em>observation cardinality</em> is the maximum number of the price
            observations in the Uniswap pool.{" "}
            <ThemeLink href="https://docs.uniswap.org/protocol/reference/core/UniswapV3Pool#increaseobservationcardinalitynext">
              Growing it
            </ThemeLink>
            requires someone to pay the fees and it&apos;s not incentivized in
            any way, which is probably why many pools still have the initial
            cardinality 1. When the cardinality is 1, it effectively means the
            pool doesn&apos;t keep enough price observation history to calculate
            any robust price average. Vanilla uses the pool oracle in profit
            mining calculations to compute a TWAP across a 5-minute interval,
            which is the <em>rewardable price</em> <TeX math="P_{i}^{R}" />. If
            the pool doesn&apos;t have enough observations to compute the full
            5-minute TWAP, then the rewardable price is weighted proportionally
            based on longest available TWAP interval ({" "}
            <TeX math="P_{i}^{pool}" /> across <TeX math="t" /> seconds):
            <TeX
              math="\begin{aligned}
P_{i}^{R}&=\frac{P_{i}^{pool} * t + {price}_{i}^{avg} * (300-t)}{300}
\end{aligned}"
              block
            />
            If the price observation history is not available at all (i.e.
            observation cardinality = 1), then the rewardable price will equal
            to the average purchasing price, meaning there&apos;s no rewardable
            profit and VNL will not be rewarded. This is also why the
            cardinality warning is displayed in the trading UI.
          </Text>
        </Box>
        <Box>
          <Heading
            as="h2"
            id="what-is-the-holding-trading-ratio-squared-and-why-does-vanilla-use-it"
          >
            <ThemeLink href="#what-is-the-holding-trading-ratio-squared-and-why-does-vanilla-use-it">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            What is the Holding/Trading Ratio (Squared) and why does Vanilla use
            it?
          </Heading>
          <Text>
            For each token you trade, Vanilla maintains the{" "}
            <em>Weighted Average Purchase Block</em> (WAPB) or{" "}
            <TeX math="B_{i}^{w}" />. The WAPB after $i$ trades is calculated by
            using two variables, <TeX math="A_{i}" /> which represents the
            token-volume weighted sum of block numbers of the purchases and{" "}
            <TeX math="T_{i}" />, which represents the trader&apos;s token
            balance, used already in Weighted Average Exchange Rate-
            calculations. When buying <TeX math="Q_{token}" /> tokens in a block
            number <TeX math="B_{i}" />, Vanilla updates the{" "}
            <TeX math="A_{i}" /> as:
            <TeX math="A_{i}=A_{i-1}+Q_{token}*B_{i}" block />
            When selling <TeX math="Q_{token}" /> tokens, Vanilla updates the{" "}
            <TeX math="A_{i}" block /> proportionally to token balance change
            as:
            <TeX
              math="\begin{aligned}
T_{i} &= T_{i-1}-Q_{token} \\
A_{i} &= \frac{A_{i-1}*T_i}{T_{i-1}}
\end{aligned}"
              block
            />
            The Weighted Average Purchase Block is then calculated as a ratio of
            these two variables:
            <TeX math="B_{i}^{w} = \frac{A_{i}}{T_{i}}" block />
            Knowing this average block, The Holding/Trading Ratio (Squared) is
            calculated as:
            <TeX
              math="H_i=(\frac{B_{sell}-B_{i}^{w}}{B_{sell}-B_{epoch}})^2"
              block
            />
            where - <TeX math="B_{sell}" /> is the block number, when a
            sell-transaction happens. - <TeX math="B_{epoch}" /> is the
            immutable <em>epoch block</em> 12134736, in which the Vanilla
            contracts were{" "}
            <ThemeLink href="https://etherscan.io/tx/0x55d97be881ae9313cf78ebe1c28b15e6269b5938cc78fa3734c3769587cf6e7e">
              deployed to the mainnet
            </ThemeLink>
            . The Holding/Trading Ratio (Squared) component can be interpreted
            as a ratio of two times: - Nominator{" "}
            <TeX math="B_{sell}-B_{i}^{w}" /> is the <em>holding time</em>, the
            number of blocks the token has been held before selling. Keeping the
            trade open longer will yield higher rewards. If the duration is
            zero, i.e. the trade is closed in the same block it was initiated,
            the profit will be zero. This ensures that no flash loan attacks can
            be carried out. - Denominator <TeX math="B_{sell}-B_{epoch}" /> is
            the <em>total trading time</em>, the number of blocks the Vanilla
            system itself has been operational. The total trading time will
            always increase. In other words, the Holding/Trading Ratio (Squared)
            is just a ratio of times: The time the trade has been open compared
            to the time the system has been open. The times are measured in
            Ethereum blocks.
          </Text>
        </Box>
        <Box>
          <Heading
            as="h2"
            id="simple-heuristics-to-illustrate-the-core-mechanisms"
          >
            <ThemeLink href="#simple-heuristics-to-illustrate-the-core-mechanisms">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            Simple heuristics to illustrate the core mechanisms
          </Heading>
          <Text css={{ mb: "$3" }}>
            The following charts and tables depict simple heuristics of the
            incentive mechanisms. In all heuristics we vary one input in the VNL
            reward formula while keeping the other inputs unchanged and plot the
            amount of VNL in each case. The first case observes the VNL
            attribution as a function of profits. We keep the Holding/Trading
            Ratios constant and inspect what happens to the attributed VNL. As
            we increase the sell price of the trade, while keeping the WAER
            constant, our profits increase. As profits increase 5-fold from 2
            ETH to 10 ETH or 10-fold from 2 ETH to 20 ETH, there is a linear
            relationship with the increase associated with the VNL reward.
          </Text>
          <Box
            css={{
              position: "relative",
              width: "100%",
              height: "400px",
              my: "$5",
            }}
          >
            <Image
              src="/images/faq/VNL_vs_profit.jpg"
              alt="VNL vs profit"
              layout="fill"
              objectFit="scale-down"
            />
          </Box>
          <Text css={{ mb: "$3" }}>
            The second case observes the VNL attribution when we keep profits
            constant, but vary the Holding/Trading Ratio (Squared). The ratio is
            determined by how early the trader is participating in the Vanilla
            system and how long they are keeping their positions before closing
            them. The following chart depicts a case in which we vary the sell
            block number and keep the weighted average block constant.
          </Text>
          <Box
            css={{
              position: "relative",
              width: "100%",
              height: "400px",
              my: "$5",
            }}
          >
            <Image
              src="/images/faq/VNL_vs_holding_ratio.jpg"
              alt="VNL vs holding ratio"
              layout="fill"
              objectFit="scale-down"
            />
          </Box>
          <Text>
            We can easily see that when the Holding/Trading Ratio (Squared)
            increases from 25 % to almost 100 % (factor of 4) also the VNL
            rewards increase accordingly. A trader can increase VNL rewards by:
            - Making higher percentage returns on his trades or trading larger
            ETH positions, i.e. making higher absolute ETH returns -{">"} Higher
            profit component <TeX math="P_i" />- Opening trades early as
            possible -{">"} Higher Holding/Trading Ratio (Squared){" "}
            <TeX math="H_i" />- Holding the trades longer -{">"} Higher
            Holding/Trading Ratio (Squared) <TeX math="H_i" />
          </Text>
        </Box>
      </Stack>
    </Container>
  );
};

export default Faq;