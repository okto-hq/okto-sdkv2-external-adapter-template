import { useEffect, useState } from "react";
import { Coffee, X, Loader2, CheckCircle, Copy } from "lucide-react";
import { Navbar } from "./components/Navbar";
import "./App.css";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";
import { parseEther } from "viem";
import { useChainId } from "wagmi";
import { useSwitchChain } from "wagmi";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toAddress, setToAddress] = useState(
    "0x8aaf1F5A168EE78D1b96df345eCaf0098607B8F6"
  );
  const [amount, setAmount] = useState(0.0005);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();

  //check if the user is connected to the wallet
  const { isConnected } = useAccount();

  //functions to send the transaction to the address with the amount specified
  const {
    data: hash,
    isPending,
    sendTransaction,
    error,
  } = useSendTransaction();

  //wait for the transaction to be confirmed once the hash is received
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  //predefined amounts for the tips
  const predefinedAmounts = [1, 3, 5, 10];
  const predefinedAmountsInEther = [0.0005, 0.001, 0.002, 0.005];

  //handle the support button click
  //this function will send the transaction to the address with the amount specified
  const handleSupport = async () => {
    if (chainId !== 84532) {
      try {
        console.log("Current chainId:", chainId);
        switchChain({ chainId: 84532 }); // Trigger switch
      } catch (error) {
        alert("Network switch to Base Sepolia failed or was rejected.");
        return;
      }
    }

    setIsLoading(true);
    try {
      sendTransaction({
        to: toAddress as `0x${string}`,
        value: parseEther(amount.toString()),
      });
    } catch (error) {
      console.error("Transaction error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      setIsSuccess(true);

      // Close modal and reset values after showing success message
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
      }, 5000);
    }
  }, [isConfirmed]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("0x8aaf1F5A168EE78D1b96df345eCaf0098607B8F6");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Navbar/>
        <div className="flex items-center justify-center p-4 pt-40">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <Coffee className="w-16 h-16 mx-auto text-amber-600 mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Support My Work
              </h1>
              <p className="text-gray-600 mb-2">
                If you enjoy my work, consider buying me a coffee ☕️
              </p>
              <div className="flex flex-col items-center gap-2 mb-8">
                <p className="text-md text-gray-500">Send funds to:</p>
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                  <span className="font-mono text-sm">
                    {"0x8aaf1F5A168EE78D1b96df345eCaf0098607B8F6"}
                  </span>
                  <button
                    onClick={handleCopyAddress}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="Copy address"
                  >
                    {isCopied ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              {isConnected && (
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

                      {/* buttons for the predefined amounts */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {predefinedAmounts.map((preset, index) => (
                          <button
                            key={preset}
                            onClick={() =>
                              setAmount(predefinedAmountsInEther[index])
                            }
                            className={`py-3 rounded-lg font-medium transition-colors duration-200 ${
                              amount === predefinedAmountsInEther[index]
                                ? "bg-amber-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {predefinedAmountsInEther[index]} (~${preset})
                          </button>
                        ))}
                      </div>

                      {/* input for the custom amount */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Custom Amount
                        </label>
                        <div className="relative">
                          <span className="absolute w-fit left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            ETH
                          </span>
                          <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            min="1"
                          />
                        </div>
                      </div>

                      <button
                        onClick={handleSupport}
                        disabled={isLoading || isPending}
                        className="w-full bg-amber-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-amber-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isLoading || isPending ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Processing...
                          </>
                        ) : (
                          `Support ${amount} ETH`
                        )}
                      </button>
                      {error && (
                        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                          Error:{" "}
                          {(error as BaseError).shortMessage || error.message}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}

export default App;
