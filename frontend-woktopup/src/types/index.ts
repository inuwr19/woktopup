export interface Game {
  id: string;
  name: string;
  image: string;
  description: string;
  topupOptions: TopUpOption[];
}

export interface TopUpOption {
  id: number;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  gameName: string;
  amount: string;
  price: number;
}

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}