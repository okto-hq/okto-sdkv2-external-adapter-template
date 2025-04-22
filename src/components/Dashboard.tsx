import { Wallet } from 'lucide-react';

interface DashboardProps {
  onBack: () => void;
  user: any;
}

export function Dashboard({ onBack , user }: DashboardProps) {
 

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-20">
      <div className="flex items-center space-x-6 mb-8">
        <img
          src={user.picture}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-amber-100"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-amber-100 mb-1">Current Balance</p>
            <h3 className="text-3xl font-bold">$0.00</h3>
          </div>
          <Wallet className="w-12 h-12 opacity-80" />
        </div>
      </div>

      <button
        onClick={onBack}
        className="w-full bg-gray-100 text-gray-700 rounded-lg px-6 py-3 font-medium hover:bg-gray-200 transition-colors duration-200"
      >
        Back to Support Page
      </button>
    </div>
  );
}