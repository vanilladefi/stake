import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "urql";
import { ThemeProvider } from "next-themes";
import client from "../urql";
import { darkTheme } from "../stitches.config";

export const AllTheProviders: FC = ({ children }) => {
  return (
    <Provider value={client}>
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
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export { customRender };
