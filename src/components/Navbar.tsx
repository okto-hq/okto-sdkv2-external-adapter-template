import { User } from "lucide-react";
import { useAccount, useConnect, useDisconnect, useChainId } from "wagmi";

const chainNameMap: Record<number, string> = {
  84532: "Base Sepolia",
};

export function Navbar() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();

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
                  <span className="text-gray-700 font-bold">
                    {chainNameMap[chainId] || `Chain ID: ${chainId}`}
                  </span>
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
              <button
                onClick={() => connect({ connector: connectors[0] })}
                disabled={isConnecting}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
