import { metaMask } from "wagmi/connectors";
import { baseSepolia } from "wagmi/chains";
import { createConfig, http, injected } from "wagmi";

// wagmi config
export const config = createConfig({
  chains: [baseSepolia],
  connectors: [metaMask(), injected()],
  transports: {
    [baseSepolia.id]: http(),
  },
});
