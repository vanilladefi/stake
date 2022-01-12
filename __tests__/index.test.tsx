import { customRender as render, screen } from "../test-utils";
import Home from "../pages/index";

it("renders tag lines and links", () => {
  render(<Home />);

  const heading = screen.getByRole("heading", {
    name: /Decentralized Asset Manager for Web3/i,
  });
  expect(heading).toBeInTheDocument();

  const intro1 = screen.getByText(
    "Vanilla is an on-chain investment pool managed by the best investors."
  );
  expect(intro1).toBeInTheDocument();

  const earnLink = screen.getByRole("link", {
    name: "Stake $JUICE to earn rewards",
  });
  expect(earnLink).toBeInTheDocument();

  const investLink = screen.getByRole("link", {
    name: "Invest in Vanilla Pool",
  });
  expect(investLink).toBeInTheDocument();

  const getInformedHeading = screen.getByRole("heading", {
    name: "GET INFORMED, WIN $JUICE",
    level: 3,
  });
  expect(getInformedHeading).toBeInTheDocument();
  // skipping sub-lines

  const howItWorks = screen.getByRole("heading", {
    name: "HOW VANILLA WORKS",
    level: 3,
  });
  expect(howItWorks).toBeInTheDocument();

  const faqLink = screen.getByRole("link", {
    name: "Read the FAQ",
  });
  expect(faqLink).toBeInTheDocument();

  // skipping stake and invest headlines
  const stakingLink = screen.getByRole("link", {
    name: "Start staking",
  });
  expect(stakingLink).toBeInTheDocument();

  const investLink2 = screen.getByRole("link", {
    name: "Invest in pool",
  });
  expect(investLink2).toBeInTheDocument();

  const joinCommunity = screen.getByTestId("join-community");
  // .getByText("JOIN THE COMMUNITY");
  expect(joinCommunity).toHaveTextContent(/JOIN\s?THE COMMUNITY/);

  const joinDiscussionLink = screen.getByRole("link", {
    name: "Join the discussion",
  });
  expect(joinDiscussionLink).toBeInTheDocument();

  const daoLink = screen.getByRole("link", {
    name: "Read about VanillaDAO",
  });
  expect(daoLink).toBeInTheDocument();
});
