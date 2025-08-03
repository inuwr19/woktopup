import React, { useEffect, useState } from "react";
import axiosTest from "../../plugins/axios";

interface CheckoutFormProps {
  gameName: string;
  productName: string;
  price: number;
  onSubmit: (formData: any) => void;
  onFinalPriceChange: (finalPrice: number) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  gameName,
  productName,
  price,
  onSubmit,
  onFinalPriceChange,
}) => {
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(price);
  const [voucherId, setVoucherId] = useState<number | null>(null);

  const handleApplyVoucher = async () => {
    try {
      const response = await axiosTest.post("/voucher/apply", {
        code: voucherCode,
      });

      const { id, discount } = response.data;
      setVoucherId(id);
      setDiscount(discount);

      const updatedFinalPrice = price - discount;
      setFinalPrice(updatedFinalPrice);
      onFinalPriceChange(updatedFinalPrice);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      alert("Invalid voucher code. Please try again.");
    }
  };

  useEffect(() => {
    onFinalPriceChange(finalPrice);
  }, [finalPrice]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget as HTMLFormElement);
      const data = {
        gameId: formData.get("gameId")?.toString().trim(),
        serverId: formData.get("serverId")?.toString().trim() || null,
        voucher: voucherId || null,
      };

      if (!data.gameId) {
        alert("Game ID is required.");
        return;
      }

      onSubmit(data);
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-4">Checkout for {gameName}</h2>

      <div className="mb-4">
        <label className="block mb-2">Game Account ID</label>
        <input
          type="text"
          name="gameId"
          className="w-full border rounded-lg p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Server ID (optional)</label>
        <input
          type="text"
          name="serverId"
          className="w-full border rounded-lg p-2"
          placeholder="Enter Server ID (optional)"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Voucher Code (optional)</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            name="voucher"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            className="flex-1 border rounded-lg p-2"
          />
          <button
            type="button"
            onClick={handleApplyVoucher}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
        <h3 className="font-medium text-gray-900 dark:text-white mb-1">
          Order Details
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{gameName}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {productName} - Rp {price.toLocaleString()}
        </p>
        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
          Original Price: Rp {price.toLocaleString()}
        </p>
        {discount > 0 && (
          <p className="text-sm font-medium text-green-600 dark:text-green-400">
            Discount Applied: Rp {discount.toLocaleString()}
          </p>
        )}
        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
          Final Price: Rp {finalPrice.toLocaleString()}
        </p>
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-500 transition-colors"
      >
        Confirm Purchase
      </button>
    </form>
  );
};
