import { LogOut, User } from 'lucide-react';
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode} from 'jwt-decode';
import { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
interface NavbarProps {
  user: any;
  setUser: (decoded: any) => void;  
  isSignedIn: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
  onDashboard: () => void;
  onBack: () => void;
}


export function Navbar({ isSignedIn, onSignIn, onSignOut, onDashboard, onBack, user , setUser }: NavbarProps) {

    useEffect(() => {
        const idToken = localStorage.getItem("googleIdToken");
        if(idToken) {
            const decoded = jwtDecode(idToken);
            setUser(decoded); // contains name, email, picture, etc.
            onSignIn();
        }
    })

    const handleGoogleLogin = async (credentialResponse: any) => {
        const idToken = credentialResponse.credential || "";
        if (idToken) {
          localStorage.setItem("googleIdToken", idToken);
          const decoded = jwtDecode(idToken);
          setUser(decoded); // contains name, email, picture, etc.
          onSignIn();
        }
      };
    
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-amber-600 cursor-pointer" onClick={onBack} >Buy Me a Coffee</h1>
          </div>
          <div className="flex items-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}