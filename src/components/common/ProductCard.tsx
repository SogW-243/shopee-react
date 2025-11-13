// 📄 File: src/components/common/ProductCard.tsx

import React from "react";
import { Box, Typography, Paper, LinearProgress } from "@mui/material";

// Định nghĩa các props mà Card sẽ nhận
interface ProductCardProps {
  image: string;
  price: string;
  discount: string;
  soldLabel: string;
  soldPercent: number; // 0-100
}

function ProductCard({
  image,
  price,
  discount,
  soldLabel,
  soldPercent,
}: ProductCardProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        m: 1,
        cursor: "pointer",
        "&:hover": {
          borderColor: "primary.main",
        },
      }}
    >
      {/* 1. PHẦN ẢNH VÀ TAG GIẢM GIÁ */}
      <Box sx={{ position: "relative" }}>
        {/* Ảnh sản phẩm */}
        <Box
          component="img"
          src={image}
          alt="Product Image"
          sx={{
            width: "100%",
            aspectRatio: "1 / 1",
            objectFit: "cover",
          }}
        />
        {/* Tag giảm giá */}
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

      {/* 2. PHẦN NỘI DUNG (GIÁ VÀ THANH BÁN CHẠY) */}
      <Box sx={{ p: 1 }}>
        {/* Giá tiền */}
        <Typography
          variant="body1"
          sx={{ color: "primary.main", fontWeight: 600, mb: 1 }}
        >
          {price}
        </Typography>

        {/* Thanh "Đang Bán Chạy" */}
        <Box sx={{ position: "relative", height: 18 }}>
          <LinearProgress
            variant="determinate"
            value={soldPercent}
            color="primary"
            sx={{
              height: 18,
              borderRadius: 9,
              backgroundColor: "#fbe2e3",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#f06a37",
              },
            }}
          />
          <Typography
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              color: "white",
              fontWeight: 600,
              fontSize: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {soldLabel}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default ProductCard;
