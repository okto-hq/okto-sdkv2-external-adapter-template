/** @format */

import { ConnectButton } from "@rainbow-me/rainbowkit";
interface NavbarProps {
  onDashboard: () => void;
  onBack: () => void;
}

export function Navbar({ onBack }: NavbarProps) {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1
              className="text-xl font-bold text-amber-600 cursor-pointer"
              onClick={onBack}
            >
              Buy Me a Coffee
            </h1>
          </div>
          <div className="flex items-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
