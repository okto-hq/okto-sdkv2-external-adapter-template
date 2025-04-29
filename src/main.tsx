import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { okto } from '@okto_web3/wagmi-adapter';
import {
  WagmiProvider,
  cookieStorage,
  createConfig,
  createStorage,
  http,
} from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Load environment variables
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const OKTO_CLIENT_PRIVATE_KEY = import.meta.env.VITE_OKTO_CLIENT_PRIVATE_KEY;
const OKTO_CLIENT_SWA = import.meta.env.VITE_OKTO_CLIENT_SWA;

// Create wagmi config
const config =  createConfig({
    chains: [baseSepolia],
    connectors: [
      okto({
        environment: 'sandbox',
        clientPrivateKey: OKTO_CLIENT_PRIVATE_KEY,
        clientSWA: OKTO_CLIENT_SWA,
        googleClientId: GOOGLE_CLIENT_ID,
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [baseSepolia.id]: http(),
    },
  });

const queryClient = new QueryClient();

// Render the root app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </WagmiProvider>
  </StrictMode>
);
