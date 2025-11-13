// 📄 File: src/pages/HomePage/components/CategorySection.tsx

import React from "react";
import Slider from "react-slick";
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

// Định nghĩa kiểu dữ liệu (Interface) cho 1 category
interface Category {
  id: number;
  img: string;
  label: string;
}

import { CATEGORIES_DATA } from "../../../data/categories";

// 2. Viết hàm fetch dữ liệu từ API giả
// Hàm fetch giả lập (Mock Fetch)
const fetchCategories = async (): Promise<Category[]> => {
  // Giả vờ đợi 0.5 giây cho giống thật
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(CATEGORIES_DATA); // Trả về dữ liệu cứng
    }, 500);
  });
};

function CategorySection() {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 10,
    rows: 2,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 600, // Mobile lớn
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          arrows: false, // Ẩn nút mũi tên trên mobile cho gọn
        },
      },
      {
        breakpoint: 480, // Mobile nhỏ
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
        },
      },
    ],
  };

  // 3. DÙNG USEQUERY ĐỂ LẤY DỮ LIỆU
  const { data, isLoading, isError, error } = useQuery<Category[], Error>({
    queryKey: ["categories"], // Tên định danh cho query này
    queryFn: fetchCategories, // Hàm để fetch
  });

  // 4. Xử lý trạng thái Loading (Đang tải)
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 2, mb: 2, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Đang tải Danh Mục...</Typography>
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
      <Paper elevation={0} sx={{ p: 2, position: "relative" }}>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: 2, fontWeight: 600 }}
        >
          DANH MỤC
        </Typography>

        <Box className="category-slider-container">
          <Slider {...settings}>
            {/* 7. Lặp qua 'data' thay vì mảng 'categories' cũ */}
            {data?.map((category, index) => {
              const hasBorderBottom = index % 2 === 0;
              const isLastColumn = Math.floor(index / 2) % 10 === 9;

              return (
                <Box
                  key={category.id}
                  sx={{
                    textAlign: "center",
                    cursor: "pointer",
                    p: "4px",
                    borderBottom: hasBorderBottom
                      ? "1px solid #f0f0f0"
                      : undefined,
                    borderRight: !isLastColumn
                      ? "1px solid #f0f0f0"
                      : undefined,
                    "&:hover": {
                      boxShadow: 1,
                      zIndex: 2,
                    },
                  }}
                >
                  {/* Ảnh */}
                  <Box
                    component="img"
                    src={category.img}
                    alt={category.label}
                    sx={{
                      width: "80%",
                      aspectRatio: "1 / 1",
                      objectFit: "contain",
                      margin: "0 auto",
                    }}
                  />
                  {/* Chữ (Label) */}
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 0.5,
                      display: "block",
                      height: 40,
                      overflow: "hidden",
                    }}
                  >
                    {category.label}
                  </Typography>
                </Box>
              );
            })}
          </Slider>
        </Box>
      </Paper>
    </Container>
  );
}

export default CategorySection;
