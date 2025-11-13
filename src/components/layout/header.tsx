// 📄 File: src/components/layout/header.tsx

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Container,
  Box,
  Link,
  InputBase,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Icons
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu"; // Icon menu cho mobile
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

// Data & Interface
import { CART_DATA } from "../../data/cart";

interface Product {
  id: string;
}
interface Shop {
  id: string;
  products: Product[];
}

const fetchCart = async (): Promise<Shop[]> => {
  const response = await fetch("http://localhost:3001/cart");
  if (!response.ok) throw new Error("Error fetching cart");
  return response.json();
};

function Header() {
  const searchTags = [
    "Áo Khoác",
    "Áo Sweater",
    "Phone-Browser",
    "Sạc Crocs",
    "Áo 4 Mùa",
    "Áo Khoác Đen",
    "iPhone 14 Pro Max",
    "Quần Dsquared2",
    "Nam Dơi",
  ];

  const menuItems = [
    { text: "Đăng Nhập", path: "/login" },
    { text: "Đăng Ký", path: "/register" },
    { text: "Thông Báo", path: "#" }, // Link tạm
    { text: "Hỗ Trợ", path: "#" }, // Link tạm
  ];

  const { data: cartData } = useQuery<Shop[], Error>({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  const cartItemCount =
    cartData?.reduce(
      (totalItems, shop) => totalItems + shop.products.length,
      0
    ) ?? 0;

  // State cho Menu Mobile (Drawer)
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Nội dung Menu Mobile
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, color: "primary.main" }}>
        Shopee
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            {/* 3. Dùng RouterLink để chuyển trang */}
            <ListItemButton
              component={RouterLink}
              to={item.path}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" color="primary" sx={{ boxShadow: "none" }}>
        <Container maxWidth="lg">
          {/* --- HÀNG 1: TOP BAR (Chỉ hiện trên Desktop) --- */}
          <Toolbar
            variant="dense"
            sx={{
              minHeight: 34,
              padding: "0 !important",
              display: { xs: "none", md: "flex" }, // 👈 Ẩn trên mobile
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
                fontSize: "0.875rem",
              }}
            >
              {/* Cụm trái */}
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <Link href="#" color="inherit" underline="none">
                  Kênh Người Bán
                </Link>
                <div
                  style={{
                    borderLeft: "1px solid rgba(255,255,255,0.22)",
                    height: "14px",
                  }}
                />
                <Link href="#" color="inherit" underline="none">
                  Tải ứng dụng
                </Link>
                <div
                  style={{
                    borderLeft: "1px solid rgba(255,255,255,0.22)",
                    height: "14px",
                  }}
                />
                <Typography variant="body2">Kết nối</Typography>
                <IconButton color="inherit" size="small" href="#">
                  <FacebookIcon fontSize="inherit" />
                </IconButton>
                <IconButton color="inherit" size="small" href="#">
                  <InstagramIcon fontSize="inherit" />
                </IconButton>
              </Box>

              {/* Cụm phải */}
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <Link
                  href="#"
                  color="inherit"
                  underline="none"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <NotificationsNoneIcon fontSize="small" /> Thông Báo
                </Link>
                <Link
                  href="#"
                  color="inherit"
                  underline="none"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <HelpOutlineIcon fontSize="small" /> Hỗ Trợ
                </Link>
                <Link
                  component={RouterLink}
                  to="/register"
                  color="inherit"
                  underline="none"
                  sx={{ fontWeight: 600 }}
                >
                  Đăng Ký
                </Link>
                <div
                  style={{
                    borderLeft: "1px solid rgba(255,255,255,0.22)",
                    height: "14px",
                  }}
                />
                <Link
                  component={RouterLink}
                  to="/login"
                  color="inherit"
                  underline="none"
                  sx={{ fontWeight: 600 }}
                >
                  Đăng Nhập
                </Link>
              </Box>
            </Box>
          </Toolbar>

          {/* --- HÀNG 2: MAIN HEADER (Responsive) --- */}
          <Toolbar
            sx={{
              height: { xs: 60, md: 85 },
              padding: "0 !important",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* 1. Mobile Menu Icon (Chỉ hiện trên Mobile) */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            {/* 2. Logo */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: "none",
                color: "inherit",
                flexShrink: 0,
              }}
            >
              <img
                src="/assets/logo-shopee.png"
                alt="Shopee Logo"
                style={{ display: "block", width: 35, height: 35 }}
              />
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, display: { xs: "none", sm: "block" } }}
              >
                Shopee
              </Typography>
            </Box>

            {/* 3. Search Bar (Cải tiến Responsive) */}
            <Box
              sx={{ flexGrow: 1, mx: 2, display: { xs: "none", sm: "block" } }}
            >
              {" "}
              {/* Ẩn search trên mobile siêu nhỏ */}
              <Box
                sx={{
                  display: "flex",
                  bgcolor: "white",
                  borderRadius: "3px",
                  p: 0.5,
                  height: 40,
                  alignItems: "center",
                }}
              >
                <InputBase
                  placeholder="Tìm sản phẩm..."
                  fullWidth
                  sx={{ pl: 2, fontSize: "0.875rem" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ minWidth: 50, boxShadow: "none", borderRadius: "2px" }}
                >
                  <SearchIcon />
                </Button>
              </Box>
              {/* Search Tags (Chỉ hiện trên Desktop) */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 1.5,
                  mt: 0.5,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {searchTags.slice(0, 5).map(
                  (
                    tag // Chỉ hiện 5 tag đầu để đỡ vỡ
                  ) => (
                    <Link
                      href="#"
                      key={tag}
                      underline="none"
                      sx={{ color: "white", fontSize: "0.75rem" }}
                    >
                      {tag}
                    </Link>
                  )
                )}
              </Box>
            </Box>

            {/* 4. Cart Icon */}
            <Box sx={{ flexShrink: 0 }}>
              <IconButton color="inherit" component={RouterLink} to="/cart">
                <Badge
                  badgeContent={cartItemCount}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "white", // Hoặc điền mã hex: "#ea80fc"
                      color: "red", // Đổi màu chữ cho dễ đọc
                    },
                  }}
                >
                  <ShoppingCartOutlinedIcon sx={{ fontSize: "1.75rem" }} />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Menu Drawer cho Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer */}
      <Box sx={{ height: { xs: 60, md: 119 } }} />
    </>
  );
}

export default Header;
