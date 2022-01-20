/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@vanilladefi/trade-contracts",
  "@vanilladefi/trade-sdk",
]); // pass the modules you would like to see transpiled

module.exports = withTM({
  reactStrictMode: true,
  /* experimental: {
    concurrentFeatures: true,
    serverComponents: true
  }, */
  images: {
    formats: ["image/avif", "image/webp"],
  },
});
