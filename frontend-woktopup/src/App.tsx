import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { AuthProvider } from "./components/auth/AuthContext";
import { GameDetail } from "./components/game/GameDetail";
import { OrderSummary } from "./components/checkout/OrderSummary";
import { MyOrdersPage } from "./pages/orders/MyOrdersPage";
import { InvoicePage } from "./pages/InvoicePage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

export function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/games/:id" element={<GameDetail />} />

              {/* Protected Routes */}
              <Route
                path="/summary/:orderId"
                element={
                  <ProtectedRoute>
                    <OrderSummary />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <MyOrdersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/invoice/:id"
                element={
                  <ProtectedRoute>
                    <InvoicePage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
