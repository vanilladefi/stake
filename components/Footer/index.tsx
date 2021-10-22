import {
  Flex,
  Box,
  Container,
  Text,
  useColorMode,
  Grid,
  ThemeUIStyleObject,
} from "theme-ui";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowCircleUpRight,
  TelegramLogo,
  MediumLogo,
  TwitterLogo,
  GithubLogo,
} from "phosphor-react";

import Stack from "../Stack";
import Wallet from "../Wallet";
import NavLink from "../NavLink";

const EtherScanLink: React.FC<{ href: string }> = ({ href, children }) => {
  return (
    <Link href={href} passHref>
      {typeof children === "string" ? (
        <Text
          as="a"
          sx={{
            color: "primary",
            textDecoration: "none",
            ":hover": {
              color: "text",
            },
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowCircleUpRight size={24} style={{ marginRight: 12 }} />
          {children}
        </Text>
      ) : (
        children
      )}
    </Link>
  );
};

const RegularLink: React.FC<{ href: string; sx?: ThemeUIStyleObject }> = ({
  href,
  children,
  sx,
}) => {
  return (
    <Link href={href} passHref>
      {typeof children === "string" ? (
        <Text
          as="a"
          sx={{
            fontSize: 2,
            color: "text",
            textDecoration: "none",
            ":hover": {
              color: "text",
            },
            display: "flex",
            alignItems: "center",
            ...sx,
          }}
        >
          {children}
        </Text>
      ) : (
        <Flex
          as="a"
          sx={{
            fontSize: 2,
            color: "text",
            textDecoration: "none",
            ":hover": {
              color: "text",
            },
            display: "flex",
            alignItems: "center",
            ...sx,
          }}
        >
          {children}
        </Flex>
      )}
    </Link>
  );
};

const Footer = () => {
  const [mode] = useColorMode();
  return (
    <Flex
      as="footer"
      pt={4}
      sx={{
        borderTop: "1px solid",
        borderColor: "extraMuted",
        flexDirection: "column",
      }}
    >
      <Container sx={{ flexWrap: "wrap" }}>
        <Flex
          sx={{
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              minWidth: "130px",
              position: "relative",
              marginRight: "0px",
            }}
          >
            <Link href="/" passHref>
              <Box as="a" sx={{ display: "block", marginTop: "5px" }}>
                {mode === "dark" ? (
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
            spacing={4}
            direction={"row"}
            sx={{ display: ["none", null, "flex"] }}
          >
            <NavLink href="/trade">Trade</NavLink>
            <NavLink href="/stake">Stake</NavLink>
            <NavLink href="/funds">Funds</NavLink>
            <NavLink href="/faq">Faq</NavLink>
            <NavLink href="/community">Community</NavLink>
          </Stack>

          <Wallet
            sx={{
              flexShrink: 0,
              width: ["100%", "100%", "100%", "auto"],
              display: ["none", "none", "flex"],
            }}
          />
        </Flex>

        <Flex sx={{ flexWrap: "wrap" }}>
          <Stack
            spacing={3}
            direction="column"
            marginTop={4}
            mb={4}
            sx={{ order: 1, width: ["100%", "50%", "50%", "50%"] }}
          >
            <EtherScanLink href="/">
              $VNL ERC-20 Contract on Etherscan
            </EtherScanLink>
            <EtherScanLink href="/">Vanilla Router on Etherscan</EtherScanLink>
            <EtherScanLink href="/">VanillaDAO on Etherscan</EtherScanLink>
          </Stack>
          <Stack
            spacing={3}
            marginTop={[null, 4]}
            direction="column"
            sx={{
              textAlign: "right",
              marginLeft: "auto",
              order: [3, 2, 2, 2],
              alignSelf: "flex-start",
              width: "50%",
            }}
          >
            <RegularLink sx={{ justifyContent: "flex-end" }} href="/">
              Bug bounty
            </RegularLink>
            <RegularLink sx={{ justifyContent: "flex-end" }} href="/">
              Terms of Use
            </RegularLink>
            <RegularLink sx={{ justifyContent: "flex-end" }} href="/">
              Privacy Policy
            </RegularLink>
          </Stack>

          <Stack
            spacing={[3, 2, 2]}
            mb={3}
            direction={["column", "row", "row"]}
            sx={{ order: [2, 3, 3, 3] }}
          >
            <RegularLink href="/" sx={{ mr: 3 }}>
              <Flex color="text" sx={{ mr: 2 }}>
                <TelegramLogo size="24px" weight="fill" />
              </Flex>
              Telegram
            </RegularLink>
            <RegularLink href="/" sx={{ mr: 3 }}>
              <Flex color="text" sx={{ mr: 2 }}>
                <TwitterLogo size="24px" weight="fill" />
              </Flex>
              Twitter
            </RegularLink>
            <RegularLink href="/" sx={{ mr: 3 }}>
              <Flex color="text" sx={{ mr: 2 }}>
                <GithubLogo size="24px" weight="fill" />{" "}
              </Flex>
              Github
            </RegularLink>
            <RegularLink href="/" sx={{ mr: 3 }}>
              <Flex color="text" sx={{ mr: 2 }}>
                <MediumLogo size="24px" weight="fill" />
              </Flex>
              Medium
            </RegularLink>
          </Stack>
        </Flex>
      </Container>
      <Flex sx={{ borderTop: "1px solid", borderTopColor: "extraMuted" }}>
        <Container>
          <Flex py={2} sx={{ alignItems: "center", flexWrap: "wrap" }}>
            <Flex sx={{ alignItems: "center", width: ["100%", "100%", "50%"] }}>
              Made by
              <Box
                ml={2}
                mt={"2px"}
                sx={{ width: "100px", height: "30px", position: "relative" }}
              >
                {mode === "dark" ? (
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
            <Flex ml="auto" sx={{ width: ["100%", "100%", "50%"] }}>
              <Text ml={["none", "auto", "auto"]}>
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
