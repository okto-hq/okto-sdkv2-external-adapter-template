import { LogOut, User } from 'lucide-react';
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode} from 'jwt-decode';
import { useEffect } from 'react';
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
            {!isSignedIn ? (
                 <GoogleLogin
                 onSuccess={handleGoogleLogin}
                 size="large"
                 shape="rectangular"
               />
              
            ) : (
              <div className="relative group">
                <div className="flex items-center space-x-3 cursor-pointer">
                  <img
                    src={user?.picture}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700">{user.name}</span>
                </div>
                <div className="absolute right-0 top-full mt-1 w-48 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <button
                      onClick={onDashboard}
                      className="w-full px-4 py-2 flex items-center space-x-2 hover:bg-gray-50 transition-colors duration-200 text-gray-700"
                    >
                      <User className="w-4 h-4" />
                      <span>Dashboard</span>
                    </button>
                    <button
                      onClick={onSignOut}
                      className="w-full px-4 py-2 flex items-center space-x-2 hover:bg-gray-50 transition-colors duration-200 text-gray-700"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}