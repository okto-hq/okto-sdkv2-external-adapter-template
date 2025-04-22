/** @format */

import { User } from "lucide-react";
import { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useChainId } from "wagmi";

interface NavbarProps {
  user: Record<string, any> | null;
  setUser: (decoded: Record<string, any>) => void;
  isSignedIn: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
  onDashboard: () => void;
  onBack: () => void;
}

const chainNameMap: Record<number, string> = {
  84532: "Base Sepolia",
  11155111: "Sepolia",
};

export function Navbar({
  onSignIn,
  onSignOut,
  onDashboard,
  onBack,
  user,
  setUser,
}: NavbarProps) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();

  const connector0 = connectors[0];
  const connector1 = connectors[1];

  useEffect(() => {
    const idToken = localStorage.getItem("googleIdToken");
    if (idToken) {
      const decoded = jwtDecode<Record<string, any>>(idToken);
      setUser(decoded);
      onSignIn();
    }
  }, [onSignIn, setUser]);

  const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential || "";
    if (idToken) {
      localStorage.setItem("googleIdToken", idToken);
      const decoded = jwtDecode<Record<string, any>>(idToken);
      setUser(decoded);
      onSignIn();
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1
            className="text-xl font-bold text-amber-600 cursor-pointer"
            onClick={onBack}
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
              <>
                {connector0 && (
                  <button
                    onClick={() => connect({ connector: connector0 })}
                    disabled={isConnecting}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                  >
                    {isConnecting ? "Connecting..." : `Connect with ${connector0.name}`}
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
