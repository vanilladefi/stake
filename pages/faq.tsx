import {
  BaseStyles,
  Button,
  Box,
  Container,
  Heading as ThemeHeading,
  Text,
  Link as ThemeLink,
} from "theme-ui";
import Link from "next/link";
import Image from "next/image";
import TeX from "@matejmazur/react-katex";
import { Link as LinkIcon } from "phosphor-react";
import "katex/dist/katex.min.css";

import Stack from "../components/Stack";

const Heading = (props: any) => (
  <ThemeHeading
    as="h2"
    sx={{
      fontFamily: "body",
      textTransform: "none",
      my: 4,
      lineHeight: 1.2,
    }}
    {...props}
  />
);

const Faq = () => {
  return (
    <Container sx={{ maxWidth: ["copy", "copyPlus"] }}>
      <ThemeHeading
        as="h1"
        sx={{
          fontSize: [6, 7, 8, 8],
          py: 4,
          borderBottom: "1px solid",
          borderColor: "muted",
        }}
      >
        Frequently asked questions
      </ThemeHeading>
      <Stack direction="column" mb={5}>
        <Box>
          <Heading as="h2" id="how-do-i-migrate-my-VNL-from-v1.0-to-v1.1">
            <ThemeLink
              color="text"
              href="#how-do-i-migrate-my-VNL-from-v1.0-to-v1.1"
            >
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            How do I migrate my VNL from v1.0 to v1.1?
          </Heading>
          Go to the Trade page and connect your wallet. If you have VNL v1.0
          tokens you should see a banner at the top of the page. Click on
          &quot;Convert Now&quot; to start the migration process. More detailed
          instructions can be found{" "}
          <Link
            href="https://medium.com/vanilladefi/vanilla-v1-1-announcement-migration-instructions-d92239db5b?sd"
            passHref
          >
            <ThemeLink as="a">here</ThemeLink>
          </Link>
        </Box>
        <Box>
          <Heading as="h2" id="What is Vanilla?">
            <ThemeLink color="text" href="#What is Vanilla?">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            What is Vanilla?
          </Heading>
          <Text>
            Vanilla is a meritocracy of the best investors. Investors who make
            profitable trades through Vanilla Trade receive VNL governance
            tokens and thus increase their influence over the network. We
            hypothesize that a dynamic meritocracy will consistently outperform
            any other governance system.
          </Text>
          <Box mt={3}>
            <Link href="/trade" passHref>
              <Button as="a" variant="primary">
                Start #ProfitMining
              </Button>
            </Link>
          </Box>
        </Box>
        <Box>
          <Heading as="h2" id="what-is-profitmining">
            <ThemeLink color="text" href="what-is-profitmining">
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
            <ThemeLink color="text" href="#how-do-i-trade-tokens-using-vanilla">
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
            <ThemeLink
              color="text"
              href="#can-i-move-tokens-ive-purchased-through-vanilla?"
            >
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
            <ThemeLink color="text" href="#does-vanilla-include-a-native-token">
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
            <ThemeLink color="text" href="#was-there-an-ico-or-premine">
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
            <ThemeLink color="text" href="#who-created-vanilla">
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
            <ThemeLink color="text" href="#is-vanilla-secure">
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
            <ThemeLink color="text" href="#is-vanilla-decentralized">
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
            <ThemeLink color="text" href="#what-is-the-vanilladao">
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
            <ThemeLink color="text" href="#can-i-profit-mine-with-any-erc-20">
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
            <ThemeLink
              color="text"
              href="#how-are-profit-mining-rewards-calculated-for-trading"
            >
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
            <ThemeLink color="text" href="#how-is-rewardable-profit-calculated">
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
            <ThemeLink color="text" href="#            {">
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
            <ThemeLink
              color="text"
              href="#what-is-the-holding-trading-ratio-squared-and-why-does-vanilla-use-it"
            >
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
            <ThemeLink
              color="text"
              href="#simple-heuristics-to-illustrate-the-core-mechanisms"
            >
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            Simple heuristics to illustrate the core mechanisms
          </Heading>
          <Text mb={3}>
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
            sx={{ position: "relative", width: "100%", height: "400px", my: 3 }}
          >
            <Image
              src="/images/faq/VNL_vs_profit.jpg"
              alt="VNL vs profit"
              layout="fill"
              objectFit="scale-down"
            />
          </Box>
          <Text mb={3}>
            The second case observes the VNL attribution when we keep profits
            constant, but vary the Holding/Trading Ratio (Squared). The ratio is
            determined by how early the trader is participating in the Vanilla
            system and how long they are keeping their positions before closing
            them. The following chart depicts a case in which we vary the sell
            block number and keep the weighted average block constant.
          </Text>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "400px",
              my: 3,
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
