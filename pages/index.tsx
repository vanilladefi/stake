import type { NextPage } from "next"
import Container from "../components/Container"
import Heading from "../components/Heading"
import Flex from "../components/Flex"
import Box from "../components/Box"
import Link from "../components/Link"
import Text from "../components/Text"
import { styled } from "../stitches.config"
import { ArrowRight, CommunityIcon, Diamond, JuiceSignalIcon, JuicingIcon } from "../assets"

const StyledDiamond = styled(Diamond, {
  position: "absolute",
  overflow: "visible",
  left: "50%",
  top: "50%",
  transform: "translateY(-50%) translateX(-50%)",
  width: "200px",
  "& #darkColor": {
    stopColor: "$colors$background",
  },
  "@lg": {
    width: "300px",
  },
})

const ArrowLink = ({ text = '', href = '#' }: { text?: string, href?: string }) => (
  <Link css={{ textDecoration: 'underline', textUnderlineOffset: '2px', textDecorationColor: '$primary', display: 'flex', flexDirection: 'row', alignItems: 'center', mb: '$5' }} as="a" href={href}>
    <ArrowRight />
    <Text css={{ color: '$primary', fontSize: "$xxl", ml: '$6' }}>{text}</Text>
  </Link>
)

const SectionHeading = ({ text = '', muted = false, topSegment = false }: { text?: string, muted?: boolean, topSegment?: boolean }) => (
  <Heading as="h3" css={{
    padding: '0',
    margin: '0',
    marginBottom: topSegment ? '$1' : '$5',
    color: muted ? '$muted' : undefined,
    "@initial": {
      fontSize: "$xxl",
    },
    "@md": {
      fontSize: "$2xl",
    },
  }} >{text}</Heading>
)

const SectionDescription = ({ text = '' }: { text?: string }) => (
  <Text as="div" css={{ fontSize: "$xl", color: '$text' }}>{text}</Text>
)

const Divider = styled('div', { width: '100%', height: '1px', backgroundColor: '$extraMuted', mb: '$5' })

const Home: NextPage = () => {
  return (
    <>
      <Container>
        <Box as="main" css={{ position: "relative" }}>
          <StyledDiamond />
          <Heading
            as="h1"
            css={{
              margin: "auto",
              py: "$32",
              textAlign: "center",
              maxWidth: "$5xl",
              position: "relative",
              zIndex: 10,
              "@initial": {
                maxWidth: "100%",
                fontSize: "$6xl",
              },
              "@lg": {
                maxWidth: "$5xl",
                fontSize: "$7xl",
              },
              "@xl": {
                maxWidth: "$7xl",
                fontSize: "$8xl",
              },
            }}
          >
            The world&apos;s first decentralised asset manager.
          </Heading>
        </Box>

        <Flex css={{ p: '$10', width: '100%' }}>
          <Text as="div" css={{ fontSize: "$xxl", color: '$muted', width: '50%', }}>Vanilla is an on-chain investment pool managed by the best investors.</Text>
          <Flex css={{ flexDirection: 'column', alignItems: 'start', width: '50%', ml: '$10', }}>
            <ArrowLink text="Stake $JUICE to earn rewards" />
            <ArrowLink text="Invest in Vanilla Pool" />
          </Flex>
        </Flex>

      </Container>

      <Flex css={{ width: '100%', borderTop: '1px solid $extraMuted' }}>
        <Container css={{ display: 'flex', flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
          <Flex css={{ height: '100%', width: '50%', borderRight: '1px solid $extraMuted', flexDirection: 'column' }}>
            <Flex css={{ flexDirection: 'row', my: '$10', alignItems: 'center' }}>
              <JuicingIcon css={{ m: '$5' }} />
              <Box css={{ ml: '$10' }}>
                <SectionHeading text="STAKE" muted topSegment />
                <SectionHeading text="TO EARN" />
              </Box>
            </Flex>
            <SectionDescription text="Create an investment portfolio by staking $JUICE. Earn rewards." />
            <Flex css={{ flexDirection: 'column', my: "$10" }}>
              <ArrowLink text="Read more" />
              <ArrowLink text="Start staking" />
            </Flex>
          </Flex>
          <Flex css={{ height: '100%', width: '50%', pl: '$10', flexDirection: 'column' }}>
            <Flex css={{ flexDirection: 'row', alignItems: 'center', my: '$10' }}>
              <JuiceSignalIcon css={{ m: '$5' }} />
              <Box css={{ ml: '$10' }}>
                <SectionHeading text="INVEST" muted topSegment />
                <SectionHeading text="IN THE POOL" />
              </Box>
            </Flex>
            <SectionDescription text="Invest in a portfolio that continuously adjusts itself to the changing circumstances." />
            <Flex css={{ flexDirection: 'column', my: "$10" }}>
              <ArrowLink text="Read more" />
              <ArrowLink text="Invest in pool" />
            </Flex>
          </Flex>
        </Container>
      </Flex>


      <Flex css={{ py: '$20', width: '100%', borderTop: '1px solid $extraMuted', backgroundColor: '$background2' }}>
        <Container>
          <Flex css={{ flexDirection: "row" }} >
            <Box css={{ width: '50%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <CommunityIcon css={{ width: '200px', mx: '$5' }} />
              <Flex css={{ flexDirection: 'column', ml: '$3' }}>
                <SectionHeading text="JOIN" muted topSegment />
                <SectionHeading text="THE COMMUNITY" />
                <SectionDescription text="$VNL holders direct the development through VanillaDAO" />
              </Flex>
            </Box>
            <Flex css={{ flexDirection: 'column', alignItems: 'start', justifyContent: 'center', width: '50%', ml: '$10', }}>
              <ArrowLink text="Join the discussion" />
              <ArrowLink text="Read about VanillaDAO" />
            </Flex>
          </Flex>
        </Container>
      </Flex>


    </>
  )
}

export default Home
