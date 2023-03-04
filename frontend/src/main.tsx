import "./polyfills";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WagmiConfig, createClient } from "wagmi";
import { mainnet, polygon, polygonMumbai } from "wagmi/chains";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import Layout from "./Layout";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";

const client = createClient(
  getDefaultClient({
    appName: "DALL-E 2 NFT",
    chains: [polygon, mainnet, polygonMumbai],
  })
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ChakraProvider theme={theme}>
        <ConnectKitProvider theme="midnight">
          <Layout>
            <App />
          </Layout>
        </ConnectKitProvider>
      </ChakraProvider>
    </WagmiConfig>
  </React.StrictMode>
);
