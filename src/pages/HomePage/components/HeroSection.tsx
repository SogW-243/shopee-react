// 📄 File: src/pages/HomePage/components/HeroSection.tsx

import React from "react";
import Slider from "react-slick";
import { Box, Container, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";

function HeroSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const sliderBanners = [
    "/assets/banners/banner1.webp",
    "/assets/banners/banner2.webp",
    "/assets/banners/banner3.webp",
    "/assets/banners/banner4.webp",
    "/assets/banners/banner5.webp",
    "/assets/banners/banner6.webp",
    "/assets/banners/banner7.webp",
    "/assets/banners/banner8.webp",
  ];

  const sideBanners = [
    "/assets/banners/sideBanners1.webp",
    "/assets/banners/sideBanners2.webp",
  ];

  const quickLinks = [
    {
      img: "/assets/quickLink/quickLink1.png",
      label: "Deal Từ 1.000Đ",
    },
    {
      img: "/assets/quickLink/quickLink2.png",
      label: "Shopee Xử Lý",
    },
    {
      img: "/assets/quickLink/quickLink3.png",
      label: "Deal Hot Giờ Vàng",
    },
    {
      img: "/assets/quickLink/quickLink4.png",
      label: "Shopee Style Voucher 90%",
    },
    {
      img: "/assets/quickLink/quickLink5.png",
      label: "Khách Hàng Thân Thiết",
    },
    {
      img: "/assets/quickLink/quickLink6.png",
      label: "Mã Giảm Giá",
    },
  ];

  return (
    <Paper
      sx={{ boxShadow: "0px 10px 15px -13px rgba(0,0,0,0.1)" }}
      elevation={0}
    >
      <Container maxWidth="lg" sx={{ mb: 2 }}>
        <Grid container spacing={1}>
          <Grid sx={{ mt: 3 }} size={{ xs: 12, md: 8 }}>
            <Box
              sx={{ width: "100%", position: "relative" }}
              className="hero-slider-container"
            >
              <Slider {...settings} className="hero-slider-container">
                {sliderBanners.map((bannerUrl, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={bannerUrl}
                    alt={`Banner ${index + 1}`}
                    sx={{
                      width: "100%",
                      height: 235,
                      objectFit: "cover",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </Slider>
            </Box>
          </Grid>

          <Grid sx={{ mt: 3 }} size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box
                component="img"
                src={sideBanners[0]}
                alt="Side Banner 1"
                sx={{
                  width: "100%",
                  height: 115,
                  objectFit: "cover",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              />

              <Box
                component="img"
                src={sideBanners[1]}
                alt="Side Banner 2"
                sx={{
                  width: "100%",
                  height: 115,
                  objectFit: "cover",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            mt: 2,
            p: 2,
            borderRadius: "4px",
            overflowX: { xs: "auto", md: "visible" }, // Cho phép cuộn ngang
            "&::-webkit-scrollbar": { display: "none" }, // Ẩn thanh cuộn trên Webkit browsers
          }}
          elevation={0} // Tắt bóng đổ
        >
          {quickLinks.map((link, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                textAlign: "center",
                width: "100px",
                flexShrink: 0, // Đảm bảo các mục không bị co lại
              }}
            >
              {/* B. Ảnh */}
              <Box
                component="img"
                src={link.img} // Lấy từ object
                alt={link.label} // Dùng label cho alt text
                sx={{
                  width: 50,
                  height: 50,
                  objectFit: "cover",
                }}
              />

              <Typography
                variant="caption" // cho chữ nhỏ
                sx={{
                  mt: 0.5,
                  height: 30,
                }}
              >
                {link.label} {/* Lấy từ object */}
              </Typography>
            </Box>
          ))}
        </Paper>
      </Container>
    </Paper>
  );
}

export default HeroSection;
