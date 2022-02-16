import { styled } from "../stitches.config";
import TeX from "@matejmazur/react-katex";
import { Link as LinkIconP, ArrowUpRight } from "phosphor-react";
import "katex/dist/katex.min.css";
import type * as Stitches from "@stitches/react";

import Box from "../components/Box";
import Text from "../components/Text";
import Paragraph from "../components/Paragraph";
import Link from "../components/Link";

import ThemeHeading from "../components/Heading";
import Container from "../components/Container";

import Stack from "../components/Stack";

const Heading = styled(ThemeHeading, {
  fontFamily: "$body",
  textTransform: "none",
  my: "$6",
  lineHeight: "$body",
  fontSize: "$2xl",
});

const LinkIcon = styled(LinkIconP, {
  color: "$text",
});

const ThemeLink = styled(Link, {
  color: "$link",
});

const TableWrapper = styled("div", {
  width: "100%",
  display: "block",
  overflowX: "auto",
  my: "$6",
});

const Table = styled("table", {
  borderCollapse: "collapse",
  width: "100%",
  fontSize: "$xs",
});

const Row = styled("tr", {
  minWidth: "0",
});

const SRow = styled("tr", {
  minWidth: "0",
  background: "$backgroundSecondary",
});

const Col = styled("td", {
  border: "1px solid $text",
  p: "$2",
  position: "relative",
});

const OrderedList = styled("ol", {
  my: "$8",
});

const ListItem = styled("li", {
  lineHeight: "1.42",
  my: "$5",
});

const ListItemFlex = styled("li", {
  lineHeight: "1.42",
  my: "$10",
});

const FlexWrap = styled("div", {
  display: "block",
  "@md": {
    display: "flex",
  },
});

const FormulaText = styled("div", {
  width: "100%",
  pr: "$4",
  "@md": {
    width: "30%",
  },
});

