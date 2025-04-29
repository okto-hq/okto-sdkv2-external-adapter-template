/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@rainbow-me/rainbowkit/styles.css";
import { getOktoSdkConnector, OktoParameters } from "@okto_web3/wagmi-adapter";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { createConfig, WagmiProvider, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

const oktoParams: OktoParameters = {
  environment: import.meta.env.VITE_OKTO_ENVIRONMENT,
  clientPrivateKey: import.meta.env.VITE_OKTO_CLIENT_PRIVATE_KEY,
  clientSWA: import.meta.env.VITE_OKTO_CLIENT_SWA,
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
} as OktoParameters;

console.log(oktoParams);

const connectors = connectorsForWallets(
  [
    {
      groupName: " Social Login",
      wallets: [
        getOktoSdkConnector({
          type: "google",
          params: oktoParams,
        }),
      ],
    },
  ],
  {
    appName: "Buy Me a Coffee",
    projectId: "63a6a2a698592d4e1529e8b63fc05d63",
  }
);

const config = createConfig({
  connectors,
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
