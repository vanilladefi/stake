import { useState } from "react";
import { useColorMode, Box, Container, Flex } from "theme-ui";
import {
  ArrowSquareOut,
  DotsThreeVertical,
  Moon,
  Sun,
  X,
} from "phosphor-react";
import Image from "next/image";
import Link from "next/link";
import { useBreakpointIndex } from "@theme-ui/match-media";

import NavLink from "../NavLink";
import Wallet from "../Wallet";
import Stack from "../Stack";
import { transparentize } from "@theme-ui/color";

const DesktopNavigation = () => {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <Flex
      as="nav"
      sx={{
        borderBottom: "1px solid",
        borderBottomColor: "extraMuted",
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link href="/" passHref>
          <Box
            as="a"
            sx={{
              display: "flex",
              width: "27px",
              height: "37px",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/vanilla-logo-only.svg"
              alt="Vanilla logo"
              layout="fill"
            />
          </Box>
        </Link>

        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            mx: 4,
            display: "flex",
            flex: 1,
            flexShrink: 0,
          }}
        >
          <NavLink sx={{ py: 4 }} href="/">
            Predict
          </NavLink>
          <NavLink sx={{ py: 4 }} href="/subscribe">
            Subscribe
          </NavLink>
          <NavLink sx={{ py: 4 }} href="/community">
            Community
          </NavLink>
          <NavLink
            sx={{
              display: ["none", null, "flex"],
              py: 4,
              alignItems: "center",
            }}
            href="/trade"
          >
            Trade{" "}
            <ArrowSquareOut
              weight="bold"
              style={{ marginBottom: "3px", marginLeft: "5px" }}
              size="15px"
            />
          </NavLink>
          <Box
            color="muted"
            onClick={(e) => {
              setColorMode(colorMode === "light" ? "dark" : "light");
            }}
            sx={{
              display: "flex",
              marginLeft: "auto",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
            }}
          >
            {colorMode === "dark" ? (
              <Sun weight="bold" size="20px" />
            ) : (
              <Moon weight="bold" size="20px" />
            )}
          </Box>
        </Stack>
        <Wallet sx={{ marginLeft: "auto" }} />
      </Container>
    </Flex>
  );
};

const MobileNavigation = () => {
  const [colorMode, setColorMode] = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Flex
      as="nav"
      sx={{
        position: "relative",
        borderBottom: "1px solid",
        borderBottomColor: "extraMuted",
        backgroundColor: "background",
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link href="/" passHref>
          <Box
            as="a"
            sx={{
              display: "flex",
              width: "22px",
              height: "32px",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/vanilla-logo-only.svg"
              alt="Vanilla logo"
              layout="fill"
            />
          </Box>
        </Link>

        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            mx: 4,
            display: "flex",
            flex: 1,
            flexShrink: 0,
          }}
        >
          <NavLink sx={{ py: 3, fontSize: 0 }} href="/">
            Predict
          </NavLink>
          <NavLink sx={{ py: 3, fontSize: 0 }} href="/subscribe">
            Subscribe
          </NavLink>
        </Stack>
        <Box
          color="muted"
          sx={{ cursor: "pointer", ml: "auto", display: "flex" }}
          onClick={() => setIsOpen((curr) => !curr)}
        >
          {isOpen ? <X size="30px" /> : <DotsThreeVertical size="30px" />}
        </Box>
      </Container>
      <Box
        sx={{
          display: isOpen ? "flex" : "none",
          position: "absolute",
          flexDirection: "column",
          top: "calc(100% + 1px)",
          left: 0,
          right: 0,
          backgroundColor: transparentize("background", 0.4),
          zIndex: 999,
          borderBottom: "1px solid",
          borderColor: "extraMuted",
          backdropFilter: "blur(8px)",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flex: 1,
              flexShrink: 0,
              mb: 2,
            }}
          >
            <NavLink
              sx={{ py: 3, fontSize: 0, alignItems: "center" }}
              href="/community"
            >
              Community
            </NavLink>
            <NavLink
              sx={{
                fontSize: 0,
                py: 3,
                alignItems: "center",
              }}
              href="/faq"
            >
              Faq
            </NavLink>
            <NavLink
              sx={{
                fontSize: 0,
                py: 3,
                alignItems: "center",
              }}
              href="/trade"
            >
              Trade{" "}
              <ArrowSquareOut
                weight="bold"
                style={{ marginBottom: "3px", marginLeft: "5px" }}
                size="15px"
              />
            </NavLink>
            <Box
              color="muted"
              onClick={(e) => {
                setColorMode(colorMode === "light" ? "dark" : "light");
              }}
              sx={{
                display: "flex",
                marginLeft: "auto",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              {colorMode === "dark" ? (
                <Sun weight="bold" size="16px" />
              ) : (
                <Moon weight="bold" size="16px" />
              )}
            </Box>
          </Stack>

          <Wallet sx={{ marginLeft: "auto", pb: 3, width: "100%" }} />
        </Container>
      </Box>
    </Flex>
  );
};

const Navigation = () => {
  const breakpointIndex = useBreakpointIndex();
  return breakpointIndex > 2 ? <DesktopNavigation /> : <MobileNavigation />;
};

export default Navigation;
