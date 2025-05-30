import { okto } from '@okto_web3/wagmi-adapter';
import {
  cookieStorage,
  createConfig,
  createStorage,
  http,
} from 'wagmi';
import { baseSepolia } from 'wagmi/chains';

// Okto Parameters
// These are the environment variables that you need to set in your .env file
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const OKTO_CLIENT_PRIVATE_KEY = import.meta.env.VITE_OKTO_CLIENT_PRIVATE_KEY;
const OKTO_CLIENT_SWA = import.meta.env.VITE_OKTO_CLIENT_SWA;

// wagmi config
export const config =  createConfig({
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
    transports: {
      [baseSepolia.id]: http(),
    },
  });