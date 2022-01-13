import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
// import { Provider } from "urql";
import { ThemeProvider } from "next-themes";
import { darkTheme } from "../stitches.config";
import "./mocks";
import "@testing-library/jest-dom";
// import { fetchingState } from "./urql-states";

export const AllTheProviders: FC = ({ children }) => {
  return (
    // <Provider value={fetchingState as any}>
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      value={{
        dark: darkTheme.className,
        light: "light",
      }}
    >
      {children}
    </ThemeProvider>
    // </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export { customRender };
export * from "@testing-library/react";
