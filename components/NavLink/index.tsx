import Link from "next/link";
import { useRouter } from "next/router";
import type * as Stitches from "@stitches/react";

import Text from "../Text";

const NavLink: React.FC<{ href: string; css?: Stitches.CSS }> = ({
  href,
  css,
  children,
}) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  return (
    <Link href={href} passHref>
      <Text
        as="a"
        css={{
          display: "flex",
          fontFamily: "$heading",
          color: isActive ? "$text" : "$muted",
          textDecoration: "none",
          textTransform: "uppercase",
          borderBottom: "1px solid",
          py: "$5",
          fontSize: "$md",
          alignItems: "center",
          borderColor: isActive ? "$muted" : "transparent",
          "&:hover": {
            color: "$text",
          },
          ...css,
        }}
      >
        {children}
      </Text>
    </Link>
  );
};

export default NavLink;
