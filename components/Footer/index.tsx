import type * as Stitches from "@stitches/react";
import Link from "next/link";
import {
  ArrowCircleUpRight,
  DiscordLogo,
  GithubLogo,
  Notebook,
  TelegramLogo,
  TwitterLogo
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
          rel="noopener noreferrer"
          css={{
            color: "$link",
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

const RegularLink: React.FC<{
  href: string;
  newWindow?: boolean;
  css?: Stitches.CSS;
}> = ({ href, children, css, newWindow }) => {
  return (
    <Link href={href} passHref>
      {typeof children === "string" ? (
        <Text
          as="a"
          target={newWindow ? "_blank" : "_self"}
          rel={newWindow ? "noopener noreferrer" : ""}
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
          target={newWindow ? "_blank" : "_self"}
          rel={newWindow ? "noopener noreferrer" : ""}
          css={{
            display: "flex",
            color: "$text",
            textDecoration: "none",
            "&hover": {
              color: "text",
            },
            fontSize: "$md",
            alignItems: "center",
            "@sm": {
              fontSize: "$sm",
            },
            "@md": {
              fontSize: "$sm",
            },
            "@lg": {
              fontSize: "$md",
            },
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
            <EtherScanLink href="https://polygonscan.com/token/0xab1c9b68762fd0d3c720f6717dbaf45b0273b39b">
              Juicenet contract on Polygonscan
            </EtherScanLink>
            <EtherScanLink href="https://etherscan.io/address/0xa135f339B5acd1f4eCB1C6eEd69a31482f878545">
              VanillaDAO on Etherscan
            </EtherScanLink>
          </Stack>
          <Stack
            css={{
              flexDirection: "column",
              textAlign: "right",
              marginLeft: "auto",
              alignSelf: "flex-start",
              width: "50%",
              mb: "$6",
              order: 3,
              "@md": {
                order: 2,
              },
            }}
          >
            <RegularLink
              css={{ justifyContent: "flex-end" }}
              href="https://vanilla-profitmining.vercel.app/"
            >
              Profit Mining (deprecated)
            </RegularLink>
            <RegularLink
              css={{ justifyContent: "flex-end" }}
              href="/privacy-policy"
            >
              Privacy Policy
            </RegularLink>
            <RegularLink
              css={{ justifyContent: "flex-end" }}
              href="/terms-of-use"
            >
              Terms of Use
            </RegularLink>
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
              href="https://discord.gg/bbjtNx3zFj"
              newWindow
              css={{ mr: "$3", flexShrink: 0 }}
            >
              <Flex color="text" css={{ mr: "$2" }}>
                <DiscordLogo size="24px" weight="fill" />
              </Flex>
              Discord
            </RegularLink>
            <RegularLink
              href="https://community.vanilladefi.com/"
              newWindow
              css={{ mr: "$3", flexShrink: 0 }}
            >
              <Flex color="text" css={{ mr: "$2" }}>
                <Notebook size="24px" weight="fill" />
              </Flex>
              Forum
            </RegularLink>
            <RegularLink
              href="https://t.me/vanilladefi"
              newWindow
              css={{ mr: "$3", flexShrink: 0 }}
            >
              <Flex color="text" css={{ mr: "$2" }}>
                <TelegramLogo size="24px" weight="fill" />
              </Flex>
              Telegram
            </RegularLink>
            <RegularLink
              href="https://www.twitter.com/vanilladefi"
              newWindow
              css={{ mr: "$3", flexShrink: 0 }}
            >
              <Flex color="text" css={{ mr: "$2" }}>
                <TwitterLogo size="24px" weight="fill" />
              </Flex>
              Twitter
            </RegularLink>
            <RegularLink
              href="https://www.github.com/vanilladefi"
              newWindow
              css={{ mr: "$3", flexShrink: 0 }}
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
                textAlign: "left",
                width: "100%",
                "@md": {
                  textAlign: "right",
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
