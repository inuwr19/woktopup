import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosTest from "../plugins/axios";
import { formatCurrency } from "../utils/currency";
import {
  FileText,
  User,
  Gamepad2,
  Calendar,
  CreditCard,
  BadgeCheck,
  Download,
  ArrowLeft,
} from "lucide-react";

export const InvoicePage = () => {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<any>(null);
  const navigate = useNavigate();

  const handleDownloadPDF = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/invoices/${id}/download`,
      "_blank"
    );
  };

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axiosTest.get(`/invoices/${id}`);
        console.log("Invoice data:", res.data);
        setInvoice(res.data);
      } catch (err) {
        console.error("Failed to fetch invoice", err);
      }
    };
    fetchInvoice();
  }, [id]);

  if (!invoice) return <div className="p-4">Loading invoice...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="text-indigo-600" />
            Invoice #{invoice.invoice_code}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-sm font-medium"
            >
              <Download size={16} />
              Download PDF
            </button>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-3 py-1.5 rounded-md text-sm font-medium"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3">
          <InfoRow
            icon={<User />}
            label="Customer"
            value={invoice.order?.user?.name || "-"}
          />
          <InfoRow
            icon={<Gamepad2 />}
            label="Game"
            value={invoice.order?.product?.game?.name || "-"}
          />
          <InfoRow
            icon={<Calendar />}
            label="Date"
            value={
              invoice.generated_at
                ? new Date(invoice.generated_at).toLocaleString("id-ID")
                : "-"
            }
          />
          <InfoRow
            icon={<CreditCard />}
            label="Payment Method"
            value={invoice.order?.payment_method || "-"}
          />
          <InfoRow
            icon={<BadgeCheck />}
            label="Status"
            value={invoice.order?.status?.toUpperCase() || "-"}
          />
        </div>

        {/* Order Detail */}
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Order Detail
          </h2>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Product</span>
            <span className="text-gray-900 dark:text-white">
              {invoice.order?.product?.name || "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Amount</span>
            <span className="text-gray-900 dark:text-white">
              {formatCurrency(invoice.order?.total_price || 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
    <span className="text-indigo-500">{icon}</span>
    <span className="w-32 font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);
