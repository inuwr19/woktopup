import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import axiosTest from "../../plugins/axios";

interface Transaction {
  id: number;
  game: string;
  amount: string;
  user: string;
  createdAt: string;
}

export const LatestTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axiosTest.get("/transactions/latest");
        setTransactions(res.data);
      } catch (err) {
        console.error("Failed to fetch latest transactions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="text-gray-700 dark:text-gray-300 p-4">Loading...</div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Latest Transactions
        </h2>
        <div className="grid gap-4">
          {transactions.map(({ id, game, amount, user, createdAt }) => (
            <div
              key={id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {game}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {amount}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-900 dark:text-white">{user}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(createdAt).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
