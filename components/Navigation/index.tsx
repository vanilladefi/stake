import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { DotsThreeVertical, Moon, Sun, X } from "phosphor-react";
import { useEffect, useState } from "react";
import Box from "../Box";
import Container from "../Container";
import NavLink from "../NavLink";
import Stack from "../Stack";
import WalletButton from "../Wallet";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Box
      onClick={() => {
        setTheme(theme && theme === "light" ? "dark" : "light");
      }}
      css={{
        display: "flex",
        width: "48px",
        height: "48px",
        marginLeft: "auto",
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "center",
        mb: "$1",
        color: "$muted",
      }}
    >
      {theme === "dark" ? (
        <Sun weight="bold" size="16px" />
      ) : (
        <Moon weight="bold" size="16px" />
      )}
    </Box>
  );
};

const DesktopNavigation = () => {
  const { theme } = useTheme();
  return (
    <Box
      as="nav"
      css={{
        display: "flex",
        color: "$text",
        borderBottom: "1px solid $extraMuted",
      }}
    >
      <Container
        css={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link href="/" passHref>
          <Box as="a" css={{ display: "block", marginTop: "5px", mr: "$4" }}>
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

        <Stack
          css={{
            alignItems: "center",
            mx: "$5",
            flex: 1,
            gap: "$8",
            flexShrink: 0,
          }}
        >
          <NavLink css={{ py: "$8" }} href="/">
            Home
          </NavLink>
          <NavLink css={{ py: "$8" }} href="/stake">
            stake
          </NavLink>
          {/* <NavLink css={{ py: "$8" }} href="/invest">
            Invest
            <ArrowUpRight
              weight="bold"
              style={{ marginBottom: "3px", marginLeft: "5px" }}
              size="15px"
            />
          </NavLink> */}
          <NavLink css={{ py: "$8" }} href="/litepaper">
            Litepaper
          </NavLink>
          <ThemeChanger />
        </Stack>
        <WalletButton css={{ marginLeft: "auto" }} />
      </Container>
    </Box>
  );
};

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  return (
    <Box
      as="nav"
      css={{
        display: "flex",
        position: "relative",
        borderBottom: "1px solid",
        borderBottomColor: "$extraMuted",
        backgroundColor: "$background",
        color: "$text",
        zIndex: 40,
      }}
    >
      <Container
        css={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link href="/" passHref>
          <Box as="a" css={{ display: "block", marginTop: "5px", mr: "$4" }}>
            {theme === "dark" ? (
              <Image
                alt="Vanilla Logo"
                src="/vanilla-logo.svg"
                height="25px"
                width="91px"
              />
            ) : (
              <Image
                alt="Vanilla Logo"
                src="/vanilla-logo-dark.svg"
                height="25px"
                width="91px"
              />
            )}
          </Box>
        </Link>

        <Stack
          css={{
            flexDirection: "row",
            alignItems: "center",
            display: "flex",
            flex: 1,
            flexShrink: 0,
            mx: "$5",
          }}
        ></Stack>
        <ThemeChanger />
        <Box
          color="muted"
          css={{
            color: "$muted",
            cursor: "pointer",
            ml: "auto",
            display: "flex",
          }}
          onClick={() => setIsOpen((curr) => !curr)}
        >
          {isOpen ? <X size="30px" /> : <DotsThreeVertical size="30px" />}
        </Box>
      </Container>
      <Box
        css={{
          display: isOpen ? "flex" : "none",
          position: "absolute",
          flexDirection: "column",
          top: "calc(100% + 1px)",
          left: 0,
          right: 0,
          zIndex: 999,
          backgroundColor: "$backgroundA",
          borderBottom: "1px solid $extraMuted",
          backdropFilter: "blur(8px)",
        }}
      >
        <Container
          css={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack
            css={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flex: 1,
              flexShrink: 0,
            }}
          >
            <NavLink css={{ py: "$3" }} href="/stake">
              Stake
            </NavLink>
            {/* <NavLink css={{ py: "$4" }} href="/invest">
              Invest
              <ArrowUpRight
                weight="bold"
                style={{ marginBottom: "3px", marginLeft: "5px" }}
                size="15px"
              />
            </NavLink> */}
            <NavLink css={{ py: "$3", alignItems: "center" }} href="/litepaper">
              Litepaper
            </NavLink>
          </Stack>

          <WalletButton css={{ marginLeft: "auto", pb: "$3", width: "100%" }} />
        </Container>
      </Box>
    </Box>
  );
};

const Navigation = () => {
  return (
    <>
      <Box
        css={{
          display: "block",
          "@lg": {
            display: "none",
          },
        }}
      >
        <MobileNavigation />
      </Box>
      <Box
        css={{
          display: "none",
          "@lg": {
            display: "block",
          },
        }}
      >
        <DesktopNavigation />
      </Box>
    </>
  );
};

export default Navigation;
