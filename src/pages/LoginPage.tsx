// 📄 File: src/pages/LoginPage/index.tsx

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Để chuyển trang
import AuthLayout from "../components/layout/AuthLayout";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

function LoginPage() {
  const navigate = useNavigate();

  // 2. ⭐ TẠO STATE QUẢN LÝ SNACKBAR
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLogin = () => {
    // Thay vì alert(), ta bật Snackbar lên
    setOpenSnackbar(true);

    // Chuyển trang sau 1.5s để người dùng kịp đọc thông báo
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  // Hàm đóng Snackbar khi người dùng bấm nút 'x' hoặc bấm ra ngoài
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <AuthLayout title="Đăng nhập">
      <Typography variant="h6" sx={{ mb: 3 }}>
        Đăng nhập
      </Typography>

      {/* Form inputs */}
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          fullWidth
          placeholder="Email/Số điện thoại/Tên đăng nhập"
          variant="outlined"
          size="small"
        />
        <TextField
          fullWidth
          type="password"
          placeholder="Mật khẩu"
          variant="outlined"
          size="small"
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{ mt: 1, bgcolor: "primary.main", color: "white" }}
          onClick={handleLogin}
        >
          ĐĂNG NHẬP
        </Button>
      </Box>

      {/* Links phụ (Quên MK, Đăng nhập bằng SMS) */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: 1, mb: 3 }}
      >
        <Link href="#" underline="none" variant="caption" color="primary">
          Quên mật khẩu
        </Link>
        <Link href="#" underline="none" variant="caption" color="primary">
          Đăng nhập với SMS
        </Link>
      </Box>

      {/* Hoặc */}
      <Divider sx={{ my: 2, color: "text.secondary", fontSize: "0.75rem" }}>
        HOẶC
      </Divider>

      {/* Nút Social */}
      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FacebookIcon sx={{ color: "#1877f2" }} />}
          sx={{ color: "text.primary", borderColor: "#ddd" }}
        >
          Facebook
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon sx={{ color: "#db4437" }} />}
          sx={{ color: "text.primary", borderColor: "#ddd" }}
        >
          Google
        </Button>
      </Box>

      {/* Chuyển sang Đăng ký */}
      <Typography
        variant="body2"
        align="center"
        sx={{ color: "text.secondary" }}
      >
        Bạn mới biết đến Shopee?{" "}
        {/* Dùng navigate để chuyển trang khi bấm link */}
        <Link
          component="button"
          variant="body2"
          underline="none"
          color="primary"
          fontWeight={600}
          onClick={() => navigate("/register")}
        >
          Đăng ký
        </Link>
      </Typography>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Tự động ẩn sau 3 giây
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Vị trí hiển thị
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success" // Màu xanh lá (thành công). Có thể là 'error', 'warning', 'info'
          variant="filled" // Kiểu hiển thị đậm đà
          sx={{ width: "100%" }}
        >
          Đăng nhập thành công!
        </Alert>
      </Snackbar>
    </AuthLayout>
  );
}

export default LoginPage;
