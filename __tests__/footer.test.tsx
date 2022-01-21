import { customRender as render, screen } from "../test-utils";
import Footer from "../components/Footer";
import { RouterContext } from "next/dist/shared/lib/router-context";

const mockRouter: any = {
  basePath: "",
  pathname: "/",
  route: "/",
  asPath: "/",
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};

it("renders footer links", () => {
  render(
    <RouterContext.Provider value={mockRouter}>
      <Footer />
    </RouterContext.Provider>
  );

  const erc20Link = screen.getByRole("link", {
    name: /\$VNL ERC-20 Contract on Etherscan/i,
  });
  expect(erc20Link).toBeInTheDocument();

  const routerScanLink = screen.getByRole("link", {
    name: /Vanilla Router on Etherscan/i,
  });
  expect(routerScanLink).toBeInTheDocument();

  const daoScanLink = screen.getByRole("link", {
    name: /VanillaDAO on Etherscan/i,
  });
  expect(daoScanLink).toBeInTheDocument();

  const bountyLink = screen.getByRole("link", {
    name: /Bug bounty/i,
  });
  expect(bountyLink).toBeInTheDocument();

  const termsLink = screen.getByRole("link", {
    name: /Terms of use/i,
  });
  expect(termsLink).toBeInTheDocument();

  const privacyLink = screen.getByRole("link", {
    name: /Privacy Policy/i,
  });
  expect(privacyLink).toBeInTheDocument();
});
