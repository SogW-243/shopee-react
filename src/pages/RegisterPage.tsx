// 📄 File: src/pages/RegisterPage/index.tsx

import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

function RegisterPage() {
  const navigate = useNavigate();
  const handleRegister = () => {
    // Xử lý đăng ký ở đây (gọi API, validate, v.v.)
    alert("Đã bấm nút Đăng ký! (Demo)");
    navigate("/login");
  };
  return (
    <AuthLayout title="Đăng ký">
      <Typography variant="h6" sx={{ mb: 3 }}>
        Đăng ký
      </Typography>

      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          fullWidth
          placeholder="Số điện thoại"
          variant="outlined"
          size="small"
        />
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{ mt: 1, bgcolor: "primary.main", color: "white" }}
          onClick={handleRegister}
        >
          TIẾP THEO
        </Button>
      </Box>

      <Divider sx={{ my: 3, color: "text.secondary", fontSize: "0.75rem" }}>
        HOẶC
      </Divider>

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

      <Typography
        variant="caption"
        align="center"
        display="block"
        sx={{ color: "text.secondary", mb: 3, px: 2 }}
      >
        Bằng việc đăng kí, bạn đã đồng ý với Shopee về{" "}
        <Link href="#">Điều khoản dịch vụ</Link> &{" "}
        <Link href="#">Chính sách bảo mật</Link>
      </Typography>

      <Typography
        variant="body2"
        align="center"
        sx={{ color: "text.secondary" }}
      >
        Bạn đã có tài khoản?{" "}
        <Link
          component="button"
          variant="body2"
          underline="none"
          color="primary"
          fontWeight={600}
          onClick={() => navigate("/login")}
        >
          Đăng nhập
        </Link>
      </Typography>
    </AuthLayout>
  );
}

export default RegisterPage;
