import { User } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useChainId,
  useSwitchChain,
} from "wagmi";

export function Navbar() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const connector0 = connectors[0];

  useEffect(() => {
    const ensureCorrectNetwork = async () => {
      if (isConnected && chainId !== 84532) {
        try {
          await switchChain({ chainId: 84532 });
        } catch (e) {
          console.warn("Network switch failed:", e);
        }
      }
    };

    ensureCorrectNetwork();
  }, [isConnected, chainId, switchChain]);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1
            className="text-xl font-bold text-amber-600 cursor-pointer"
          >
            Buy Me a Coffee
          </h1>
          <div className="flex items-center gap-4">
            {isConnected ? (
              <>
                <div className="flex items-center gap-2">
                  <User size={24} />
                  {!showNetworkDropdown ? (
                    <button
                      onClick={() => setShowNetworkDropdown(true)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Select Network
                    </button>
                  ) : (
                    <select
                      className="border px-2 py-1 rounded"
                      onChange={(e) =>
                        switchChain({ chainId: parseInt(e.target.value) })
                      }
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Choose network
                      </option>
                      {chains.map((chain) => (
                        <option key={chain.id} value={chain.id}>
                          {chain.name}
                        </option>
                      ))}
                    </select>
                  )}
                  <span className="text-gray-700">{address}</span>
                </div>
                <button
                  onClick={() => disconnect()}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Disconnect Wallet
                </button>
              </>
            ) : (
              <>
                {connector0 && (
                  <button
                    onClick={() => connect({ connector: connector0 })}
                    disabled={isConnecting}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                  >
                    {isConnecting
                      ? "Connecting..."
                      : `Connect with ${connector0.name}`}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
