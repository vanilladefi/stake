import type { InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import {
  CommunityIcon,
  Diamond, JuiceFlow,
  JuiceSignalIcon,
  JuicingIcon,
  One,
  Three,
  Two
} from "../assets";
import { ArrowLink } from "../components/ArrowLink";
import Box from "../components/Box";
import Container from "../components/Container";
import EmailForm from "../components/EmailForm";
import Flex from "../components/Flex";
import Heading from "../components/Heading";
import Leaderboard from '../components/Leaderboard';
import Text from "../components/Text";
import { fetchLeaderboard } from "../lib/fetch-leaderboard";
import { styled } from "../stitches.config";
import { ArrowLink } from "../components/ArrowLink";
import { fetchLeaderboard } from "../utils/fetch-leaderboard";
import Leaderboard from "../components/Leaderboard";

const ActiveWallet = dynamic(
  () => import("../components/Wallet/ActiveWallet"),
  { ssr: false }
);
const WalletModal = dynamic(() => import("../components/Wallet/WalletModal"), {
  ssr: false,
});

export const getStaticProps = async () => {
  const skip =
    process.env.NODE_ENV === "development" &&
    process.env.SKIP_LEADERBOARD_IN_DEV === "true";

  return {
    props: {
      leaderboard: skip ? null : await fetchLeaderboard(),
    },
    revalidate: 10 * 60, // rebuild every 10 minutes
  };
};

const Home = ({
  leaderboard,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
              "@sm": {
                maxWidth: "$lg",
                fontSize: "$5xl",
              },
              "@md": {
                maxWidth: "$1xl",
                fontSize: "$6xl",
              },
              "@lg": {
                maxWidth: "$3xl",
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
            <ArrowLink href="/stake" text="Stake $JUICE to earn rewards" />
            <div style={{ opacity: 0.2 }}>
              {" "}
              <ArrowLink text="Invest in Vanilla Pool" />
            </div>
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
              <SectionHeading text="Stay informed, get $JUICE" />
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
                mt: "$5",
                "@md": {
                  mt: 0,
                  ml: "$10",
                  pl: "$5",
                  width: "50%",
                },
              }}
            >
              <EmailForm />
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
                <SectionDescription
                  text={'"Juicers" create investment portfolios.'}
                />
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
                <ArrowLink href="/litepaper" text="Read the Litepaper" />
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
                <ArrowLink href="/stake" text="Start staking" />
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
                <div style={{ opacity: 0.3 }}>
                  <ArrowLink text="Read more" />
                  <ArrowLink text="Invest in pool" />
                </div>
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
                <SectionDescription text="$VNL holders direct the development of Vanilla via VanillaDAO" />
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
              <ArrowLink
                newWindow
                href="https://discord.gg/CnPuf2cGQ3"
                text="Join the discussion"
              />
              <ArrowLink
                href="/litepaper#2-3-vanilladao"
                text="Read about VanillaDAO"
              />
            </Flex>
          </Flex>
        </Container>
      </Flex>
      <Flex
        css={{
          py: "$10",
          width: "100%",
          borderTop: "1px solid $extraMuted",
          "@md": {
            py: "$14",
          },
        }}
      >
        <Container>
          {leaderboard && <Leaderboard {...leaderboard} />}
        </Container>
      </Flex>
    </>
  );
};

export const StyledDiamond = styled(Diamond, {
  position: "absolute",
  minWidth: "auto",
  overflow: "visible",
  left: "50%",
  top: "50%",
  transform: "translateY(-50%) translateX(-50%)",
  width: "140px",
  "& #darkColor": {
    stopColor: "$colors$background",
  },
  "@sm": {
    width: "180px",
  },
  "@md": {
    width: "230px",
  },
  "@lg": {
    width: "260px",
  },
  "@xl": {
    width: "300px",
  },
});

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

export const SectionDescription = ({
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

export const StyledOne = styled(One, { color: "$textSecondary" });
export const StyledTwo = styled(Two, { color: "$textSecondary" });
export const StyledThree = styled(Three, { color: "$textSecondary" });

export const StyledJuiceFlow = styled(JuiceFlow, {
  width: "100%",
  minWidth: "auto",
  maxWidth: "400px",
});

export default Home;
