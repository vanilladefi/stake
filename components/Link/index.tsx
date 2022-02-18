import NextLink from "next/link";
import { FC, AnchorHTMLAttributes } from "react";
import { styled } from "../../stitches.config";
interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
  text?: string;
  href?: string;
  prefetch?: boolean;
  scroll?: boolean;
}

const _Link: FC<Props> = ({
  external,
  text,
  children,
  href,
  prefetch,
  scroll,
  ...props
}) => {
  const externalProps = {
    target: external ? "_blank" : undefined,
    rel: external ? "noopener noreferrer" : undefined,
  };
  const A = (
    <a {...externalProps} {...props}>
      {text || children}
    </a>
  );
  if (!href) {
    return A;
  }
  return (
    <NextLink prefetch={prefetch} scroll={scroll} href={href} passHref>
      {A}
    </NextLink>
  );
};

const Link = styled(_Link, {
  display: "inline-flex",
  alignItems: "center",
  variants: {
    variant: {
      default: {
        color: "$link",
        fill: "$link",
        textDecoration: "none",
        "&:hover": {
          color: "$link",
          fill: "$link",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        },
      },
      subtle: {
        color: "$link",
        fill: "$link",
        textDecoration: "none",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export default Link;
