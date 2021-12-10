import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, DotsThreeVertical, Moon, Sun, X } from "phosphor-react";
import { useEffect, useState } from "react";
import Box from "../Box";
import Container from "../Container";
import Stack from "../Stack";

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
        py: "$2",
      }}
    >
      <Container
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
            mx: "$5",
          }}
        >
          <ThemeChanger />
        </Stack>
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
        zIndex: 9999,
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
      </Container>
    </Box>
  );
};

const Navigation = () => {
  // const breakpointIndex = useBreakpointIndex();

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
