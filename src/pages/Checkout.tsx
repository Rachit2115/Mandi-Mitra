import React, { useState } from "react";
import SuccessAnimation from "../components/checkout/SuccessAnimation";

const Checkout: React.FC = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    card: "",
    address: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (!form.name || !form.email || !form.card || !form.address) {
      setError("Please fill all fields.");
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (form.card.length < 8) {
      setError("Invalid card number.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setOrderPlaced(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-mandi-mitra p-4">
      <div className="bg-white/80 rounded-2xl shadow-glass p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-gradient-festival bg-clip-text">Checkout</h2>
        {orderPlaced ? (
          <div className="flex flex-col items-center">
            <SuccessAnimation />
            <h3 className="text-xl font-bold mt-4 text-green-700">Order Placed Successfully!</h3>
            <p className="mt-2 text-gray-700">Thank you for your order. You can track your order from your dashboard.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              name="card"
              placeholder="Card Number"
              value={form.card}
              onChange={handleChange}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              name="address"
              placeholder="Delivery Address"
              value={form.address}
              onChange={handleChange}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {error && <span className="text-red-500 text-sm">{error}</span>}
            <button
              type="submit"
              className="mt-2 py-2 px-4 rounded bg-gradient-festival text-white font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Place Order
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Checkout;
