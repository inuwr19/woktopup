import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BackButton } from "../navigation/BackButton";
import { formatCurrency } from "../../utils/currency";
import axiosTest from "../../plugins/axios";
import { CheckCircle, XCircle, Hourglass } from "lucide-react";

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        callbacks: {
          onSuccess: (result: any) => void;
          onPending: (result: any) => void;
          onError: (result: any) => void;
        }
      ) => void;
    };
  }
}

interface OrderSummaryProps {
  user: string;
  subtotal: number;
  gameName: string;
  productName: string;
  price: number;
  accountId: string;
  voucherCode?: string;
  discount?: number;
  status: string;
  orderStatus: string;
  paymentStatus: string;
}

export const OrderSummary = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<OrderSummaryProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      console.error("Order ID is missing");
      navigate("/");
      return;
    }

    const fetchOrderData = async () => {
      try {
        const response = await axiosTest.get(`/orders/${orderId}`);
        const data = response.data;
        console.log("Order response:", response);
        console.log("Order data:", response.data);

        const orderSummary: OrderSummaryProps = {
          user: data.user?.name || "-",
          subtotal: parseFloat(data.total_price),
          gameName: data.product?.game?.name || "-",
          productName: data.product?.name || "-",
          price: parseFloat(data.product?.price) || 0,
          accountId: data.game_account_id,
          voucherCode: data.voucher?.code || undefined,
          discount: data.voucher?.discount || undefined,
          status: data.status,
          orderStatus: data.status,
          paymentStatus: data.payment?.status || data.status,
        };
        setOrderData(orderSummary);
      } catch (error) {
        console.error("Error fetching order data:", error);
        navigate("/checkout");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId, navigate]);

  if (loading) return <div>Loading...</div>;
  if (!orderData) return <div>Error: Order data could not be loaded.</div>;

  const {
    user,
    subtotal,
    gameName,
    productName,
    price,
    accountId,
    voucherCode,
    discount,
    paymentStatus,
  } = orderData;

  const handleConfirmPayment = async () => {
    try {
      const response = await axiosTest.post("/payment/create", {
        order_id: parseInt(orderId!),
      });
      const snapToken = response.data.token;

      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute(
        "data-client-key",
        import.meta.env.VITE_MIDTRANS_CLIENT_KEY
      );
      document.body.appendChild(script);

      script.onload = () => {
        window.snap.pay(snapToken, {
          onSuccess: async (result: any) => {
            alert("Payment successful!");
            await axiosTest.post(`/payments/handle-notification`, { result });

            // Alihkan ke halaman invoice
            navigate(`/invoice/${orderId}`);
          },
          onPending: (result: any) => {
            axiosTest
              .post(`/payments/handle-notification`, {
                result,
                override_status: "pending",
              })
              .then(() => {
                alert("Payment is pending. Please complete the payment.");
                navigate("/orders");
              });
          },
          onError: (result: any) => {
            axiosTest
              .post(`/payments/handle-notification`, {
                result,
                override_status: "failed",
              })
              .then(() => {
                alert("Payment failed. Please try again.");
                navigate("/orders");
              });
          },
          // onClose: () => {
          //   // Jika user menutup popup tanpa menyelesaikan
          //   navigate("/orders");
          // },
        });
      };
    } catch (error) {
      console.error("Failed to initialize payment:", error);
    }
  };

  const renderStatusIcon = () => {
    switch (paymentStatus) {
      case "settlement":
        return (
          <div className="text-green-500 flex flex-col items-center mb-6">
            <CheckCircle size={64} />
            <p className="mt-2 text-lg font-semibold">Payment Success</p>
          </div>
        );
      case "pending":
        return (
          <div className="text-yellow-500 flex flex-col items-center mb-6">
            <Hourglass size={64} />
            <p className="mt-2 text-lg font-semibold">Payment Pending</p>
          </div>
        );
      case "failed":
      case "expire":
      case "cancel":
        return (
          <div className="text-red-500 flex flex-col items-center mb-6">
            <XCircle size={64} />
            <p className="mt-2 text-lg font-semibold">Payment Failed</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton label="Back to Checkout" />
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6">
          {renderStatusIcon()}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Order Summary
          </h1>

          <div className="mb-6 space-y-4">
            <SummaryItem label="Buyer" value={user} />
            <SummaryItem label="Game Name" value={gameName} />
            <SummaryItem label="Product" value={productName} />
            <SummaryItem label="Price" value={formatCurrency(price)} />
            <SummaryItem label="Account ID" value={accountId} />
            {voucherCode && (
              <SummaryItem label="Voucher Code" value={voucherCode} />
            )}
            {discount && (
              <SummaryItem
                label="Amount Discount"
                value={formatCurrency(discount)}
              />
            )}
          </div>

          <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <SummaryItem
              label="Total"
              value={formatCurrency(subtotal)}
              isTotal
            />
          </div>

          {paymentStatus !== "settlement" && (
            <div className="mt-6">
              <button
                onClick={handleConfirmPayment}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-500 transition-colors"
              >
                Pay Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SummaryItem = ({
  label,
  value,
  isTotal,
}: {
  label: string;
  value: string;
  isTotal?: boolean;
}) => (
  <div
    className={`flex justify-between ${isTotal ? "font-medium text-lg" : ""}`}
  >
    <span
      className={`text-gray-600 dark:text-gray-300 ${
        isTotal ? "font-semibold text-gray-900 dark:text-white" : ""
      }`}
    >
      {label}
    </span>
    <span
      className={`text-gray-900 dark:text-white ${
        isTotal ? "font-semibold text-gray-900 dark:text-white" : ""
      }`}
    >
      {value}
    </span>
  </div>
);
