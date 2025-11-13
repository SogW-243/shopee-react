// 📄 File: src/pages/HomePage/components/FlashSale.tsx
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import {
  Box,
  Container,
  Typography,
  Paper,
  Link,
  CircularProgress,
  Alert,
} from "@mui/material";
import ProductCard from "../../../components/common/ProductCard";
import { useQuery } from "@tanstack/react-query";

import { FLASH_SALE_DATA } from "../../../data/flashSaleProducts";

const fetchFlashSaleProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FLASH_SALE_DATA); // Trả về dữ liệu đã import
    }, 500);
  });
};
// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  id: number;
  image: string;
  price: string;
  discount: string;
  soldLabel: string;
  soldPercent: number;
}

// 2.  HÀM TIỆN ÍCH ĐỂ THÊM SỐ 0 (ví dụ: 5 -> "05")
const formatTime = (time: number) => String(time).padStart(2, "0");

function FlashSale() {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3, // Mobile hiện 3 sản phẩm
          slidesToScroll: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2, // Mobile nhỏ hiện 2
          slidesToScroll: 2,
          arrows: false,
        },
      },
    ],
  };
  // 3.  LOGIC ĐỒNG HỒ ĐẾM NGƯỢC
  // 3a. Đặt mục tiêu: 2 giờ kể từ bây giờ (chỉ chạy 1 lần)
  const [targetTime] = useState(
    () => new Date().getTime() + 2 * 60 * 60 * 1000
  );

  // 3b. Tạo state để lưu thời gian CÒN LẠI (tính bằng mili-giây)
  const [timeLeft, setTimeLeft] = useState(targetTime - new Date().getTime());

  // 3c. Dùng useEffect để tạo 1 interval chạy mỗi giây
  useEffect(() => {
    // Tạo interval
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const remaining = targetTime - now;

      // Cập nhật state
      setTimeLeft(remaining);

      // Nếu hết giờ, dừng interval
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000); // 1000ms = 1 giây

    // Quan trọng: Dọn dẹp interval khi component bị "unmount"
    return () => clearInterval(interval);
  }, [targetTime]); // Chạy lại nếu targetTime thay đổi (dù ở đây nó sẽ không đổi)

  // 4. ⭐ TÍNH TOÁN GIỜ, PHÚT, GIÂY TỪ STATE `timeLeft`
  // Đảm bảo không có số âm
  const safeTimeLeft = Math.max(0, timeLeft);

  const hours = Math.floor(safeTimeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((safeTimeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((safeTimeLeft % (1000 * 60)) / 1000);

  // 3.  DÙNG USEQUERY ĐỂ LẤY DỮ LIỆU
  const { data, isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ["flashSaleProducts"], // Tên định danh cho query này
    queryFn: fetchFlashSaleProducts, // Hàm để fetch
  });

  // 4. Xử lý trạng thái Loading (Đang tải)
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 2, mb: 2, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Đang tải Flash Sale...</Typography>
      </Container>
    );
  }

  // 5. Xử lý trạng thái Lỗi
  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
        <Alert severity="error">Lỗi: {error.message}</Alert>
      </Container>
    );
  }

  // 6. Trạng thái Thành công (Đã có 'data')
  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      <Paper elevation={0} sx={{ p: 2 }}>
        {/* 1. Header (FLASH SALE, Countdown, Xem tất cả) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography variant="h6" sx={{ color: "primary.main" }}>
              FLASH SALE
            </Typography>

            {/* Đồng hồ  */}
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Box
                component="span"
                sx={{
                  bgcolor: "black",
                  color: "white",
                  p: "2px 4px",
                  borderRadius: "2px",
                  fontWeight: 600,
                }}
              >
                {formatTime(hours)}
              </Box>
              <Box
                component="span"
                sx={{
                  bgcolor: "black",
                  color: "white",
                  p: "2px 4px",
                  borderRadius: "2px",
                  fontWeight: 600,
                }}
              >
                {formatTime(minutes)}
              </Box>
              <Box
                component="span"
                sx={{
                  bgcolor: "black",
                  color: "white",
                  p: "2px 4px",
                  borderRadius: "2px",
                  fontWeight: 600,
                }}
              >
                {formatTime(seconds)}
              </Box>
            </Box>
          </Box>
          {/* Cụm phải: Xem tất cả */}
          <Link href="#" underline="none" sx={{ fontSize: "0.875rem" }}>
            Xem tất cả {">"}
          </Link>
        </Box>

        {/* 7. Slider bây giờ lặp (map) qua 'data' */}
        <Box className="flash-sale-slider">
          <Slider {...settings}>
            {data?.map(
              (
                product // Dùng data?.map
              ) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  price={product.price}
                  discount={product.discount}
                  soldLabel={product.soldLabel}
                  soldPercent={product.soldPercent}
                />
              )
            )}
          </Slider>
        </Box>
      </Paper>
    </Container>
  );
}

export default FlashSale;
