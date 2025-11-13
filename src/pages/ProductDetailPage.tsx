// 📄 File: src/pages/ProductDetailPage/index.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Rating,
  Divider,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import QuantityInput from "../../components/common/QuantityInput";

// Import tất cả dữ liệu để tìm kiếm sản phẩm
import { DAILY_SUGGESTIONS_DATA } from "../../data/dailySuggestions";
import { FLASH_SALE_DATA } from "../../data/flashSaleProducts";
import { SHOPEE_MALL_DATA } from "../../data/shopeeMallProducts";
import { TOP_SEARCHES_DATA } from "../../data/topSearches";
import { CART_DATA } from "../../data/cart";

// Interface chuẩn cho sản phẩm hiển thị
interface ProductDetail {
  id: string;
  title: string;
  img: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  rating: number;
  sold: string;
}

// Interface cho Cart (để lưu vào localStorage)
interface CartProduct {
  id: string;
  name: string;
  image: string;
  variant: string;
  oldPrice: string;
  newPrice: string;
  quantity: number;
}
interface Shop {
  id: string;
  products: CartProduct[];
}

function ProductDetailPage() {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // 1. TÌM SẢN PHẨM DỰA TRÊN ID
  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi vào

    // Tìm trong Daily Suggestions
    let found: any = DAILY_SUGGESTIONS_DATA.find((p) => p.id === id);
    if (found) {
      setProduct({
        id: found.id,
        title: found.title,
        img: found.img,
        price: found.price,
        discount: found.discount,
        rating: 4.9,
        sold: "1.2k",
      });
      return;
    }

    // Tìm trong Flash Sale
    found = FLASH_SALE_DATA.find((p) => String(p.id) === id);
    if (found) {
      setProduct({
        id: String(found.id),
        title: "Sản phẩm Flash Sale (Demo)", // Dữ liệu gốc thiếu tên
        img: found.image,
        price: found.price,
        oldPrice: "200.000₫", // Giá giả định
        discount: found.discount,
        rating: 5.0,
        sold: found.soldLabel,
      });
      return;
    }

    // Tìm trong Top Searches
    found = TOP_SEARCHES_DATA.find((p) => String(p.id) === id);
    if (found) {
      setProduct({
        id: String(found.id),
        title: found.label,
        img: found.img,
        price: "Liên hệ", // Dữ liệu gốc thiếu giá
        rating: 4.5,
        sold: found.sold,
      });
      return;
    }

    // Tìm trong Shopee Mall
    found = SHOPEE_MALL_DATA.find((p) => String(p.id) === id);
    if (found) {
      setProduct({
        id: String(found.id),
        title: "Sản phẩm Shopee Mall (Demo)",
        img: found.img,
        price: "Liên hệ",
        rating: 5.0,
        sold: "500+",
      });
      return;
    }
  }, [id]);

  // 2. LOGIC THÊM VÀO GIỎ HÀNG (Lưu localStorage)
  const addToCartMutation = useMutation({
    mutationFn: async (type: "add" | "buy") => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!product) return;

          let currentCart: Shop[] = JSON.parse(
            localStorage.getItem("shopee-cart") || "null"
          );
          if (!currentCart) currentCart = CART_DATA;

          const newProduct: CartProduct = {
            id: product.id,
            name: product.title,
            image: product.img,
            variant: "Phân Loại: Mặc định",
            oldPrice: product.oldPrice || product.price,
            newPrice: product.price,
            quantity: quantity, // Dùng số lượng đang chọn
          };

          // Mặc định thêm vào Shop 1
          const shopIndex = currentCart.findIndex((s) => s.id === "shop1");
          if (shopIndex > -1) {
            const existingProductIndex = currentCart[
              shopIndex
            ].products.findIndex((p) => p.id === newProduct.id);
            if (existingProductIndex > -1) {
              currentCart[shopIndex].products[existingProductIndex].quantity +=
                quantity;
            } else {
              currentCart[shopIndex].products.push(newProduct);
            }
          }

          localStorage.setItem("shopee-cart", JSON.stringify(currentCart));
          resolve(type);
        }, 300);
      });
    },
    onSuccess: (type) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // Cập nhật Header
      if (type === "add") {
        setSnackbarOpen(true);
      } else {
        navigate("/cart"); // Nếu là mua ngay thì chuyển sang giỏ hàng
      }
    },
  });

  const handleAddToCart = () => addToCartMutation.mutate("add");
  const handleBuyNow = () => addToCartMutation.mutate("buy");

  if (!product)
    return (
      <Box sx={{ p: 5, textAlign: "center" }}>
        Đang tải hoặc không tìm thấy sản phẩm...
      </Box>
    );

  return (
    <Box sx={{ bgcolor: "#f5f5f5", py: 3, minHeight: "80vh" }}>
      <Container maxWidth="lg">
        <Paper elevation={1} sx={{ p: 3 }}>
          <Grid container spacing={4}>
            {/* CỘT TRÁI: ẢNH */}
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src={product.img}
                sx={{
                  width: "100%",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  border: "1px solid #f0f0f0",
                  borderRadius: "2px",
                }}
              />
            </Grid>

            {/* CỘT PHẢI: THÔNG TIN */}
            <Grid item xs={12} md={7}>
              <Typography
                variant="h6"
                component="h1"
                sx={{ fontWeight: 500, mb: 2 }}
              >
                {product.title}
              </Typography>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    color: "#ee4d2d",
                    borderBottom: "1px solid #ee4d2d",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{
                      mr: 0.5,
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }}
                  >
                    {product.rating}
                  </Typography>
                  <Rating
                    value={product.rating}
                    precision={0.1}
                    size="small"
                    readOnly
                    sx={{ color: "#ee4d2d" }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  | 1.2k Đánh giá | {product.sold} Đã bán
                </Typography>
              </Box>

              {/* Giá */}
              <Box
                sx={{
                  bgcolor: "#fafafa",
                  p: 2,
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {product.oldPrice && (
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: "line-through",
                      color: "text.secondary",
                    }}
                  >
                    {product.oldPrice}
                  </Typography>
                )}
                <Typography
                  variant="h4"
                  sx={{ color: "primary.main", fontWeight: 500 }}
                >
                  {product.price}
                </Typography>
                {product.discount && (
                  <Typography
                    variant="caption"
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      px: 1,
                      borderRadius: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    {product.discount} GIẢM
                  </Typography>
                )}
              </Box>

              {/* Vận chuyển */}
              <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
                <Typography color="text.secondary" sx={{ width: 100 }}>
                  Vận Chuyển
                </Typography>
                <Typography>Miễn phí vận chuyển</Typography>
              </Box>

              {/* Chọn số lượng */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}
              >
                <Typography color="text.secondary" sx={{ width: 100 }}>
                  Số Lượng
                </Typography>
                <QuantityInput value={quantity} onChange={setQuantity} />
                <Typography color="text.secondary" variant="caption">
                  100 sản phẩm có sẵn
                </Typography>
              </Box>

              {/* Nút bấm */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<AddShoppingCartIcon />}
                  sx={{
                    borderColor: "primary.main",
                    color: "primary.main",
                    bgcolor: "rgba(238, 77, 45, 0.08)",
                    px: 3,
                    height: 48,
                    "&:hover": {
                      bgcolor: "rgba(238, 77, 45, 0.12)",
                      borderColor: "primary.main",
                    },
                  }}
                  onClick={handleAddToCart}
                >
                  Thêm Vào Giỏ Hàng
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    px: 5,
                    height: 48,
                    "&:hover": { bgcolor: "#d73211" },
                  }}
                  onClick={handleBuyNow}
                >
                  Mua Ngay
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Mô tả sản phẩm (Dummy) */}
        <Paper elevation={1} sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" sx={{ bgcolor: "#f5f5f5", p: 2, mb: 2 }}>
            MÔ TẢ SẢN PHẨM
          </Typography>
          <Typography
            variant="body2"
            sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}
          >
            Sản phẩm chất lượng cao, chính hãng.
            <br />
            - Chất liệu: Cao cấp
            <br />
            - Xuất xứ: Việt Nam
            <br />
            - Bảo hành: 12 tháng
            <br />
            Mua ngay để nhận ưu đãi hấp dẫn!
          </Typography>
        </Paper>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Sản phẩm đã được thêm vào Giỏ hàng
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ProductDetailPage;
