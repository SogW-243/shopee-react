// 📄 File: src/components/layout/CheckoutBar.tsx

import React from "react";
import { Box, Checkbox, Typography, Button, Link, Paper } from "@mui/material";

// 1. ⭐ Định nghĩa props mà component này sẽ nhận
interface CheckoutBarProps {
  selectedCount: number;
  totalPrice: string;
  isAllSelected: boolean;
  onSelectAllClick: () => void;
  onDeleteSelectedClick: () => void;
  onCheckoutClick: () => void;
}

function CheckoutBar({
  selectedCount,
  totalPrice,
  isAllSelected,
  onSelectAllClick,
  onDeleteSelectedClick,
  onCheckoutClick,
}: CheckoutBarProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        position: "sticky", // Dính
        bottom: 0,
        zIndex: 10,
        mt: 2,
        bgcolor: "white",
        p: 2,
        display: "flex",

        // ⭐ RESPONSIVE: Mobile xếp dọc (column), Tablet/PC xếp ngang (row)
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        // Mobile: Căn giữa các phần tử, PC: Căn 2 bên
        justifyContent: { xs: "center", sm: "space-between" },
        gap: { xs: 2, sm: 0 }, // Thêm khoảng cách khi xếp dọc
      }}
    >
      {/* Cụm trái */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* 2. ⭐ Dùng props để điều khiển Checkbox */}
        <Checkbox checked={isAllSelected} onChange={onSelectAllClick} />
        <Link
          component="button" // Dùng button để có thể click
          underline="none"
          sx={{ ml: 1, cursor: "pointer" }}
          onClick={onSelectAllClick}
        >
          Chọn Tất Cả ({selectedCount})
        </Link>
        <Link
          component="button"
          underline="none"
          sx={{ ml: 2, cursor: "pointer" }}
          onClick={onDeleteSelectedClick} // 👈 Thêm sự kiện xóa
        >
          Xóa
        </Link>
      </Box>

      {/* Cụm phải */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body1">
          Tổng cộng ({selectedCount} sản phẩm):
          {/* 3. ⭐ Hiển thị tổng tiền từ props */}
          <Typography
            component="span"
            sx={{
              color: "primary.main",
              fontSize: "1.5rem",
              fontWeight: 600,
              ml: 1,
            }}
          >
            {totalPrice}
          </Typography>
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ width: 200, bgcolor: "primary.main", color: "white" }}
          disabled={selectedCount === 0}
          onClick={onCheckoutClick}
        >
          Mua Hàng
        </Button>
      </Box>
    </Paper>
  );
}

export default CheckoutBar;
