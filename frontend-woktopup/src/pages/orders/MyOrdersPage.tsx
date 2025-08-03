import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosTest from "../../plugins/axios";
import { formatCurrency } from "../../utils/currency";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface OrderItem {
  id: number;
  productName: string;
  gameName: string;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export const MyOrdersPage = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosTest.get("/history-orders/user");
        const mapped = res.data.map((o: any) => ({
          id: o.id,
          productName: o.product?.name || "-",
          gameName: o.product?.game?.name || "-",
          totalPrice: parseFloat(o.total_price),
          status: o.status,
          createdAt: new Date(o.created_at).toLocaleString("id-ID"),
        }));
        setOrders(mapped);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "settlement":
      case "success":
        return (
          <span className="flex items-center text-green-600 font-medium text-sm">
            <CheckCircle className="w-4 h-4 mr-1" /> Success
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center text-yellow-600 font-medium text-sm">
            <Clock className="w-4 h-4 mr-1" /> Pending
          </span>
        );
      case "failed":
      case "cancel":
      case "expire":
        return (
          <span className="flex items-center text-red-600 font-medium text-sm">
            <XCircle className="w-4 h-4 mr-1" /> Failed
          </span>
        );
      default:
        return (
          <span className="text-gray-500 font-medium text-sm">
            {status.toUpperCase()}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-gray-700 dark:text-gray-300">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 mx-32 my-5">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          You have no orders yet.
        </p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => navigate(`/orders/${order.id}`)}
              className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                {/* Left: info + invoice button */}
                <div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    {order.productName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {order.gameName}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {order.createdAt}
                  </p>

                  {order.status === "settlement" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/invoice/${order.id}`);
                      }}
                      className="mt-3 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-sm"
                    >
                      Lihat Invoice
                    </button>
                  )}
                </div>

                {/* Right: total + status */}
                <div className="text-right">
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
                    {formatCurrency(order.totalPrice)}
                  </p>
                  {renderStatus(order.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
