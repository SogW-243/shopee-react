// 📄 File: src/pages/HomePage/components/SuggestionCard.tsx
// (THÊM NÚT "MUA HÀNG" VÀO ĐÂY)

import React from "react";
// 1. ⭐ IMPORT THÊM BUTTON
import { Box, Typography, Paper, Button } from "@mui/material";
import { useQueryClient, useMutation } from "@tanstack/react-query"; // Import hooks

// (Interface giữ nguyên)
interface SuggestionProduct {
  id: string;
  img: string;
  discount: string;
  title: string;
  price: string;
  tags: string[];
}
// Interface cho CartProduct (lấy từ CartPage)
interface CartProduct {
  id: string;
  name: string;
  image: string;
  variant: string;
  oldPrice: string;
  newPrice: string;
  quantity: number;
}

// 2. ⭐ THÊM prop onAddToCart VÀO INTERFACE
interface SuggestionCardProps {
  product: SuggestionProduct; // Gửi cả object product
  onAddToCart: (product: SuggestionProduct) => void; // 👈 Thêm hàm này
}

// 3. ⭐ NHẬN PROPS
function SuggestionCard({ product, onAddToCart }: SuggestionCardProps) {
  const { img, discount, title, price, tags } = product; // Tách props ra
  const hasReVoDich = tags.includes("Rẻ Vô Địch");

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        border: "1px solid #f0f0f0",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%", // Đảm bảo card cao bằng nhau
        "&:hover": {
          boxShadow: 2,
          borderColor: "primary.main",
        },
      }}
    >
      {/* 1. ẢNH (Giữ nguyên) */}
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={img}
          alt={title}
          sx={{
            width: "100%",
            aspectRatio: "1/1",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "rgba(255, 212, 36, 0.9)",
            color: "primary.main",
            padding: "2px 4px",
            fontSize: "0.7rem",
            fontWeight: 700,
            borderBottomLeftRadius: "2px",
          }}
        >
          {discount}
        </Box>
      </Box>

      {/* 2. NỘI DUNG */}
      <Box sx={{ p: 1, display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {/* Tiêu đề (Giữ nguyên) */}
        <Typography
          variant="body2"
          sx={{ height: 40, overflow: "hidden", mb: 1 }}
        >
          {title}
        </Typography>

        {/* Box giữ chỗ cho Tag (Giữ nguyên) */}
        <Box sx={{ minHeight: "22px" }}>
          {hasReVoDich && (
            <Typography
              component="span"
              sx={{
                border: "1px solid #f06a37",
                color: "#f06a37",
                fontSize: "0.65rem",
                p: "1px 4px",
                borderRadius: "2px",
                display: "inline-block",
              }}
            >
              Rẻ Vô Địch
            </Typography>
          )}
        </Box>

        {/* Thêm flexGrow: 1 để đẩy giá/nút xuống đáy card */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Bọc giá và nút trong Box mới */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          {/* Giá tiền */}
          <Typography
            variant="body1"
            sx={{ color: "primary.main", fontWeight: 600 }}
          >
            {price}
          </Typography>

          {/* 4. ⭐ NÚT MUA HÀNG ĐÃ ĐƯỢC THÊM VÀO ĐÂY */}
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: "primary.main",
              color: "white",
              px: 3,
              py: 0.5,
              fontSize: "0.75rem",
              minWidth: 0, // Để nút nhỏ hơn
            }}
            onClick={(e) => {
              e.stopPropagation(); // Ngăn click vào card
              onAddToCart(product); // 👈 Gọi hàm từ prop
            }}
          >
            Mua
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default SuggestionCard;
