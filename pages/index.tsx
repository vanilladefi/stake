import type { NextPage } from "next";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  CommunityIcon,
  Diamond,
  Divider as _Divider,
  JuiceFlow,
  JuiceSignalIcon,
  JuicingIcon,
  One,
  Three,
  Two,
} from "../assets";
import Box from "../components/Box";
import Container from "../components/Container";
import Flex from "../components/Flex";
import Heading from "../components/Heading";
import Link from "../components/Link";
import Text from "../components/Text";
import { styled } from "../stitches.config";

const ActiveWallet = dynamic(
  () => import("../components/Wallet/ActiveWallet"),
  { ssr: false }
);
const WalletModal = dynamic(() => import("../components/Wallet/WalletModal"), {
  ssr: false,
});

const StyledDiamond = styled(Diamond, {
  position: "absolute",
  minWidth: "auto",
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
});

const StyledArrow = styled(ArrowRight, {
  width: "40px",
  height: "40px",
  padding: "5px",
  boxSizing: "border-box",
});

const ArrowLink = ({
  text = "",
  href = "#",
}: {
  text?: string;
  href?: string;
}) => (
  <Link
    css={{
      textDecoration: "underline",
      textUnderlineOffset: "2px",
      textDecorationColor: "$primary",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      mb: "$1",
    }}
    as="a"
    href={href}
  >
    <StyledArrow />
    <Text
      css={{
        color: "$primary",
        fontSize: "$xl",
        pb: "5px",
        ml: "$5",
        "@md": {
          ml: "$5",
          fontSize: "$xxl",
        },
      }}
    >
      {text}
    </Text>
  </Link>
);

const SectionHeading = ({
  text = "",
  muted = false,
  topSegment = false,
}: {
  text?: string;
  muted?: boolean;
  topSegment?: boolean;
}) => (
  <Heading
    as="h3"
    css={{
      padding: "0",
      margin: "0",
      marginBottom: topSegment ? 0 : "$5",
      color: muted ? "$muted" : undefined,
      // '@initial': {
      fontSize: "$2xl",
      lineHeight: "1.1",
      // },
      "@md": {
        fontSize: "$2xl",
      },
    }}
  >
    {text}
  </Heading>
);

const SectionDescription = ({
  text = "",
  muted = false,
}: {
  text?: string;
  muted?: boolean;
}) => (
  <Text
    as="div"
    css={{
      fontSize: "$xl",
      color: muted ? "$muted" : "$textSecondary",
      "@md": {
        fontSize: "$xxl",
      },
    }}
  >
    {text}
  </Text>
);

const StyledOne = styled(One, { color: "$textSecondary" });
const StyledTwo = styled(Two, { color: "$textSecondary" });
const StyledThree = styled(Three, { color: "$textSecondary" });

const StyledJuiceFlow = styled(JuiceFlow, {
  width: "100%",
  minWidth: "auto",
  maxWidth: "400px",
});

const Divider = styled(_Divider, { my: "$8", width: "100%" });

