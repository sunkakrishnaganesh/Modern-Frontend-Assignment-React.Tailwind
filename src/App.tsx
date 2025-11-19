import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./features/products/ProductList";
import ProductDetails from "./features/products/ProductDetails";
import { CartProvider } from "./context/CartContext";
import ToastContainer from "./components/Toast";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <ToastContainer />
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
