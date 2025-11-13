// 📄 File: src/App.tsx

import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/layout/header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";

// Tạo một layout riêng cho các trang chính (có Header/Footer đầy đủ)
const MainLayout = () => (
  <>
    <Header />
    <main>
      <Outlet /> {/* Đây là nơi HomePage sẽ được render */}
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Routes>
      {/* 1. Các trang dùng MainLayout (có Header/Footer chính) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>

      {/* 2. Các trang KHÔNG dùng MainLayout (tự quản lý layout riêng) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
