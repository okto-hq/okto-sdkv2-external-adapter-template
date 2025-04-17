import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createConfig, WagmiProvider } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { rainbowWallet, injectedWallet } from '@rainbow-me/rainbowkit/wallets';
import { http } from 'wagmi';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [rainbowWallet, injectedWallet],
    },
  ],
  {
    appName: 'Buy Me a Coffee',
    projectId: 'PROJECT_ID',
  }
);

const config = createConfig({
    connectors,
    chains: [baseSepolia],
    transports: {
        [baseSepolia.id]: http()
    }
});

const queryClient = new QueryClient();

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
           <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <App />
           </GoogleOAuthProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
