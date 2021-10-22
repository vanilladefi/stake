import { useColorMode, Box, Container, Flex } from "theme-ui";
import { Moon, Sun } from "phosphor-react";
import Image from "next/image";
import Link from "next/link";

import NavLink from "../NavLink";
import Wallet from "../Wallet";
import Stack from "../Stack";

const Navigation = () => {
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
          sx={{ alignItems: "center", mx: 4, display: "flex", flex: 1 }}
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
          <NavLink sx={{ py: 4 }} href="/trade">
            Trade
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

export default Navigation;
