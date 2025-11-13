// 📄 File: src/pages/HomePage/components/ShopeeMall.tsx

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
import Grid from "@mui/material/Grid";
import { useQuery } from "@tanstack/react-query";

// Import các icon (giữ nguyên)
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Định nghĩa kiểu dữ liệu
interface MallProduct {
  id: number;
  img: string;
  logo: string;
  label: string;
}

import { SHOPEE_MALL_DATA } from "../../../data/shopeeMallProducts";

// 2. Viết hàm fetch
const fetchMallProducts = async (): Promise<MallProduct[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(SHOPEE_MALL_DATA);
    }, 500); // Giả vờ đợi 0.5s
  });
};

function ShopeeMall() {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: 2,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 1, // Mobile chỉ nên hiện 1 hàng để đỡ tốn diện tích dọc
          arrows: false,
        },
      },
    ],
  };

  // 3.  DÙNG USEQUERY
  const { data, isLoading, isError, error } = useQuery<MallProduct[], Error>({
    queryKey: ["shopeeMallProducts"],
    queryFn: fetchMallProducts,
  });

  // (Phần Header của Shopee Mall - giữ nguyên)
  const MallHeader = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      {/* Cụm trái */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography
          variant="h6"
          sx={{ color: "primary.main", fontWeight: 700 }}
        >
          SHOPEE MALL
        </Typography>
        <span style={{ borderLeft: "1px solid #ddd", height: "20px" }}></span>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <AssignmentReturnIcon sx={{ color: "red", fontSize: 18 }} />
          <Typography variant="body2">Trả Hàng Miễn Phí 15 Ngày</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <VerifiedIcon sx={{ color: "red", fontSize: 18 }} />
          <Typography variant="body2">Hàng Chính Hãng 100%</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <LocalShippingIcon sx={{ color: "red", fontSize: 18 }} />
          <Typography variant="body2">Miễn Phí Vận Chuyển</Typography>
        </Box>
      </Box>
      {/* Cụm phải */}
      <Link
        href="#"
        underline="none"
        sx={{
          fontSize: "0.875rem",
          color: "primary.main",
          display: "flex",
          alignItems: "center",
        }}
      >
        Xem Tất Cả
        <ArrowForwardIosIcon sx={{ fontSize: "0.875rem", ml: 0.5 }} />
      </Link>
    </Box>
  );

  // 4.  XỬ LÝ LOADING VÀ ERROR
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
      <Grid container>
        {/* Cột trái: Banner Lớn */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            component="img"
            src="/assets/mall/mall_banner_left.jfif"
            alt="Shopee Mall Banner"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Grid>

        {/* Cột phải: Slider sản phẩm */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box className="shopee-mall-slider" sx={{ p: 1 }}>
            <Slider {...settings}>
              {/* 5. ⭐️ LẶP QUA 'data' */}
              {data?.map((product, index) => (
                <Box
                  key={product.id} // Dùng product.id
                  sx={{
                    textAlign: "center",
                    cursor: "pointer",
                    p: "4px",
                  }}
                >
                  <Box
                    sx={{
                      border: "1px solid #f0f0f0",
                      "&:hover": { boxShadow: 1, zIndex: 2 },
                    }}
                  >
                    {/* Ảnh sản phẩm */}
                    <Box
                      component="img"
                      src={product.img}
                      alt={product.label}
                      sx={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                        objectFit: "contain",
                      }}
                    />

                    {/* Chữ (Label) */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: "primary.main",
                        fontWeight: 500,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      {product.label}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>
        </Grid>
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      <Paper elevation={0}>
        {MallHeader}
        {renderBody()}
      </Paper>
    </Container>
  );
}

export default ShopeeMall;
