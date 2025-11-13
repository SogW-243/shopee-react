import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Màu chủ đạo của Shopee
const shopeeOrange = "#ee4d2d";

// Tạo theme
export const theme = createTheme({
  palette: {
    // Đặt màu "primary" là màu cam của Shopee
    primary: {
      main: shopeeOrange,
      contrastText: "#fff", // Chữ màu trắng khi trên nền primary
    },
    // Màu "error" (lỗi)
    error: {
      main: red.A400,
    },
    // Màu nền chung của trang
    background: {
      default: "#f5f5f5", // Màu xám rất nhạt
    },
  },
  typography: {
    fontFamily: [
      '"Helvetica Neue"', // Shopee dùng font này
      "Arial",
      "sans-serif",
    ].join(","),
    // Tắt việc tự động VIẾT HOA các nút bấm
    button: {
      textTransform: "none",
    },
  },

  // Bạn cũng có thể ghi đè style mặc định của component tại đây
  components: {
    // Ví dụ: Ghi đè MuiButton
    MuiButton: {
      styleOverrides: {
        // Áp dụng cho mọi nút
        root: {
          borderRadius: "3px", // Nút Shopee bo góc nhẹ
          boxShadow: "none",
        },
        // Áp dụng cho nút "contained" (nút có nền)
        containedPrimary: {
          "&:hover": {
            opacity: 0.9, // Giảm độ sáng khi hover
          },
        },
      },
    },
    // Ví dụ: Ghi đè MuiAppBar (thanh header)
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none", // Header Shopee thường không có bóng đổ
        },
      },
    },
  },
});
