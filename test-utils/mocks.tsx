import { loadEnvConfig } from "@next/env";

const setupEnv = async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};

setupEnv()

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

export const mocked = true;
