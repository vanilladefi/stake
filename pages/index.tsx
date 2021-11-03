import type { NextPage } from "next";
import Container from "../components/Container";
import Heading from "../components/Heading";
import Box from "../components/Box";
import { styled } from "../stitches.config";

const Diamond = (props: any) => (
  <svg
    viewBox="0 0 280 397"
    width="280px"
    height="397px"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      style={{ filter: "blur(30px)" }}
      d="M.512 254.714l139.27 141.357 139.27-141.357L139.782.73 70.147 127.722.512 254.714z"
      fill="url(#prefix__paint0_linear_232:18392)"
    />
    <path
      d="M.512 254.714l139.27 141.357 139.27-141.357L139.782.73 70.147 127.722.512 254.714z"
      fill="url(#prefix__paint0_linear_232:18392)"
    />
    <defs>
      <linearGradient
        id="prefix__paint0_linear_232:18392"
        x1={42.499}
        y1={609}
        x2={263.999}
        y2={39}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F0C24C" />
        <stop id="darkColor" offset={1} />
      </linearGradient>
    </defs>
  </svg>
);

const StyledDiamond = styled(Diamond, {
  position: "absolute",
  overflow: "visible",
  left: "50%",
  top: "50%",
  transform: "translateY(-50%) translateX(-50%)",
  width: "200px",
  "& #darkColor": {
    stopColor: "$colors$background",
  },
  "@lg": {
    width: "300px",
  },
});

const Home: NextPage = () => {
  return (
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
          The world&apos;s first decentralised asset manager.
        </Heading>
      </Box>
    </Container>
  );
};

export default Home;
