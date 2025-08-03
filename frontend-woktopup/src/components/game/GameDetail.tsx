/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Shield, CreditCard, Clock } from "lucide-react";
import { PriceCard } from "./PriceCard";
import { BackButton } from "../navigation/BackButton";
import axiosTest from "../../plugins/axios";
import { CheckoutForm } from "./CheckoutForm"; // Import CheckoutForm

interface TopUpOption {
  id: number;
  gameName: string;
  name: string;
  price: number;
}

interface Game {
  id: number;
  name: string;
  description: string;
  image: string;
  topupOptions: TopUpOption[];
}

export const GameDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [selectedOption, setSelectedOption] = useState<TopUpOption | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axiosTest.get(`/games/${id}`);
        const data = response.data;
        setGame({
          id: data.id,
          name: data.name,
          description: data.description,
          image: data.image,
          topupOptions: data.products.map((product: any) => ({
            id: product.id,
            gameName: data.name,
            name: product.name,
            price: product.price,
          })),
        });
      } catch (err) {
        setError("Failed to load game details. Please try again later.");
      }
    };

    fetchGameDetails();
  }, [id]);

  const generateTransactionId = () => {
    return `TRX-${Math.floor(Math.random() * 1000000000)}`;
  };

  const handleSubmitOrder = async (formData: any) => {
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        alert("You must be logged in to make a purchase.");
        return;
      }

      if (!selectedOption) {
        alert("Please select a top-up option.");
        return;
      }

      const transactionId = generateTransactionId();
      const totalPrice = finalPrice ?? selectedOption.price;

      const payload = {
        user_id: parseInt(userId, 10),
        product_id: selectedOption.id,
        game_account_id: formData.gameId,
        quantity: 1,
        total_price: Number(totalPrice),
        payment_method: "midtrans",
        status: "pending",
        transaction_id: transactionId,
        voucher_id: formData.voucher ? parseInt(formData.voucher, 10) : null,
      };

      const response = await axiosTest.post("/orders", payload);
      const orderId = response.data.id;

      if (!orderId) {
        alert("Failed to retrieve order ID. Please try again.");
        return;
      }

      navigate(`/summary/${orderId}`);
    } catch (error: any) {
      console.error("Order error:", error.response?.data || error.message);
      alert("Failed to process the order. Please try again.");
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-6">{error}</div>;
  }

  if (!game) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton label="Back to Games" />
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-64 sm:h-80">
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                {game.name}
              </h1>
              <p className="text-white/80">{game.description}</p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Feature
                icon={<Shield />}
                title="Secure"
                description="100% Safe Transaction"
              />
              <Feature
                icon={<CreditCard />}
                title="Payment"
                description="Multiple Methods"
              />
              <Feature
                icon={<Clock />}
                title="Instant"
                description="Fast Processing"
              />
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Select Amount
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {game.topupOptions.map((option) => (
                  <PriceCard
                    key={option.id}
                    option={option}
                    isSelected={selectedOption?.id === option.id}
                    onSelect={() => {
                      // console.log('Selected option:', option);
                      setSelectedOption(option);
                    }}
                  />
                ))}
              </div>
            </div>

            {selectedOption && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <CheckoutForm
                  gameName={game.name}
                  productName={selectedOption.name}
                  price={selectedOption.price}
                  onSubmit={handleSubmitOrder}
                  // onFinalPriceChange={setFinalPrice}
                  onFinalPriceChange={(updatedFinalPrice) => {
                    console.log(
                      "Final Price from CheckoutForm:",
                      updatedFinalPrice
                    ); // Debug
                    setFinalPrice(updatedFinalPrice);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
    {icon}
    <div>
      <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  </div>
);
