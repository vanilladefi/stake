/** @jsxImportSource theme-ui */
import type { NextPage } from "next";
import { SVGProps } from "react";
import { Container, Heading } from "theme-ui";

const Diamond: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 280 397"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
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
          <stop offset={1} stopColor="#10070F" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const Home: NextPage = () => {
  return (
    <Container>
      <main sx={{ position: "relative" }}>
        <Diamond
          width="280px"
          height="340px"
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <Heading
          as="h1"
          sx={{
            margin: "auto",
            fontSize: 9,
            py: 6,
            textAlign: "center",
            maxWidth: "layoutPlus",
            position: "relative",
            zIndex: 10,
          }}
        >
          The world&apos;s first decentralised asset manager.
        </Heading>
      </main>
    </Container>
  );
};

export default Home;
