// 📄 File: src/pages/HomePage/components/TopSearches.tsx

import React from "react";
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
import { useQuery } from "@tanstack/react-query";

// Định nghĩa kiểu dữ liệu
interface TopSearchItem {
  id: number;
  img: string;
  label: string;
  sold: string;
}

import { TOP_SEARCHES_DATA } from "../../../data/topSearches";

// Hàm fetch
const fetchTopSearches = async (): Promise<TopSearchItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(TOP_SEARCHES_DATA);
    }, 500);
  });
};

function TopSearches() {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    rows: 1,
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
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
    ],
  };
  // Dùng useQuery
  const { data, isLoading, isError, error } = useQuery<TopSearchItem[], Error>({
    queryKey: ["topSearches"],
    queryFn: fetchTopSearches,
  });

  // Header (TÌM KIẾM HÀNG ĐẦU & Xem tất cả)
  const renderHeader = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Typography
        variant="body1"
        sx={{ color: "primary.main", fontWeight: 600 }}
      >
        TÌM KIẾM HÀNG ĐẦU
      </Typography>
      <Link
        href="#"
        underline="none"
        sx={{ fontSize: "0.875rem", color: "primary.main" }}
      >
        Xem Tất Cả {">"}
      </Link>
    </Box>
  );

  // Body (Slider)
  const renderBody = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
          <CircularProgress />
        </Box>
      );
    }
    if (isError) {
      return (
        <Box sx={{ p: 2 }}>
          <Alert severity="error">Lỗi: {error.message}</Alert>
        </Box>
      );
    }
    return (
      <Box className="top-searches-slider" sx={{ p: 1 }}>
        <Slider {...settings}>
          {data?.map((item) => (
            // Đây là 1 item card
            <Box
              key={item.id}
              sx={{
                cursor: "pointer",
                p: "1px", // Thêm padding nhỏ để viền hover không bị cắt
                "&:hover": {
                  boxShadow: 2,
                  zIndex: 2,
                  borderRadius: "2px",
                },
              }}
            >
              <Paper variant="outlined" sx={{ border: "none" }}>
                {/* 1. Ảnh */}
                <Box sx={{ position: "relative" }}>
                  <Box
                    component="img"
                    src={item.img}
                    alt={item.label}
                    sx={{
                      width: "100%",
                      aspectRatio: "1/1",
                      objectFit: "cover",
                    }}
                  />
                  {/* Tag "Bán 62k+ / tháng" */}
                  <Typography
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      textAlign: "center",
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.4)",
                      fontSize: "0.75rem",
                      py: 0.5,
                    }}
                  >
                    {item.sold}
                  </Typography>
                  {/* Tag "TOP" */}
                  <Box
                    component="img"
                    src="/assets/topsearch/tag_top.png"
                    alt="Top"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: "8px",
                      width: "30px",
                    }}
                  />
                </Box>
                {/* 2. Chữ (Label) */}
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    textAlign: "center",
                    height: 40, // 2 dòng
                    overflow: "hidden",
                  }}
                >
                  {item.label}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Slider>
      </Box>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      <Paper elevation={0}>
        {renderHeader}
        {renderBody()}
      </Paper>
    </Container>
  );
}

export default TopSearches;
