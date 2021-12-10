import type * as Stitches from "@stitches/react";
import { useTheme } from "next-themes";

import Link from "next/link";
import {
  ArrowCircleUpRight,
  DiscordLogo,
  GithubLogo,
  Notebook,
  TelegramLogo,
  TwitterLogo,
} from "phosphor-react";
import Box from "../Box";
import Container from "../Container";
import Flex from "../Flex";
import Navigation from "../Navigation";
import Stack from "../Stack";
import Text from "../Text";

const EtherScanLink: React.FC<{ href: string }> = ({ href, children }) => {
  return (
    <Link href={href} passHref>
      {typeof children === "string" ? (
        <Text
          as="a"
          target="_blank"
          rel="noreferrer noopener"
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
        display: "flex",
        borderTop: "1px solid $extraMuted",
        flexDirection: "column",
      }}
    >
      <Navigation />
      <Container css={{ flex: 1, paddingTop: "$8" }}>
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
            <EtherScanLink href="https://etherscan.io/token/0xbf900809f4C73e5a3476eb183d8b06a27e61F8E5">
              $VNL ERC-20 Contract on Etherscan
            </EtherScanLink>
            <EtherScanLink href="https://etherscan.io/address/0x72C8B3aA6eD2fF68022691ecD21AEb1517CfAEa6">
              Vanilla Router on Etherscan
            </EtherScanLink>
            <EtherScanLink href="https://etherscan.io/address/0xa135f339B5acd1f4eCB1C6eEd69a31482f878545">
              VanillaDAO on Etherscan
            </EtherScanLink>
            <EtherScanLink href="https://vanilladefi.com">
              Vanilla V1.1 Trading
            </EtherScanLink>
          </Stack>

          <Stack
            css={{
              borderTop: "1px solid $extraMuted",
              flexDirection: "column",
              width: "100%",
              order: 1,
              mb: "$6",
              "@md": {
                order: 3,
                flexDirection: "row",
              },
            }}
          ></Stack>

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
            <RegularLink
              href="https://discord.gg/CnPuf2cGQ3"
              css={{ mr: "$3" }}
            >
              <Flex color="text" css={{ mr: "$2" }}>
                <DiscordLogo size="24px" weight="fill" />
              </Flex>
              Discord
            </RegularLink>

            <RegularLink href="https://t.me/vanilladefi" css={{ mr: "$3" }}>
              <Flex color="text" css={{ mr: "$2" }}>
                <TelegramLogo size="24px" weight="fill" />
              </Flex>
              Telegram
            </RegularLink>
            <RegularLink
              href="https://www.twitter.com/vanilladefi"
              css={{ mr: "$3" }}
            >
              <Flex color="text" css={{ mr: "$2" }}>
                <TwitterLogo size="24px" weight="fill" />
              </Flex>
              Twitter
            </RegularLink>
            <RegularLink
              href="https://www.github.com/vanilladefi"
              css={{ mr: "$3" }}
            >
              <Flex color="text" css={{ mr: "$2" }}>
                <GithubLogo size="24px" weight="fill" />{" "}
              </Flex>
              Github
            </RegularLink>
          </Stack>
          <Stack
            css={{
              justifyContent: "flex-end",
              flexDirection: "column",
              width: "50%",
              order: 3,
              mb: "$6",
              "@md": {
                order: 3,
                flexDirection: "row",
              },
            }}
          >
            <Text
              css={{
                color: "$muted",
                ml: "none",
                "@sm": {
                  ml: "auto",
                },
              }}
            >
              Copyright © {new Date().getFullYear()} Vanilla
            </Text>
          </Stack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Footer;
