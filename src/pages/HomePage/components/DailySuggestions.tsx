// 📄 File: src/pages/HomePage/components/DailySuggestions.tsx

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Snackbar,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SuggestionCard from "./SuggestionCard";

// Interface
interface SuggestionProduct {
  id: string;
  img: string;
  discount: string;
  title: string;
  price: string;
  tags: string[];
}
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

// 1. Fetch từ API thật
const fetchDailySuggestions = async (): Promise<SuggestionProduct[]> => {
  const response = await fetch("http://localhost:3001/dailySuggestions");
  if (!response.ok) throw new Error("Không thể tải Gợi Ý Hôm Nay");
  return response.json();
};

// Hàm chuyển đổi
const convertSuggestionToCartProduct = (
  product: SuggestionProduct
): CartProduct => {
  const priceNum = parseFloat(
    product.price.replace(/\./g, "").replace("₫", "")
  );
  const discountNum = parseFloat(
    product.discount.replace("-", "").replace("%", "")
  );
  let oldPriceNum = priceNum;
  if (discountNum > 0) {
    oldPriceNum = priceNum / (1 - discountNum / 100);
  }
  return {
    id: product.id,
    name: product.title,
    image: product.img,
    variant: "Phân Loại: Mặc định",
    oldPrice: new Intl.NumberFormat("vi-VN").format(oldPriceNum) + "₫",
    newPrice: product.price,
    quantity: 1,
  };
};

function DailySuggestions() {
  const { data, isLoading, isError, error } = useQuery<
    SuggestionProduct[],
    Error
  >({
    queryKey: ["dailySuggestions"],
    queryFn: fetchDailySuggestions,
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const queryClient = useQueryClient();

  // 2. Mutation gọi API thật
  const addToCartMutation = useMutation({
    mutationFn: async (productToAdd: SuggestionProduct) => {
      const newCartProduct = convertSuggestionToCartProduct(productToAdd);
      const targetShopId = "shop1"; // Mặc định thêm vào shop1

      // A. Lấy dữ liệu shop hiện tại từ Server
      const res = await fetch(`http://localhost:3001/cart/${targetShopId}`);
      if (!res.ok) throw new Error("Không tìm thấy shop để thêm vào");
      const shop: Shop = await res.json();

      // B. Tính toán mảng sản phẩm mới
      const existingProductIndex = shop.products.findIndex(
        (p) => p.id === newCartProduct.id
      );
      let updatedProducts = [...shop.products];

      if (existingProductIndex > -1) {
        updatedProducts[existingProductIndex].quantity += 1;
      } else {
        updatedProducts.push(newCartProduct);
      }

      // C. Gửi PATCH lên Server để cập nhật
      return fetch(`http://localhost:3001/cart/${targetShopId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: updatedProducts }),
      });
    },
    onSuccess: () => {
      // Làm mới dữ liệu giỏ hàng toàn bộ app
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setSnackbarOpen(true);
    },
    onError: (err) => {
      alert("Lỗi khi thêm vào giỏ: " + err);
    },
  });

  const handleAddToCart = (product: SuggestionProduct) => {
    addToCartMutation.mutate(product);
  };

  const handleSeeMore = () => setIsExpanded(true);
  const handleCloseSnackbar = () => setSnackbarOpen(false);
  const displayedData = isExpanded ? data : data?.slice(0, 12);

  return (
    <Box sx={{ borderBottom: "4px solid #ee4d2d", pb: 4 }}>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 2,
            mb: 2,
            bgcolor: "#fff",
            borderBottom: "4px solid #ee4d2d",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Gợi Ý Hôm Nay
          </Typography>
        </Box>

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
        {isError && <Alert severity="error">Lỗi: {error.message}</Alert>}

        <Grid container spacing={1}>
          {displayedData?.map((product) => (
            <Grid size={{ xs: 6, md: 2 }} key={product.id}>
              <SuggestionCard product={product} onAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>

        {!isLoading && !isExpanded && data && data.length > 12 && (
          <Box sx={{ textAlign: "center", my: 2 }}>
            <Button variant="outlined" onClick={handleSeeMore}>
              Xem Thêm
            </Button>
          </Box>
        )}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            Đã thêm sản phẩm vào giỏ hàng!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default DailySuggestions;
