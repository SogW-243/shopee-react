// 📄 File: src/components/layout/Footer.tsx

import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid"; // Import Grid v2
import { useQuery } from "@tanstack/react-query";

// Import icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// (Phần interface và helper giữ nguyên)
interface FooterData {
  customerService: string[];
  aboutShopee: string[];
  paymentLogos: string[];
  shippingLogos: string[];
  followUs: { name: string; icon: string }[];
  appDownload: {
    qrCode: string;
    appStore: string;
    googlePlay: string;
    appGallery: string;
  };
  countries: string[];
  policies: string[];
  companyInfo: {
    logos: string[];
    name: string;
    address: string;
    legal: string;
    copyright: string;
  };
}

import { FOOTER_DATA } from "../../data/footerData";

const fetchFooterData = async (): Promise<FooterData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FOOTER_DATA as unknown as FooterData);
    }, 500);
  });
};

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "FacebookIcon":
      return <FacebookIcon sx={{ fontSize: 18, mr: 0.5 }} />;
    case "InstagramIcon":
      return <InstagramIcon sx={{ fontSize: 18, mr: 0.5 }} />;
    case "LinkedInIcon":
      return <LinkedInIcon sx={{ fontSize: 18, mr: 0.5 }} />;
    default:
      return null;
  }
};

function Footer() {
  const { data, isLoading, isError, error } = useQuery<FooterData, Error>({
    queryKey: ["footerData"],
    queryFn: fetchFooterData,
  });

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

  if (!data) return null;

  return (
    <footer id="page-footer">
      {/* --- PHẦN 1: LINKS --- */}
      {/* Box ngoài cùng chịu trách nhiệm về màu nền full-width */}
      <Box
        sx={{
          backgroundColor: "#fbfbfb",
          color: "text.secondary",
          py: 5,
        }}
      >
        {/* Container chịu trách nhiệm căn giữa nội dung */}
        <Container maxWidth="lg">
          <Grid container spacing={2} sx={{ fontSize: "0.75rem" }}>
            {/* Cột 1 */}
            <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}
              >
                DỊCH VỤ KHÁCH HÀNG
              </Typography>
              {data.customerService.map((item) => (
                <Link
                  href="#"
                  key={item}
                  color="inherit"
                  underline="none"
                  display="block"
                  sx={{ mb: 1, "&:hover": { color: "primary.main" } }}
                >
                  {item}
                </Link>
              ))}
            </Grid>
            {/* Cột 2 */}
            <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}
              >
                VỀ SHOPEE VIỆT NAM
              </Typography>
              {data.aboutShopee.map((item) => (
                <Link
                  href="#"
                  key={item}
                  color="inherit"
                  underline="none"
                  display="block"
                  sx={{ mb: 1, "&:hover": { color: "primary.main" } }}
                >
                  {item}
                </Link>
              ))}
            </Grid>
            {/* Cột 3 */}
            <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}
              >
                THANH TOÁN
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                {data.paymentLogos.map((logo) => (
                  <Box
                    component="img"
                    src={logo}
                    key={logo}
                    sx={{
                      height: 24,
                      p: 0.5,
                      bgcolor: "white",
                      boxShadow: 1,
                      borderRadius: "2px",
                    }}
                  />
                ))}
              </Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}
              >
                ĐƠN VỊ VẬN CHUYỂN
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {data.shippingLogos.map((logo) => (
                  <Box
                    component="img"
                    src={logo}
                    key={logo}
                    sx={{
                      height: 24,
                      p: 0.5,
                      bgcolor: "white",
                      boxShadow: 1,
                      borderRadius: "2px",
                    }}
                  />
                ))}
              </Box>
            </Grid>
            {/* Cột 4 */}
            <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}
              >
                THEO DÕI SHOPEE
              </Typography>
              {data.followUs.map((item) => (
                <Link
                  href="#"
                  key={item.name}
                  color="inherit"
                  underline="none"
                  display="flex"
                  alignItems="center"
                  sx={{ mb: 1, "&:hover": { color: "primary.main" } }}
                >
                  {getIcon(item.icon)} {item.name}
                </Link>
              ))}
            </Grid>
            {/* Cột 5 */}
            <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}
              >
                TẢI ỨNG DỤNG SHOPEE
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box
                  component="img"
                  src={data.appDownload.qrCode}
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "white",
                    p: 0.5,
                    boxShadow: 1,
                  }}
                />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box
                    component="img"
                    src={data.appDownload.appStore}
                    sx={{
                      height: 24,
                      bgcolor: "white",
                      p: 0.5,
                      boxShadow: 1,
                      borderRadius: "2px",
                    }}
                  />
                  <Box
                    component="img"
                    src={data.appDownload.googlePlay}
                    sx={{
                      height: 24,
                      bgcolor: "white",
                      p: 0.5,
                      boxShadow: 1,
                      borderRadius: "2px",
                    }}
                  />
                  <Box
                    component="img"
                    src={data.appDownload.appGallery}
                    sx={{
                      height: 24,
                      bgcolor: "white",
                      p: 0.5,
                      boxShadow: 1,
                      borderRadius: "2px",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* --- PHẦN 2: INFO --- */}
      <Box sx={{ backgroundColor: "#f5f5f5", color: "text.secondary", py: 3 }}>
        <Container maxWidth="lg">
          <Grid
            container
            sx={{
              fontSize: "0.75rem",
              justifyContent: "space-between",
              mb: 4,
            }}
          >
            <Grid size={{ xs: 12, md: "auto" }}>
              {data.companyInfo.copyright}
            </Grid>
            <Grid size={{ xs: 12, md: "auto" }}>
              Quốc gia & Khu vực: {data.countries.join(" | ")}
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 4,
              mb: 4,
              fontSize: "0.75rem",
            }}
          >
            {data.policies.map((policy) => (
              <Link
                href="#"
                key={policy}
                color="inherit"
                underline="none"
                sx={{ textTransform: "uppercase" }}
              >
                {policy}
              </Link>
            ))}
          </Box>

          <Box sx={{ textAlign: "center", fontSize: "0.75rem" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                mb: 2,
              }}
            >
              {data.companyInfo.logos.map((logo) => (
                <Box
                  component="img"
                  src={logo}
                  key={logo}
                  sx={{ height: 45, width: "auto" }} // width auto để giữ tỉ lệ
                />
              ))}
            </Box>
            <Typography variant="caption" display="block" sx={{ mb: 1 }}>
              {data.companyInfo.name}
            </Typography>
            <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
              {data.companyInfo.address}
            </Typography>
            <Typography variant="caption" display="block">
              {data.companyInfo.legal}
            </Typography>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
