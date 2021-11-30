import type { NextPage } from "next";
import Container from "../components/Container";
import Heading from "../components/Heading";
import Box from "../components/Box";
import { styled } from "../stitches.config";

const Home: NextPage = () => {
  return (
    <Container>
      <Box as="main" css={{ position: "relative" }}>
        <Heading
          as="h1"
          css={{
            margin: "auto",
            py: "$32",
            textAlign: "center",
            maxWidth: "$5xl",
            position: "relative",
            zIndex: 10,
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
          Be part of the community
        </Heading>
      </Box>
    </Container>
  );
};

export default Home;
