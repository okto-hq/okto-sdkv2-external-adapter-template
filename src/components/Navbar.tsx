/** @format */

import { LogOut, User } from "lucide-react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

interface NavbarProps {
  user: Record<string, any> | null;
  setUser: (decoded: Record<string, any>) => void;
  isSignedIn: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
  onDashboard: () => void;
  onBack: () => void;
}

export function Navbar({
  isSignedIn,
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
            {!isSignedIn ? (
              <GoogleLogin onSuccess={handleGoogleLogin} />
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <img
                    src={user?.picture}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium">{user?.name}</span>
                </div>
                <button
                  onClick={onSignOut}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </>
            )}

            {isConnected ? (
              <button
                onClick={() => disconnect()}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Disconnect Wallet
              </button>
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
