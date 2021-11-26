import type { NextPage } from 'next'
import Image from 'next/image'
import _Container from '../components/Container'
import Heading from '../components/Heading'
import Flex from '../components/Flex'
import Box from '../components/Box'
import Link from '../components/Link'
import Text from '../components/Text'
import { styled } from '../stitches.config'
import {
    ArrowRight,
    CommunityIcon,
    Diamond,
    JuiceSignalIcon,
    JuicingIcon,
    JuiceFlow,
    Three,
    Two,
    One,
    Divider as _Divider,
} from '../assets'

const StyledDiamond = styled(Diamond, {
    position: 'absolute',
    minWidth: 'auto',
    overflow: 'visible',
    left: '50%',
    top: '50%',
    transform: 'translateY(-50%) translateX(-50%)',
    width: '200px',
    '& #darkColor': {
        stopColor: '$colors$background',
    },
    '@lg': {
        width: '300px',
    },
})

const ArrowLink = ({ text = '', href = '#' }: { text?: string; href?: string }) => (
    <Link
        css={{
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
            textDecorationColor: '$primary',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            mb: '$5',
        }}
        as="a"
        href={href}
    >
        <ArrowRight />
        <Text
            css={{
                color: '$primary',
                fontSize: '$xl',
                pb: '5px',
                ml: '$4',
                '@md': {
                    ml: '$6',
                    fontSize: '$xxl',
                },
            }}
        >
            {text}
        </Text>
    </Link>
)

const SectionHeading = ({
    text = '',
    muted = false,
    topSegment = false,
}: {
    text?: string
    muted?: boolean
    topSegment?: boolean
}) => (
    <Heading
        as="h3"
        css={{
            padding: '0',
            margin: '0',
            marginBottom: topSegment ? '$1' : '$5',
            color: muted ? '$muted' : undefined,
            // '@initial': {
            fontSize: '$2xl',
            lineHeight: '1.25',
            // },
            '@md': {
                fontSize: '$2xl',
            },
        }}
    >
        {text}
    </Heading>
)

const SectionDescription = ({ text = '', muted = false }: { text?: string; muted?: boolean }) => (
    <Text as="div" css={{ fontSize: '$xl', color: muted ? '$muted' : '$text2' }}>
        {text}
    </Text>
)

const Container = styled(_Container, { pl: '$5' })

const StyledOne = styled(One, { color: '$text2' })
const StyledTwo = styled(Two, { color: '$text2' })
const StyledThree = styled(Three, { color: '$text2' })

const StyledJuiceFlow = styled(JuiceFlow, { width: '100%', minWidth: 'auto', maxWidth: '400px' })

const Divider = styled(_Divider, { my: '$8', width: '100%' })

