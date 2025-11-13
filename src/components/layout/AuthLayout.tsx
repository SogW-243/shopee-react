// 📄 File: src/components/layout/AuthLayout.tsx

import React from "react";
import { Box, Container, Typography, Link, Paper } from "@mui/material";
import Grid from "@mui/material/Grid"; // Đảm bảo import Grid
// Import Footer chung
import Footer from "./Footer";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 1. AUTH HEADER */}
      <Box sx={{ bgcolor: "white", py: 2, boxShadow: 1 }}>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, md: 2 },
            }} // Giảm gap trên mobile
            onClick={() => (window.location.href = "/")}
          >
            {/* Logo Shopee */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}
            >
              <Box
                component="img"
                src="/assets/logo-shopee.png"
                alt="Shopee Logo"
                sx={{ height: { xs: 30, md: 40 }, width: "auto" }} // Logo nhỏ hơn trên mobile
              />
              <Typography
                variant="h4"
                sx={{
                  color: "primary.main",
                  fontWeight: 500,
                  lineHeight: 1,
                  fontSize: { xs: "1.5rem", md: "2.125rem" }, // Chữ nhỏ hơn trên mobile
                }}
              >
                Shopee
              </Typography>
            </Box>

            {/* Tiêu đề trang (Đăng ký/Đăng nhập) */}
            <Typography
              variant="h5"
              sx={{
                color: "#222",
                mt: { xs: 0.5, md: 1 },
                fontSize: { xs: "1.1rem", md: "1.5rem" }, // Chữ nhỏ hơn trên mobile
              }}
            >
              {title}
            </Typography>
          </Box>

          {/* Link Help */}
          <Link
            href="#"
            underline="none"
            color="primary"
            sx={{ fontSize: "0.875rem", display: { xs: "none", sm: "block" } }} // Ẩn trên mobile quá nhỏ
          >
            Bạn cần giúp đỡ?
          </Link>
        </Container>
      </Box>

      {/* 2. AUTH BODY (Chứa Banner và Form) */}
      <Box
        sx={{
          bgcolor: "primary.main",
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          // (Tùy chọn) Bạn có thể thêm ảnh nền mờ cho mobile ở đây nếu muốn
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 2, md: 5 } }}>
          {" "}
          {/* Giảm padding trên mobile */}
          <Grid container alignItems="center" justifyContent="center">
            {/* Cột trái: Banner (Chỉ hiện trên Desktop - md trở lên) */}
            <Grid
              size={{ md: 7 }}
              sx={{ display: { xs: "none", md: "block" }, textAlign: "center" }}
            >
              <Box
                component="img"
                src="/assets/auth-banner.png"
                alt="Shopee Auth Banner"
                sx={{ maxWidth: "100%", height: "auto" }}
              />
            </Grid>

            {/* Cột phải: Form Container (Full width trên mobile) */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 3, md: 4 }, // Padding nhỏ hơn trên mobile
                  borderRadius: "4px",
                  width: "100%",
                  maxWidth: 400,
                  mx: "auto", // Căn giữa
                }}
              >
                {children}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 3. FOOTER */}
      <Footer />
    </Box>
  );
}

export default AuthLayout;
