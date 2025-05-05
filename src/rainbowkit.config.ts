
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { getOktoSdkConnector, OktoParameters } from "@okto_web3/wagmi-adapter";
import { baseSepolia } from "wagmi/chains";
import { createConfig, http } from "wagmi";

const oktoParams: OktoParameters = {
  environment: import.meta.env.VITE_OKTO_ENVIRONMENT,
  clientPrivateKey: import.meta.env.VITE_OKTO_CLIENT_PRIVATE_KEY,
  clientSWA: import.meta.env.VITE_OKTO_CLIENT_SWA,
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
} as OktoParameters;

// custom connector for the wallets
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
    projectId: "xxx",   // replate with walletConnect project id if using walletConnect
  }
);

// wagmi config
export const config = createConfig({
  connectors,
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
});
