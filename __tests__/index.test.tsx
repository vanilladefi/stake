import { customRender as render, screen } from "../test-utils";
import Home from "../pages/index";

it("renders tagline", () => {
  render(<Home />);

  const heading = screen.getByRole("heading", {
    name: /Decentralized Asset Manager for Web3/i,
  });

  expect(heading).toBeInTheDocument();
});
