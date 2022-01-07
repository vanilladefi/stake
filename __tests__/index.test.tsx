// import { AllTheProviders } from "../utils/test-utils";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("Home page", () => {
  it("renders tagline", () => {
    render(<Home /> /*, { wrapper: AllTheProviders }*/);

    const heading = screen.getByRole("heading", {
      name: /Decentralized Asset Manager for Web3/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
