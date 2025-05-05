import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { rainbowWallet, injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { baseSepolia } from "wagmi/chains";
import { http, createConfig } from "wagmi";

// custom connector for the wallets
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [rainbowWallet, injectedWallet],
    },
  ],
  {
    appName: "Buy Me a Coffee",
    projectId: "xxx", // replate with walletConnect project id if using walletConnect
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
