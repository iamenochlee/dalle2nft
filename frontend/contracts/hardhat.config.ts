import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("hardhat-abi-exporter");

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "localhost",
  abiExporter: {
    path: "../frontend/constants/",
    runOnCompile: false,
    clear: true,
    flat: true,
    only: ["NFT"],
    spacing: 2,
    format: "json",
  },
};

export default config;