const Home: NextPage = () => {
  return (
    <>
      <WalletModal />
      <ActiveWallet />
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
              zIndex: 2,
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
            Decentra&shy;lized Asset Manager for Web3
          </Heading>
        </Box>

        <Flex
          css={{
            // p: '$3',
            width: "100%",
            flexDirection: "column",
            "@md": {
              flexDirection: "row",
            },
          }}
        >
          <Flex
            css={{
              flexDirection: "column",
              width: "100%",
              "@md": {
                width: "50%",
              },
            }}
          >
            <SectionDescription
              muted
              text=" Vanilla is an on-chain investment pool managed by the best investors."
            />
          </Flex>
          <Flex
            css={{
              flexDirection: "column",
              alignItems: "start",
              width: "100%",
              mt: "$6",
              mb: "$10",
              "@md": {
                width: "50%",
                ml: "$10",
                mt: 0,
              },
            }}
          >
            <ArrowLink text="Stake $JUICE to earn rewards" />
            <ArrowLink text="Invest in Vanilla Pool" />
          </Flex>
        </Flex>
      </Container>

      <Flex
        css={{ py: "$10", width: "100%", borderTop: "1px solid $extraMuted" }}
      >
        <Container>
          <Flex
            css={{
              width: "100%",
              flexDirection: "column",
              "@md": {
                flexDirection: "row",
              },
            }}
          >
            <Flex
              css={{
                width: "100%",
                flexDirection: "column",
                // alignItems: 'start',
                "@md": {
                  width: "50%",
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
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "center",
                width: "100%",
                ml: "$10",
                "@md": {
                  width: "50%",
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
          width: "100%",
          borderTop: "1px solid $extraMuted",
          borderBottom: "1px solid $extraMuted",
          backgroundColor: "$backgroundSecondary",
          py: "$10",
        }}
      >
        <Container>
          <Flex
            css={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              "@md": {
                flexDirection: "row",
              },
            }}
          >
            <Flex
              css={{
                flexDirection: "column",
                alignItems: "start",
                width: "100%",
                "@md": {
                  width: "50%",
                },
              }}
            >
              <Box>
                <SectionHeading text="HOW VANILLA WORKS" />
              </Box>
              <Flex
                css={{
                  flexDirection: "row",
                  alignItems: "center",
                  mb: "$4",
                  mt: "$5",
                }}
              >
                <StyledOne css={{ mr: "$5" }} />
                <SectionDescription text="Juicers create investment portfolios." />
              </Flex>
              <Flex
                css={{ flexDirection: "row", alignItems: "center", mb: "$4" }}
              >
                <StyledTwo css={{ mr: "$5" }} />
                <SectionDescription text="Vanilla Pool invests in line with the best performing Juicers." />
              </Flex>
              <Flex
                css={{ flexDirection: "row", alignItems: "center", mb: "$4" }}
              >
                <StyledThree css={{ mr: "$5" }} />
                <SectionDescription text="VanillaDAO channels a share of returns back to Juicers." />
              </Flex>
              <Box
                css={{
                  mt: "$5",
                  mb: "$5",
                  "@md": {
                    mb: 0,
                  },
                }}
              >
                <ArrowLink text="Read the FAQ" />
              </Box>
            </Flex>
            <Flex
              css={{
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                "@md": {
                  width: "50%",
                  pl: "$10",
                },
              }}
            >
              <StyledJuiceFlow />
            </Flex>
          </Flex>
        </Container>
      </Flex>

      <Container
        css={{
          display: "flex",
          px: "0",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          "@md": {
            flexDirection: "row",
          },
        }}
      >
        {/* Juice */}
        <Flex
          css={{
            width: "100%",
            borderBottom: "1px solid $extraMuted",
            py: "$10",
            "@md": {
              borderBottom: "none",
              borderRight: "1px solid $extraMuted",
              width: "50%",
              py: "$14",
            },
          }}
        >
          <Container>
            <Flex
              css={{
                flexDirection: "column",
              }}
            >
              <Flex
                css={{
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: "$10",
                }}
              >
                <Box
                  css={{
                    ml: "$10",
                    order: 1,
                    maxWidth: "96px",
                    "@md": {
                      ml: 0,
                      mr: "$10",
                      order: 0,
                    },
                  }}
                >
                  <JuicingIcon />
                </Box>
                <Box>
                  <SectionHeading text="STAKE" muted topSegment />
                  <SectionHeading text="TO EARN" />
                  <SectionDescription text="Create an investment portfolio by staking $JUICE. Earn rewards." />
                </Box>
              </Flex>
              <Flex css={{ flexDirection: "column" }}>
                <ArrowLink text="Read more" />
                <ArrowLink text="Start staking" />
              </Flex>
            </Flex>
          </Container>
        </Flex>
        {/* Invest */}
        <Flex
          css={{
            width: "100%",
            py: "$10",
            "@md": {
              width: "50%",
              py: "$14",
            },
          }}
        >
          <Container>
            <Flex
              css={{
                flexDirection: "column",
              }}
            >
              <Flex
                css={{
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: "$10",
                }}
              >
                <Box
                  css={{
                    ml: "$10",
                    order: 1,
                    width: "30%",
                    maxWidth: "96px",
                    textAlign: "center",
                    "@md": {
                      ml: 0,
                      mr: "$10",
                      order: 0,
                    },
                  }}
                >
                  <JuiceSignalIcon />
                </Box>
                <Box>
                  <SectionHeading text="INVEST" muted topSegment />
                  <SectionHeading text="IN THE POOL" />
                  <SectionDescription text="Invest in a portfolio that continuously adjusts itself to the changing circumstances." />
                </Box>
              </Flex>

              <Flex css={{ flexDirection: "column" }}>
                <ArrowLink text="Read more" />
                <ArrowLink text="Invest in pool" />
              </Flex>
            </Flex>
          </Container>
        </Flex>
      </Container>

      <Flex
        css={{
          py: "$10",
          width: "100%",
          borderTop: "1px solid $extraMuted",
          backgroundColor: "$backgroundSecondary",
          "@md": {
            py: "$14",
            flexDirection: "row",
          },
        }}
      >
        <Container>
          <Flex
            css={{
              flexDirection: "column",
              "@md": {
                flexDirection: "row",
              },
            }}
          >
            <Box
              css={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                width: "100%",
                "@md": {
                  width: "50%",
                  alignItems: "center",
                },
              }}
            >
              <Box
                css={{
                  ml: "$10",
                  order: 1,
                  maxWidth: "120px",
                  "@md": {
                    ml: 0,
                    mr: "$10",
                    order: 0,
                  },
                }}
              >
                <CommunityIcon />
              </Box>

              <Flex
                css={{
                  flexDirection: "column",
                }}
              >
                <SectionHeading text="JOIN" muted topSegment />
                <SectionHeading text="THE COMMUNITY" />
                <SectionDescription text="$VNL holders direct the development through VanillaDAO" />
              </Flex>
            </Box>
            <Flex
              css={{
                flexDirection: "column",
                alignItems: "start",
                width: "100%",
                mt: "$10",
                pl: "$2",
                "@md": {
                  ml: "$10",
                  width: "50%",
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
  );
};

export default Home;