const Home: NextPage = () => {
    return (
        <>
            <Container>
                <Box as="main" css={{ position: 'relative' }}>
                    <StyledDiamond />
                    <Heading
                        as="h1"
                        css={{
                            margin: 'auto',
                            py: '$32',
                            textAlign: 'center',
                            maxWidth: '$5xl',
                            position: 'relative',
                            zIndex: 10,
                            '@initial': {
                                maxWidth: '100%',
                                fontSize: '$6xl',
                            },
                            '@lg': {
                                maxWidth: '$5xl',
                                fontSize: '$7xl',
                            },
                            '@xl': {
                                maxWidth: '$7xl',
                                fontSize: '$8xl',
                            },
                        }}
                    >
                        The world&apos;s first decentralised asset manager.
                    </Heading>
                </Box>

                <Flex
                    css={{
                        // p: '$3',
                        width: '100%',
                        flexDirection: 'column',
                        '@md': {
                            flexDirection: 'row',
                        },
                    }}
                >
                    <Text
                        as="div"
                        css={{
                            fontSize: '$xxl',
                            color: '$muted',
                            flexDirection: 'column',
                            width: '100%',
                            '@md': {
                                width: '50%',
                            },
                        }}
                    >
                        Vanilla is an on-chain investment pool managed by the best investors.
                    </Text>
                    <Flex
                        css={{
                            flexDirection: 'column',
                            alignItems: 'start',
                            width: '100%',
                            mt: '$6',
                            '@md': {
                                width: '50%',
                                ml: '$10',
                                mt: 0,
                            },
                        }}
                    >
                        <ArrowLink text="Stake $JUICE to earn rewards" />
                        <ArrowLink text="Invest in Vanilla Pool" />
                    </Flex>
                </Flex>
            </Container>
            <Flex css={{ py: '$20', width: '100%', borderTop: '1px solid $extraMuted' }}>
                <Container>
                    <Flex
                        css={{
                            width: '100%',
                            flexDirection: 'column',
                            '@md': {
                                flexDirection: 'row',
                            },
                        }}
                    >
                        <Flex
                            css={{
                                width: '100%',
                                flexDirection: 'column',
                                // alignItems: 'start',
                                '@md': {
                                    width: '50%',
                                },
                            }}
                        >
                            <SectionHeading text="GET INFORMED, win $JUICE" />
                            {/* <Divider /> */}
                            <SectionDescription
                                muted
                                text="Get the latest Vanilla scoops and a possibility to win a $JUICE airdrop."
                            />
                        </Flex>
                        <Flex
                            css={{
                                flexDirection: 'column',
                                alignItems: 'start',
                                justifyContent: 'center',
                                width: '100%',
                                ml: '$10',
                                '@md': {
                                    width: '50%',
                                },
                            }}
                        >
                            {/* FORM_HERE */}
                        </Flex>
                    </Flex>
                </Container>
            </Flex>

            <Flex
                css={{
                    width: '100%',
                    borderTop: '1px solid $extraMuted',
                    backgroundColor: '$background2',
                }}
            >
                <Container>
                    <Flex
                        css={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            my: "$2",
                            '@md': {
                                flexDirection: 'row',
                            },
                        }}
                    >
                        <Flex
                            css={{
                                flexDirection: 'column',
                                alignItems: 'start',
                                width: '100%',
                                '@md': {
                                    width: '50%',
                                },
                            }}
                        >
                            <Box
                                css={{
                                    mt: '$10',
                                    mb: '$1',
                                    ml: '$1',
                                }}
                            >
                                <SectionHeading text="HOW VANILLA WORKS" />
                            </Box>
                            <Flex css={{ flexDirection: 'row', alignItems: 'center', mb: '$5' }}>
                                <StyledOne css={{ mr: '$5' }} />
                                <SectionDescription text="Juicers create investment portfolios." />
                            </Flex>
                            <Flex css={{ flexDirection: 'row', alignItems: 'center', mb: '$5' }}>
                                <StyledTwo css={{ mr: '$5' }} />
                                <SectionDescription text="Vanilla Pool invests in line with the best performing Juicers." />
                            </Flex>
                            <Flex css={{ flexDirection: 'row', alignItems: 'center', mb: '$5' }}>
                                <StyledThree css={{ mr: '$5' }} />
                                <SectionDescription text="VanillaDAO channels a share of returns back to Juicers." />
                            </Flex>
                            <Box css={{ mt: '$5' }}>
                                <ArrowLink text="Read the FAQ" />
                            </Box>
                        </Flex>
                        <Flex
                            css={{
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '100%',
                                '@md': {
                                    width: '50%',
                                    pl: '$10',
                                },
                            }}
                        >
                            <StyledJuiceFlow />
                        </Flex>
                    </Flex>
                </Container>
            </Flex>

            <Flex css={{ width: '100%', borderTop: '1px solid $extraMuted' }}>
                <Container
                    css={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '@md': {
                            flexDirection: 'row',
                        },
                    }}
                >
                    <Flex
                        css={{
                            height: '100%',
                            width: '100%',
                            flexDirection: 'column',
                            borderBottom: '1px solid $extraMuted',
                            '@md': {
                                borderRight: '1px solid $extraMuted',
                                width: '50%',
                            },
                        }}
                    >
                        <Flex css={{ flexDirection: 'row', my: '$10', alignItems: 'center' }}>
                            <JuicingIcon css={{ m: '$5' }} />
                            <Box css={{ ml: '$10' }}>
                                <SectionHeading text="STAKE" muted topSegment />
                                <SectionHeading text="TO EARN" />
                            </Box>
                        </Flex>
                        <SectionDescription text="Create an investment portfolio by staking $JUICE. Earn rewards." />
                        <Flex css={{ flexDirection: 'column', my: '$10' }}>
                            <ArrowLink text="Read more" />
                            <ArrowLink text="Start staking" />
                        </Flex>
                    </Flex>
                    <Flex
                        css={{
                            height: '100%',
                            width: '100%',
                            flexDirection: 'column',
                            '@md': {
                                pl: '$16',
                                width: '50%',
                            },
                        }}
                    >
                        <Flex css={{ flexDirection: 'row', alignItems: 'center', my: '$10' }}>
                            <JuiceSignalIcon css={{ m: '$5' }} />
                            <Box css={{ ml: '$10' }}>
                                <SectionHeading text="INVEST" muted topSegment />
                                <SectionHeading text="IN THE POOL" />
                            </Box>
                        </Flex>
                        <SectionDescription text="Invest in a portfolio that continuously adjusts itself to the changing circumstances." />
                        <Flex css={{ flexDirection: 'column', my: '$10' }}>
                            <ArrowLink text="Read more" />
                            <ArrowLink text="Invest in pool" />
                        </Flex>
                    </Flex>
                </Container>
            </Flex>

            <Flex
                css={{
                    py: '$20',
                    width: '100%',
                    borderTop: '1px solid $extraMuted',
                    backgroundColor: '$background2',
                }}
            >
                <Container>
                    <Flex
                        css={{
                            flexDirection: 'column',
                            "@md": {
                                flexDirection: 'row',
                            },
                        }}
                    >
                        <Box
                            css={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%',
                                '@md': {
                                    width: '50%',
                                },
                            }}
                        >
                            <CommunityIcon css={{ width: '200px', mx: '$5' }} />
                            <Flex css={{ flexDirection: 'column', ml: '$3' }}>
                                <SectionHeading text="JOIN" muted topSegment />
                                <SectionHeading text="THE COMMUNITY" />
                                <SectionDescription text="$VNL holders direct the development through VanillaDAO" />
                            </Flex>
                        </Box>
                        <Flex
                            css={{
                                flexDirection: 'column',
                                alignItems: 'start',
                                width: '100%',
                                mt: '$10',
                                pl: '$2',
                                '@md': {
                                    ml: '$10',
                                    width: '50%',
                                },
                            }}
                        >
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