const Formula = styled("div", {
  width: "100%",
  my: "$6",
  "@md": {
    width: "70%",
    my: "0",
  },
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

const Litepaper = () => {
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
          Privacy Notice
        </ThemeHeading>
        <Text
          css={{
            fontSize: "$2xl",
            lineHeight: "1.2",
          }}
        >
          With this Privacy Notice, we provide you information about why and how
          we process your personal data in Vanilla Defi.
        </Text>
      </Box>
      <Stack
        css={{
          mb: "$5",
          display: "block",
          width: "100%",
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
          <Heading as="h2" id="1-what-terms">
            <ThemeLink href="#1-what-terms">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            1. WHAT TERMS ARE USED IN THIS PRIVACY NOTICE?
          </Heading>
          <Paragraph>
            Controller means the party responsible for processing the personal
            data of the data subject.{" "}
          </Paragraph>
          <Paragraph>
            Data subject is a term for a human being in accordance with data
            protection laws.{" "}
          </Paragraph>
          <Paragraph>
            GDPR means the EU&rsquo;s General Data Protection Regulation
            (679/2012).{" "}
          </Paragraph>
          <Paragraph>
            Legal basis for processing means the legal ground on which the
            controller processes the data subject's personal data. The
            lawfulness of processing is described in Article 6 of the GDPR.{" "}
          </Paragraph>
          <Paragraph>
            Personal data means any information concerning the data subject or
            information by which the data subject can be identified.{" "}
          </Paragraph>
          <Paragraph>
            Privacy notice means a document drawn up in accordance with Articles
            13 and 14 of the GDPR, through which the controller informs data
            subjects of the ways their personal data is processed.{" "}
          </Paragraph>
          <Paragraph>
            The purpose for processing means the reason why the controller
            processes the data subject's personal data.{" "}
          </Paragraph>
          <Paragraph>
            Service means our decentralized trading platform on the Ethereum
            blockchain.{" "}
          </Paragraph>
          <h2>2. OUR CONTACT DETAILS</h2>
          <Paragraph>Equilibrium Group Oy (business ID 2891403-1)</Paragraph>
          <Paragraph>Linnankatu 3 A 2, 20100 Turku, Finland</Paragraph>
          <Paragraph>
            If you have any questions regarding the privacy notice, please
            contact us at hello@vanilladefi.com.{" "}
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h3" id="2-contact-details">
            <ThemeLink href="#2-contact-details">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            2 OUR CONTACT DETAILS
          </Heading>
          <Paragraph>Equilibrium Group Oy (business ID 2891403-1)</Paragraph>
          <Paragraph>Linnankatu 3 A 2, 20100 Turku, Finland</Paragraph>
          <Paragraph>
            If you have any questions regarding the privacy notice, please
            contact us at hello@vanilladefi.com.{" "}
          </Paragraph>
        </Box>

        <Box>
          <Heading as="h2" id="3-your-personal-data">
            <ThemeLink href="#3-your-personal-data">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            3. WHY DO WE PROCESS YOUR PERSONAL DATA?
          </Heading>
          <Paragraph>
            We process personal data solely to provide our Service (purpose for
            processing). In the provision of our Service, we process our
            customers&rsquo; and their trading partners&rsquo; (categories of
            data subjects) data on the Ethereum network related to transactions
            carried out with our Service (categories of personal data). Our
            legal basis for processing personal data is the performance of our
            contractual obligation under the Terms of Service (legal basis for
            processing).{" "}
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h3" id="4-where-do-we-collect">
            <ThemeLink href="#4-where-do-we-collect">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            4. FROM WHERE DO WE COLLECT YOUR PERSONAL DATA?
          </Heading>
          <Paragraph>
            We collect your personal data only from yourself via a device you
            choose to use.{" "}
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h4" id="2-1-1-synthetic-long-short">
            <ThemeLink href="#2-1-1-synthetic-long-short">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            Juicers take synthetic long and short positions in JUICE
          </Heading>
          <Paragraph>
            Juicers take synthetic long and short positions on tokens with JUICE
            - similar to traders who buy and sell in the market. A position is
            opened by staking JUICE, and it is closed by unstaking. Like
            investing in real tokens, profit and loss - measured in USDC - are
            calculated continuously for all open positions based on the price
            movement of the underlying token. Upon withdrawal, JUICE is
            minted/burned according to profit/loss made.
          </Paragraph>
          <Paragraph>
            For a position on a token <TeX math="x" />
            opened at a time <TeX math="t_{open}" />, the return at a time{" "}
            <TeX math="t_{close}" />
            is calculated as:
          </Paragraph>
          <OrderedList>
            <ListItemFlex>
              <FlexWrap>
                <FormulaText>Value:</FormulaText>
                <Formula>
                  <TeX math="Value_{x,t} =  Oracle_{t}(x, USD) * Q_{t})" />{" "}
                  <br />
                  <br />
                  where <TeX math="Q_{t}" /> is the size of the position
                </Formula>
              </FlexWrap>
            </ListItemFlex>
            <ListItemFlex>
              <FlexWrap>
                <FormulaText>Return:</FormulaText>

                <Formula>
                  <TeX math="Return_{x,t_{open},t_{close}} = Value_{x,t_{close}}-Value_{x, t_{open}}" />{" "}
                  <br />
                  <br />
                  if the position is long, or
                  <br />
                  <br />
                  <TeX math="Return_{x,t_{open},t_{close}} = max((Value_{x,t_{open}}-Value_{x, t_{close}}),-Value_{x,t_{open}})" />
                  <br />
                  <br />
                  if short
                </Formula>
              </FlexWrap>
            </ListItemFlex>
          </OrderedList>
          <Paragraph>
            For example, a juicer might stake LONG UNI with 100 JUICE. When the
            price of UNI subsequently increases 50%, the user’s stake is now
            worth 150 JUICE.
          </Paragraph>
          <Paragraph>
            For short positions, return is calculated as an inverse: Let’s
            assume the juicer has staked SHORT UNI with 100 JUICE. If the price
            of UNI increases 50%, the juicer’s stake is worth 50 JUICE. If the
            price increases 100%, the juicer has lost the entire stake. In
            traditional markets, short positions can theoretically have an
            unlimited downside if the trader keeps adding collateral. In
            Juicenet, juicers cannot add collateral, and thus the maximum that a
            short position can lose is 100% of the initial JUICE stake.
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h2" id="2-1-2-token-weighted-portfolio">
            <ThemeLink href="#2-1-2-token-weighted-portfolio">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            2.1.2. Juicers’ aggregate positions form a token-weighted portfolio
          </Heading>
          <Paragraph>
            The purpose of Juicenet is to generate target portfolio weights for
            the Vanilla Investment Pool. The weights are generated by
            aggregating the individual token-weighted positions in the following
            way:
          </Paragraph>
          <Paragraph>
            Juicenet has <TeX math="n" /> juicers and <TeX math="m" /> tokens.
            For a token <TeX math="x" />, summing across all juicers, we define:
          </Paragraph>

          <OrderedList start={3}>
            <ListItemFlex>
              <FlexWrap>
                <FormulaText>Long positions:</FormulaText>
                <Formula>
                  <TeX>{String.raw` L_{x } =  \sum_{j  = 1}^{n}L_{x, j}\ `}</TeX>
                  , where <TeX math="j" /> refers to the <TeX math="j-th" />{" "}
                  juicer
                </Formula>
              </FlexWrap>
            </ListItemFlex>
            <ListItemFlex>
              <FlexWrap>
                <FormulaText>Short positions:</FormulaText>

                <Formula>
                  <TeX>{String.raw` S_{x } =  \sum_{j  = 1}^{n}S_{x, j}\ `}</TeX>
                </Formula>
              </FlexWrap>
            </ListItemFlex>
            <ListItemFlex>
              <FlexWrap>
                <FormulaText>Volume staked:</FormulaText>{" "}
                <Formula>
                  <TeX>{String.raw` V_{x} = L_{x}+S_{x}\ `}</TeX>
                </Formula>
              </FlexWrap>
            </ListItemFlex>
            <ListItemFlex>
              <FlexWrap>
                <FormulaText>Net sentiment</FormulaText>{" "}
                <Formula>
                  <TeX>{String.raw` N_{x} = L_{x}-S_{x}\ `}</TeX>
                </Formula>
              </FlexWrap>
            </ListItemFlex>
          </OrderedList>

          <Paragraph>
            Therefore, when summing across all tokens in Juicenet, we get:
          </Paragraph>

          <OrderedList start={7}>
            <ListItemFlex>
              <FlexWrap>
                <FormulaText>Total volume staked:</FormulaText>
                <Formula>
                  <TeX>{String.raw` V =  \sum_{k  = 1}^{m}V_{k}\ `}</TeX>
                </Formula>
              </FlexWrap>
            </ListItemFlex>
            <ListItemFlex>
              <FlexWrap>
                <FormulaText>Total net sentiment:</FormulaText>
                <Formula>
                  <TeX>{String.raw` N =  \sum_{k  = 1}^{m}N_{k}\ `}</TeX>
                </Formula>
              </FlexWrap>
            </ListItemFlex>
          </OrderedList>

          <Paragraph>
            As short positions are not yet available for most assets, the
            Vanilla Investment Pool cannot replicate the Juicenet portfolio 1:1.
            Thus we need to convert the Juicenet portfolio into the Pool’s
            portfolio in a way that makes tradeoffs between how accurately the
            Pool’s portfolio reflects token-specific net sentiments (= how
            bullish or bearish Juicers are towards a token on average) versus
            the total net sentiment (= how bullish or bearish they are towards
            the market). In this conversion, the loss of some information
            (alpha) is unavoidable.
          </Paragraph>
          <Paragraph>
            Since crypto-markets are very volatile, the initial configuration of
            the Vanilla Investment Pool will track the market first and
            individual tokens second. This will be accomplished by the following
            three rules:
          </Paragraph>
          <Paragraph>
            <em>Rule 1:</em> The total % invested in longs equals the market
            exposure of the Juicenet portfolio if the exposure is positive. If
            the market exposure is negative or zero, the weight for longs is
            zero.
          </Paragraph>

          <OrderedList start={9}>
            <ListItemFlex>
              <FlexWrap>
                <FormulaText>Weight for longs (%):</FormulaText>
                <Formula>
                  <TeX>{String.raw` W_{LONGS} = max(\frac{N}{V}, 0) `}</TeX>
                </Formula>
              </FlexWrap>
            </ListItemFlex>
          </OrderedList>

          <Paragraph>
            Here, market exposure refers to the percentage of the portfolio that
            is exposed to market volatility. For example, assuming that
            portfolio of assets move hand in hand with the market (equal betas),
            if 75% of Juicenet stakes are in longs, and 25% are in shorts, the
            market exposure is 50% (=75%-25%), and thus e.g. a 20% drop in the
            market, will decrease the portfolio value by only 10% (=50%*20%).
            Similarly, if 25% of stakes are in longs, and 75% are in shorts, the
            market exposure is -50%, and thus e.g. a 20% drop in the market,
            will increase the portfolio value by 10%.
          </Paragraph>

          <Paragraph>
            <em>Rule 2:</em> The total % invested in stablecoins (USDC) equals
            what’s left after allocating to longs.
          </Paragraph>

          <OrderedList start={10}>
            <ListItemFlex>
              <FlexWrap>
                <FormulaText>Weight for stablecoins:</FormulaText>
                <Formula>
                  <TeX>{String.raw` W_{STABLES} = 1-W_{LONGS} `}</TeX>
                </Formula>
              </FlexWrap>
            </ListItemFlex>
          </OrderedList>

          <Paragraph>
            <em>Rule 3:</em> Allocation to longs is distributed between net long
            tokens according to their volume-weighted net sentiment. Here,
            volume weights are used to measure confidence: we have more
            confidence in the net sentiment of a larger volume token (e.g.{" "}
            <TeX math="L_{x} =  950, S_{x} = 900 , N_{x } =  50" />) than in
            that of a smaller volume token (e.g.{" "}
            <TeX math="L_{x} =  50, S_{x} =  0, N_{x } = 50" />)
          </Paragraph>

          <OrderedList start={11}>
            <ListItemFlex>
              <FlexWrap>
                <FormulaText>Net sentiment, weighted: </FormulaText>
                <Formula>
                  <TeX>{String.raw` N_{x, weighted} = N_{x} * \frac{V_{x}}{V} `}</TeX>
                </Formula>
              </FlexWrap>
            </ListItemFlex>
          </OrderedList>

          <Paragraph>Therefore, we get:</Paragraph>

          <OrderedList start={12}>
            <ListItemFlex>
              <FlexWrap>
                <FormulaText>Net sentiment, weighted:</FormulaText>
                <Formula>
                  <TeX>{String.raw` W_{x} = \frac{max(N_{x, weighted} , 0)}{\sum_{k = 1}^{m}max(N_{k, weighted}, 0)} * W_{longs},`}</TeX>
                  <br />
                  <br />
                  when <TeX math="W_{longs} > 0" />
                </Formula>
              </FlexWrap>
            </ListItemFlex>
          </OrderedList>

          <Paragraph>
            These aggregate weights are then passed on to the Vanilla Investment
            Pool as target weights of the portfolio.
          </Paragraph>
          <Paragraph>
            <em>
              Table 1: Illustrative portfolio weights at time t created by the
              Juicenet for the Vanilla Investment Pool
            </em>
          </Paragraph>
          <TableWrapper>
            <Table>
              <thead>
                <Row>
                  <Col colSpan={3}>Input from Juicenet</Col>
                  <Col colSpan={5}></Col>
                  <Col colSpan={2}>Output to Vanilla Pool</Col>
                </Row>
                <Row css={{ position: "relative" }}>
                  <Col>Token</Col>
                  <Col>
                    Total <br />
                    longs <br />(<TeX math="L_{x}" />)
                  </Col>
                  <Col>
                    Total <br />
                    shorts <br />(<TeX math="S_{x}" />)
                  </Col>
                  <Col>
                    Total <br />
                    volume <br />(<TeX math="V_{x}" />)
                  </Col>
                  <Col>
                    Volume-weight <br />
                    (%)
                  </Col>
                  <Col>
                    Net <br />
                    sentiment <br />(<TeX math="N_{x}" />)
                  </Col>
                  <Col colSpan={2}>
                    Net sentiment <br />
                    (if&gt;0), weighted <br />(
                    <TeX math="L_{x, weighted}" />)
                  </Col>
                  <Col>
                    Portfolio <br />
                    weights <br />(<TeX math="W_{x}" />)
                  </Col>
                  <Col>Token</Col>
                </Row>
              </thead>
              <tbody>
                <SRow>
                  <Col>UNI</Col>
                  <Col>100</Col>
                  <Col>50</Col>
                  <Col>150</Col>
                  <Col>67%</Col>
                  <Col>50</Col>
                  <Col>33.3</Col>
                  <Col>75%</Col>
                  <Col>25%</Col>
                  <Col>UNI</Col>
                </SRow>
                <SRow>
                  <Col>SUSHI</Col>
                  <Col>50</Col>
                  <Col>0</Col>
                  <Col>50</Col>
                  <Col>22%</Col>
                  <Col>50</Col>
                  <Col>11.1</Col>
                  <Col>25%</Col>
                  <Col>8.3%</Col>
                  <Col>SUSHI</Col>
                </SRow>
                <SRow>
                  <Col>ETH</Col>
                  <Col>0</Col>
                  <Col>25</Col>
                  <Col>25</Col>
                  <Col>11%</Col>
                  <Col>-25</Col>
                  <Col>-</Col>
                  <Col></Col>
                  <Col>0.0%</Col>
                  <Col>ETH</Col>
                </SRow>
                <SRow>
                  <Col>TOTAL</Col>
                  <Col>150</Col>
                  <Col>75</Col>
                  <Col>225*</Col>
                  <Col>100%</Col>
                  <Col>75*</Col>
                  <Col>44.4</Col>
                  <Col>100%</Col>
                  <Col>33.3%</Col>
                  <Col>LONGS</Col>
                </SRow>
                <Row>
                  <Col colSpan={8}>
                    *Market exposure: N/V = 75/225 = 33.3%. Thus, 33.3% to
                    longs, the rest to stables:
                  </Col>
                  <Col>+66.7%</Col>
                  <Col>STABLES</Col>
                </Row>
              </tbody>
            </Table>
          </TableWrapper>
        </Box>
        <Box>
          <Heading as="h2" id="2-2-vanilla-investment-pool">
            <ThemeLink href="#2-2-vanilla-investment-pool">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            2.2 Vanilla Investment Pool
          </Heading>
          <Paragraph>
            The Vanilla Investment Pool is a Balancer Managed Pool controlled by
            Juicenet. Anyone can contribute their capital to the pool to be
            managed by the Vanilla system. In exchange, they get LP tokens of
            the pool, which they can trade freely on DEXs and other venues.
          </Paragraph>
          <Paragraph>
            Balancer Pools work with internal portfolio weight targets. When the
            target weight of an asset increases, the pool offers a higher price
            to buy that asset. If the target weight of an asset goes down, it
            offers to sell the asset at a lower price. By doing this, the pool
            creates an incentive for arbitrageurs to balance the portfolio.
            Balancer also allows pools to specify a time period over which the
            pool slowly raises or lowers prices to achieve the desired weights.
          </Paragraph>
          <Paragraph>
            The Vanilla Investment Pool continuously updates its target weights
            according to the aggregate weights in Juicenet and specifies a
            gradual rebalancing period (e.g. two weeks) for achieving the
            weights. This rebalancing period resets every time new target
            weights are submitted, leading to a dynamic where the Vanilla
            Investment Pool is continuously “catching up” to Juicenet. By
            specifying a rebalancing period to achieve the target weights, the
            Vanilla Investment Pool avoids making dramatic short-term moves
            while still reacting to changes in Juicenet’s aggregate weights
            promptly. This mechanism also makes the system considerably harder
            to manipulate or front-run as any aspiring front-runner is subject
            to the whims of the market while simultaneously competing with other
            arbitrageurs to try to extract value from the system.
          </Paragraph>
          <Paragraph>
            In the initial configuration, the Pool will hold a maximum of 50
            tokens in its portfolio, comprised of tokens with the largest volume
            (<TeX math="V_{x}" />) in Juicenet.
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h3" id="2-3-vanilladao">
            <ThemeLink href="#2-3-vanilladao">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            2.3. VanillaDAO
          </Heading>
          <Paragraph>
            The VanillaDAO is the governing entity of the Vanilla system. It is
            controlled by VNL holders and has the following functions:
          </Paragraph>
          <OrderedList>
            <ListItem>
              Financing and coordinating the ongoing development of the Vanilla
              protocol.
            </ListItem>
            <ListItem>
              Managing the treasury, which receives fees from the Vanilla
              Investment Pool and deploys capital to incentivize Juicers and
              other ecosystem participants.
            </ListItem>
            <ListItem>
              Provides fail-safes for the Vanilla system, such as stopping the
              Vanilla Investment Pool from updating target weights in an
              emergency.
            </ListItem>
          </OrderedList>
        </Box>
        <Box>
          <Heading as="h2" id="3-tokenomics">
            3. Tokenomics
          </Heading>
          <Heading as="h3" id="3-1-tokenomics-of-vnl">
            <ThemeLink href="#3-1-tokenomics-of-vnl">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            3.1. Tokenomics of VNL
          </Heading>
          <Paragraph>
            Vanilla’s VNL token is the governance token of the Vanilla system.
            The value of VNL is a function of three features: the value of
            VanillaDAO governance, its assets under management, and its future
            fee streams from the Vanilla Investment Pool. The current supply of
            VNL is ~
            <ExtLink href="https://etherscan.io/token/0xbf900809f4c73e5a3476eb183d8b06a27e61f8e5#tokenAnalytics">
              13 million
            </ExtLink>{" "}
            tokens. It is distributed between different stakeholders in the
            following way:
          </Paragraph>
          <ul>
            <ListItem>
              11 410 594 (87.8 %) - Community via profit-mining
            </ListItem>
            <ListItem>
              <ExtLink href="https://etherscan.io/address/0xa135f339B5acd1f4eCB1C6eEd69a31482f878545">
                1 585 859
              </ExtLink>{" "}
              (12.2 %) - VanillaDAO treasury via community minting
            </ListItem>
          </ul>

          <Box
            css={{ border: "1px solid $text", pb: "$2", px: "$6", mt: "$8" }}
          >
            <Paragraph>
              VNL has had no pre-mine. All VNL in circulation has been created
              via profit-mining except for those minted for the DAO by the
              community.
            </Paragraph>
            <Paragraph>
              Profit mining is the mechanism used in Vanilla v1, by which the
              VNL governance token is created and distributed to miners
              according to their investment performance. Users trade tokens via
              the Vanilla interface and mint VNL when their trades make a
              profit.
            </Paragraph>
            <Paragraph>
              Profit mining will continue until the community decides to phase
              it out, and thus the supply is likely to continue growing.
              However, as with most mining mechanisms, profit mining becomes
              more challenging over time, and thus the increase in the supply
              will be less and less significant.
            </Paragraph>
          </Box>
        </Box>
        <Box>
          <Heading as="h3" id="is-vanilla-decentralized">
            <ThemeLink href="#3-2-tokenomics-of-juice">
              <LinkIcon size="20px" />
            </ThemeLink>
            3.2 Tokenomics of JUICE
          </Heading>
          <Paragraph>
            Vanilla’s JUICE token is used to take synthetic long and short
            positions in Juicenet and, by doing so, generate the aggregate
            weights used by the Vanilla Investment Pool.{" "}
          </Paragraph>{" "}
          <Paragraph>
            JUICE gets minted or burned based on the profitability of Juicenet
            users: if juicers in aggregate make X% of profit, the supply
            increases by the same X%. Similarly, if juicers in aggregate have a
            negative return of Y%, the supply decreases by that same Y%. Due to
            this dynamic, the supply of JUICE is expected to be highly volatile.
            For example, when many people profit against the USD during bull
            markets, the JUICE supply can increase rapidly. On the other hand,
            during periods of low profitability, the JUICE supply could shrink.{" "}
          </Paragraph>
          <Paragraph>
            Given that the greatest JUICE rewards are earned by users who
            consistently make the most profit, we expect the supply to inflate
            on average over time. Due to the expected inflationary nature of the
            JUICE token, holding JUICE without participating in Juicenet is
            likely a poor strategy. The VanillaDAO will periodically purchase
            JUICE from the market and use the purchased tokens to provide
            liquidity to incentivize users to participate in Juicenet. Since the
            VanillaDAO will not sell JUICE, this action will increase the value
            of JUICE and thus create an incentive to participate in Juicenet
            while simultaneously increasing the token’s liquidity.
          </Paragraph>
          <Paragraph>
            The community plans to airdrop JUICE to VNL holders 1:1 alongside
            the launch of Vanilla v2. The VanillaDAO will not receive JUICE in
            the airdrop.
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h2" id="4-risks-mitigation">
            <ThemeLink href="#4-risks-mitigation">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            4. Risks & Mitigation
          </Heading>
          <Paragraph>
            The initial configuration of the Vanilla system will be entirely
            on-chain, and the actions taken by participants are public.
          </Paragraph>
          <Paragraph>
            This section breaks down foreseeable unhealthy situations that
            result from the system’s public nature and presents strategies for
            resolving them.
          </Paragraph>
          <Paragraph>
            It’s worth noting that these situations may never occur, and the
            mere existence of a viable and publicly known antidote may prevent
            them from occurring.
          </Paragraph>
          <Paragraph>
            <em>
              Table 2: Summary of attacks and their impact on Vanilla
              stakeholders
            </em>
          </Paragraph>
          <TableWrapper>
            <Table>
              <thead>
                <Row>
                  <Col>
                    <strong>Attack</strong>
                  </Col>
                  <Col>
                    <strong>Juicers</strong>
                  </Col>
                  <Col>
                    <strong>VIP LPs</strong>
                  </Col>
                  <Col>
                    <strong>VanillaDAO</strong>
                  </Col>
                </Row>
              </thead>
              <tbody>
                <Row>
                  <Col>
                    <strong>Front-running Juicenet</strong>
                  </Col>
                  <Col>No impact</Col>
                  <Col>Low impact</Col>
                  <Col>No impact</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Oracle Delay Abuse</strong>
                  </Col>
                  <Col>Unfair JUICE minting</Col>
                  <Col>No impact</Col>
                  <Col>No impact</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Price Manipulation</strong>
                  </Col>
                  <Col>No impact</Col>
                  <Col>Low impact</Col>
                  <Col>Low impact</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Leeching</strong>
                  </Col>
                  <Col>Low impact</Col>
                  <Col>No impact</Col>
                  <Col>Less fees</Col>
                </Row>
              </tbody>
            </Table>
          </TableWrapper>
        </Box>
        <Box>
          <Heading as="h3" id="4-1-front-running-juicenet-txs">
            <ThemeLink href="#4-1-front-running-juicenet-txs">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            4.1 Front-running Juicenet transactions
          </Heading>

          <Paragraph>
            Front-running is a term generally used for a circumstance where some
            entity acquires prior knowledge of a trade happening and can execute
            the same trade faster than the original trader. This entity then
            hopes to sell the asset they’ve purchased directly or indirectly to
            the original trader at a profit.
          </Paragraph>

          <Paragraph>
            Front-running an on-chain trade is relatively trivial in principle.
            Every trade executed on a decentralized exchange like Uniswap
            involves submitting an Ethereum transaction, which first appears in
            the mempool before being confirmed. Anyone can watch the mempool and
            thus gain prior knowledge of trades, which they can then front-run
            by submitting the same trade but applying a higher gas fee to the
            transaction, hoping that their transaction will be processed by
            miners faster than the first one. Once the original trader’s
            transaction has been confirmed, the front-runner immediately sells
            the asset back to Uniswap at a profit. This is known as a sandwich
            trade.
          </Paragraph>
          <Paragraph>
            In Vanilla, a similar kind of front-running is also possible, albeit
            not very effective. A front-runner could watch the mempool for
            Juicenet transactions, which update the target weights of the
            Vanilla Investment Pool, and quickly purchase those assets. However,
            the Vanilla Investment Pool doesn’t immediately buy an asset from
            the market, which would raise the price, but rather slowly begins to
            increase the price at which it is willing to buy the asset over the
            rebalancing period (e.g. two weeks) until it achieves its target
            weight or the target weight is updated again. The front-runner,
            then, cannot immediately sell the assets it has purchased for a
            profit but needs to wait for the price to increase, during which
            market volatility may render the trade worthless. Furthermore, the
            target weights might update again at any moment in the opposite
            direction, causing the same outcome for the front-runner. In fact, a
            sufficiently large front-runner could even be the cause of a target
            weight adjustment: the price increase might lead Juicers to close
            positions in an asset before the Vanilla Investment Pool has
            adjusted the price by any meaningful margin.
          </Paragraph>

          <Paragraph>
            Finally, if a Juicenet transaction in the mempool would cause the
            market to move, it would create an incentive for Juicers to begin
            “front-running” their own Juicenet transactions. In essence, Juicers
            would purchase an asset before submitting a Juicenet transaction,
            knowing that prospective front-runners will push the price
            immediately when the transaction is visible in the mempool. Once the
            price was pushed up, the Juicer would sell the assets they’d
            purchased at a profit. Given the slow reaction to target weight
            changes, this situation would have a relatively negative impact on
            the Vanilla Investment Pool. Yet, it would negatively impact the
            prospective front-runner, who would consistently pay a premium for
            assets only to see his assets drop in value moments after.
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h3" id="4-2-frontrunning-juicenet-via-oracle">
            <ThemeLink href="#4-2-frontrunning-juicenet-via-oracle">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            4.2 Front-running Juicenet via Oracle Delay Abuse
          </Heading>
          <Paragraph>
            Oracle delay abuse refers to front-running the Chainlink oracles
            Juicenet uses to calculate net profit. On-chain oracles update their
            price with a slight delay relative to the off-chain market, creating
            a window of opportunity for the prospective oracle front-runner. To
            execute this, a Juicer would watch for a significant discrepancy
            between the off-chain market price and the on-chain oracle price and
            attempt to get a Juicenet position submitted before the oracle
            updates, knowing the updated price will be higher, guaranteeing a
            profit measured in JUICE terms.
          </Paragraph>
          <Paragraph>
            Abusing the oracle in this way has no direct impact on the Vanilla
            Investment Pool since the entire event happens in a very short
            window of time. However, if left unchecked, it provides an avenue
            for generating risk-free JUICE, which is unhealthy for the system.
            The Vanilla system prevents this behavior with a simple mechanism:
            fixed minimum profitability must be achieved before any JUICE is
            minted. This means that a prospective abuser must find a dramatic
            discrepancy between the on-chain price and the market price. This
            situation could occur but is quite unlikely given the speed and
            frequency of oracle price updates happening on Polygon.
          </Paragraph>
          <Paragraph>
            We don’t anticipate oracle delay abuse to be a meaningful issue, but
            if it were to become one, we could mandate a minimum holding time
            for positions in Juicenet. This mechanism wouldn’t prevent oracle
            abuse, but it would prevent the abuser from easily profiting from
            it, given they would be at the mercy of the market for the duration
            of minimum holding time.
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h3" id="4-3-price-manipulation">
            <ThemeLink href="#4-3-price-manipulation">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            4.3 Price Manipulation
          </Heading>
          <Paragraph>
            In Vanilla, price manipulation refers to a situation where a Juicer
            alters the target weight of a token to either purchase that token at
            a discount or sell that token for a premium to the Vanilla
            Investment Pool. Essentially the Juicer is attempting to manufacture
            an artificial arbitrage opportunity, which it plans to exploit.
          </Paragraph>
          <Paragraph>
            While price manipulation is possible, it is challenging to execute
            successfully in practice. As with front-running, the difficulty
            arises from the fact that the Vanilla Investment Pool doesn’t
            immediately purchase or sell the assets into the market, but rather
            slowly adjusts the spot price over the gradual rebalancing period
            (e.g. two weeks) to eventually achieve the desired portfolio
            weights.
          </Paragraph>
          <Paragraph>
            For the Juicer to succeed in exploiting the arbitrage opportunity,
            they must first wait for the price to adjust while competing with
            all other arbitrageurs to capture the value of the arbitrage. During
            this period, the Juicer is at the mercy of market volatility and
            thus has no guarantee that the arbitrage will succeed.
          </Paragraph>
          <Paragraph>
            In theory, the AUM of the Vanilla Investment Pool could become so
            large that any trade initiated could move the market so dramatically
            that all the volatility is in effect “swallowed up” during the
            rebalancing period, ensuring a near-guaranteed profit for the
            Juicer. However, given that the tokens available in Juicenet are
            among the most liquid assets available and arbitrage opportunities
            can be executed using any available liquidity pools, whether
            centralized or decentralized, this scenario corresponds to a truly
            staggering scale. If this scale was indeed achieved, some minor
            adjustments would need to be made to ensure Juicenet positions don’t
            become self-fulfilling prophecies. Either the minimum holding period
            of Juicenet positions would need to be extended, or the minimum
            profit at which JUICE is minted would need to be increased to
            correspond to the immediate impact the Juicenet position has on the
            market or both. Furthermore, Juicenet has an existing mechanism that
            provides some defense against this sort of behavior: shorting. By
            taking short positions on a token, Juicers can effectively nullify
            the influence of a long position on any given token.
          </Paragraph>
          <Paragraph>
            Even with these adjustments, it’s likely that this ability to move
            markets would cause a bidding war for JUICE, but this would have
            little to no impact on the Vanilla Investment Pool, given the
            Juicenet system always rewards influence to better investors over
            time. Let’s say a large treasury was buying JUICE to stake on their
            own token. They could do this and cause the Vanilla Investment Pool
            to purchase this token, but if the position were ultimately
            unprofitable, they would lose the influence that allowed them to
            take the position in the first place. Of course, they could combine
            this with front-running their own Juice position and thus benefit
            from the increase in market price, external to Juicenet. Still,
            assuming a long enough minimum holding period in Juicenet, this
            would quickly become prohibitively expensive unless the positions
            they were taking in Juicenet ended up being profitable.
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h3" id="4-4-leeching">
            <ThemeLink href="#4-4-leeching">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            4.4 Leeching
          </Heading>
          <Paragraph>
            Leeching refers to the act of extracting value from the Vanilla
            system while providing nothing in return. In practice, this means
            replicating the Vanilla Investment Pool portfolio outside of the
            Vanilla system and thus avoiding paying fees to the VanillaDAO. This
            setting is similar to front-running Juicenet as described in section
            4.1, as in both cases, information about Juicenet trades is being
            used outside of the Vanilla system.
          </Paragraph>

          <Paragraph>
            However, leeching is not equivalent to front-running. A small-scale
            leecher with a long-term investment horizon could benefit from
            replicating the portfolio weights without resorting to any
            short-term manipulation. For example, a leecher could simply
            maintain a relatively equivalent portfolio of assets as the Vanilla
            Investment Pool without interfering with the operations of the
            Vanilla system. Nevertheless, it allows the leecher to benefit from
            the market insight generated in Juicenet while avoiding paying fees
            to the VanillaDAO.
          </Paragraph>

          <Paragraph>
            A larger-scale leecher could set up a competing Balancer Managed
            Pool and a keeper system, which watches for Juicenet events and then
            submits equivalent target weight changes to this side pool. The
            transaction costs, which in the Vanilla system are paid by the
            Juicers, would need to be paid by the leacher in addition to the
            costs of building out the keeper infrastructure. Thus it’s likely
            that the pool would need to charge higher fees than the Vanilla
            Investment Pool. Therefore, it seems unlikely that a competing
            Balancer Pool would enjoy widespread popularity unless Vanilla
            Investment Pool fees were too high, in which case the simple
            solution would be to lower them to a sustainable level.
          </Paragraph>

          <Paragraph>
            Furthermore, even if such a competing pool achieved a degree of
            popularity, the existence of such a pool would effectively increase
            the total amount of capital that Juicenet is managing. If the amount
            of capital leeching were relatively modest, it would likely have
            almost no effect on market pricing and thus also on the Vanilla
            Investment Pool. It would, however, mean lower fees for the capital
            managed by Vanilla.
          </Paragraph>
          <Paragraph>
            Given that the amount of capital leeching in this scenario is
            modest, the fees lost would not be significant. If the capital were
            substantial, we would arrive at the same outcome as described in
            section 4.1, where Juicers begin to front-run their own trades,
            knowing that the simple act of submitting a transaction to Juicenet
            positively impacts the price.
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h3" id="4-5-ultimatum-measures">
            <ThemeLink href="#4-5-ultimatum-measures">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            4.5 Ultimatum Measures
          </Heading>
          <Paragraph>
            Suppose all the measures described above to mitigate manipulation,
            abuse, and leeching in the system were to fail. In that case, the
            Vanilla system has a fallback plan: hide the portfolio weights
            generated by Juicenet and auction them to a small group of users,
            who can then utilize them in whatever way they wish. In essence,
            this means the portfolio weights would be used mainly off-chain,
            likely in centralized exchanges.{" "}
          </Paragraph>

          <Box
            css={{ border: "1px solid $text", pb: "$2", px: "$6", mt: "$8" }}
          >
            <Paragraph>
              Here we describe a simple example scheme for hiding portfolio
              weights and auctioning them to a limited set of users
              (subscribers). The method combines public-key cryptography with a
              commit-reveal scheme to conceal the portfolio weights from the
              public and share the weights with the subscribers. To achieve
              this, Juicers publish encrypted weights on-chain, accompanied by a
              JUICE stake, to create a verifiable track record of weight
              changes. Once the Juicer wishes to withdraw their JUICE, they
              reveal their private key, thus revealing their weight change
              history. This allows the Vanilla system to compute the rewards or
              penalties and settle the JUICE stake.
            </Paragraph>
            <Paragraph>
              Each slot for receiving the portfolio weights in real-time is
              auctioned periodically. Each user participating in the auction
              submits the proposed payment for the period and shares their
              public key. Once the subscribers have been identified, each Juicer
              publishes their weight changes on-chain, encrypted with each of
              the subscribers’ public keys.
            </Paragraph>
            <Paragraph>
              This mechanism allows the effective hiding of the portfolio
              weights from the public while allowing subscribers to receive
              weights in real-time, which they can then use to manage a
              portfolio.
            </Paragraph>
          </Box>

          <Paragraph>
            Hiding and auctioning the weights would be an unfortunate outcome as
            it would outprice smaller investors from benefiting from the market
            insight generated by Juicenet. Smaller inventors could still pool
            their money and collectively purchase the Juicenet portfolio
            weights. Still, it would be considerably more complicated than
            simply contributing capital to the Vanilla Investment Pool.
          </Paragraph>

          <Paragraph>
            We expect that the existence of a viable plan to hide the weights,
            combined with the various unfavorable outcomes for bad behavior
            described in the previous sections, will be enough to prevent such
            behavior from happening altogether.
          </Paragraph>

          <Paragraph>
            Furthermore, the emergence of private computing environments will
            eventually allow us to implement a system that hides the portfolio
            weights while allowing anyone to participate.
          </Paragraph>
        </Box>
      </Stack>
    </Container>
  );
};

export default Litepaper;
