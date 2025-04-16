import { useState } from 'react';
import { Coffee, X, Loader2, CheckCircle } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import './App.css'
import { googleLogout } from '@react-oauth/google';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState(5);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [ user , setUser ] = useState<any>(null);

  const predefinedAmounts = [3, 5, 10, 25];

  const handleSupport = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSuccess(true);
    // Reset and close modal after showing success
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSuccess(false);
    }, 1500);
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    googleLogout();
    localStorage.removeItem("googleIdToken");
    setIsSignedIn(false);
    setIsModalOpen(false);
    setShowDashboard(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Navbar
        isSignedIn={isSignedIn}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        onDashboard={() => setShowDashboard(true)}
        onBack={() => setShowDashboard(false)}
        user={user}
        setUser={setUser}
      />
      
      {showDashboard ? (
        <Dashboard onBack={() => setShowDashboard(false)} user={user}/>
      ) : (
        <div className="flex items-center justify-center p-4 pt-40">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <Coffee className="w-16 h-16 mx-auto text-amber-600 mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Support My Work</h1>
              <p className="text-gray-600 mb-8">
                If you enjoy my work, consider buying me a coffee ☕️
              </p>

              {isSignedIn && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-amber-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-amber-700 transition-colors duration-200"
                >
                  Support My Work
                </button>
              )}
            </div>

            {/* Support Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl p-6 max-w-sm w-full relative animate-fade-in">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  {isSuccess ? (
                    <div className="py-8 text-center">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Thank you!
                      </h2>
                      <p className="text-gray-600">
                        Your support means a lot to me! 🎉
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Choose Amount
                      </h2>

                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {predefinedAmounts.map((preset) => (
                          <button
                            key={preset}
                            onClick={() => setAmount(preset)}
                            className={`py-3 rounded-lg font-medium transition-colors duration-200 ${
                              amount === preset
                                ? 'bg-amber-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            ${preset}
                          </button>
                        ))}
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Custom Amount
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            $
                          </span>
                          <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            min="1"
                          />
                        </div>
                      </div>

                      <button
                        onClick={handleSupport}
                        disabled={isLoading}
                        className="w-full bg-amber-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-amber-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Processing...
                          </>
                        ) : (
                          `Support $${amount}`
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;