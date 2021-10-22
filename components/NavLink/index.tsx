import { Text, ThemeUIStyleObject } from "theme-ui";
import Link from "next/link";
import { useRouter } from "next/router";

const NavLink: React.FC<{ href: string; sx?: ThemeUIStyleObject }> = ({
  href,
  sx,
  children,
}) => {
  const router = useRouter();

  const isActive = router.pathname === href;
  return (
    <Link href={href} passHref>
      <Text
        as="a"
        sx={{
          display: "flex",
          fontSize: 3,
          fontFamily: "heading",
          color: isActive ? "text" : "muted",
          textDecoration: "none",
          textTransform: "uppercase",
          borderBottom: "1px solid",
          borderColor: isActive ? "muted" : "transparent",
          ":hover": {
            color: "text",
          },
          ...sx,
        }}
      >
        {children}
      </Text>
    </Link>
  );
};

export default NavLink;
