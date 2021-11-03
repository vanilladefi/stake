import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowCircleUpRight,
  TelegramLogo,
  MediumLogo,
  TwitterLogo,
  GithubLogo,
} from "phosphor-react";
import type * as Stitches from "@stitches/react";

import Stack from "../Stack";
import Wallet from "../Wallet";
import NavLink from "../NavLink";
import Text from "../Text";
import Box from "../Box";
import Flex from "../Flex";
import Container from "../Container";

const EtherScanLink: React.FC<{ href: string }> = ({ href, children }) => {
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
          <Box>
            <ArrowCircleUpRight size={"24px"} style={{ marginRight: 12 }} />
          </Box>
          {children}
        </Text>
      ) : (
        children
      )}
    </Link>
  );
};

const RegularLink: React.FC<{ href: string; css?: Stitches.CSS }> = ({
  href,
  children,
  css,
}) => {
  return (
    <Link href={href} passHref>
      {typeof children === "string" ? (
        <Text
          as="a"
          css={{
            color: "$text",
            textDecoration: "none",
            "&:hover": {
              color: "text",
            },
            display: "flex",
            alignItems: "center",
            ...css,
          }}
        >
          {children}
        </Text>
      ) : (
        <Box
          as="a"
          css={{
            display: "flex",
            color: "$text",
            textDecoration: "none",
            "&hover": {
              color: "text",
            },
            alignItems: "center",
            ...css,
          }}
        >
          {children}
        </Box>
      )}
    </Link>
  );
};

const Footer = () => {
  const { theme } = useTheme();
  return (
    <Flex
      as="footer"
      css={{
        paddingTop: "$4",
        display: "flex",
        borderTop: "1px solid $extraMuted",
        flexDirection: "column",
      }}
    >
      <Container css={{ flex: 1 }}>
        <Flex
          css={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "space-between",
            mb: "$8",
          }}
        >
          <Box
            css={{
              minWidth: "130px",
              position: "relative",
              marginRight: "0px",
            }}
          >
            <Link href="/" passHref>
              <Box
                as="a"
                css={{ display: "block", marginTop: "5px", mr: "$4" }}
              >
                {theme === "dark" ? (
                  <Image
                    alt="Vanilla Logo"
                    src="/vanilla-logo.svg"
                    height="33px"
                    width="130px"
                  />
                ) : (
                  <Image
                    alt="Vanilla Logo"
                    src="/vanilla-logo-dark.svg"
                    height="33px"
                    width="130px"
                  />
                )}
              </Box>
            </Link>
          </Box>

          <Stack
            css={{
              display: "none",
              mr: "$4",
              flexDirection: "row",
              "@initial": {
                display: "none",
              },
              "@md": {
                display: "flex",
              },
            }}
          >
            <NavLink href="/trade">Trade</NavLink>
            <NavLink href="/stake">Stake</NavLink>
            <NavLink href="/funds">Funds</NavLink>
            <NavLink href="/faq">Faq</NavLink>
            <NavLink href="/community">Community</NavLink>
          </Stack>

          <Wallet
            css={{
              display: "none",
              flexShrink: 0,
              "@initial": {
                width: "100%",
                display: "none",
              },
              "@lg": {
                width: "auto",
                display: "flex",
              },
            }}
          />
        </Flex>

        <Flex css={{ flexWrap: "wrap" }}>
          <Stack
            css={{
              flexDirection: "column",
              gap: "$3",
              mb: "$6",
              order: 1,
              width: "100%",
              "@md": {
                width: "50%",
              },
            }}
          >
            <EtherScanLink href="/">
              $VNL ERC-20 Contract on Etherscan
            </EtherScanLink>
            <EtherScanLink href="/">Vanilla Router on Etherscan</EtherScanLink>
            <EtherScanLink href="/">VanillaDAO on Etherscan</EtherScanLink>
          </Stack>
          <Stack
            css={{
              flexDirection: "column",
              textAlign: "right",
              marginLeft: "auto",
              alignSelf: "flex-start",
              width: "50%",
              order: 3,
              "@md": {
                order: 2,
              },
            }}
          >
            <RegularLink css={{ justifyContent: "flex-end" }} href="/">
              Bug bounty
            </RegularLink>
            <RegularLink css={{ justifyContent: "flex-end" }} href="/">
              Terms of Use
            </RegularLink>
            <RegularLink css={{ justifyContent: "flex-end" }} href="/">
              Privacy Policy
            </RegularLink>
          </Stack>

          <Stack
            css={{
              flexDirection: "column",
              width: "50%",
              order: 2,
              mb: "$6",
              "@md": {
                order: 3,
                flexDirection: "row",
              },
            }}
          >
            <RegularLink href="/" css={{ mr: "$3" }}>
              <Flex color="text" css={{ mr: "$2" }}>
                <TelegramLogo size="24px" weight="fill" />
              </Flex>
              Telegram
            </RegularLink>
            <RegularLink href="/" css={{ mr: "$3" }}>
              <Flex color="text" css={{ mr: "$2" }}>
                <TwitterLogo size="24px" weight="fill" />
              </Flex>
              Twitter
            </RegularLink>
            <RegularLink href="/" css={{ mr: "$3" }}>
              <Flex color="text" css={{ mr: "$2" }}>
                <GithubLogo size="24px" weight="fill" />{" "}
              </Flex>
              Github
            </RegularLink>
            <RegularLink href="/" css={{ mr: "$3" }}>
              <Flex color="text" css={{ mr: "$2" }}>
                <MediumLogo size="24px" weight="fill" />
              </Flex>
              Medium
            </RegularLink>
          </Stack>
        </Flex>
      </Container>
      <Flex css={{ borderTop: "1px solid", borderTopColor: "extraMuted" }}>
        <Container>
          <Flex css={{ py: "$2", alignItems: "center", flexWrap: "wrap" }}>
            <Flex
              css={{
                alignItems: "center",
                width: "100%",
                "@md": { width: "50%" },
              }}
            >
              Made by
              <Box
                css={{
                  width: "100px",
                  height: "30px",
                  ml: "$2",
                  mt: "2px",
                  position: "relative",
                }}
              >
                {theme === "dark" ? (
                  <Image
                    alt="Equilibrium Logo"
                    src="/eq-logo.svg"
                    layout="fill"
                  />
                ) : (
                  <Image
                    alt="Equilibrium Logo"
                    src="/eq-logo-dark.svg"
                    layout="fill"
                  />
                )}
              </Box>
            </Flex>
            <Flex
              css={{
                ml: "none",
                "@md": {
                  width: "50%",
                },
              }}
            >
              <Text
                css={{
                  ml: "none",
                  "@sm": {
                    ml: "auto",
                  },
                }}
              >
                Copyright © {new Date().getFullYear()} Vanilla
              </Text>
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </Flex>
  );
};

export default Footer;
