// 📄 File: src/pages/CartPage.tsx

import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Link,
  Checkbox,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CheckoutBar from "../components/layout/CheckoutBar";
import QuantityInput from "../components/common/QuantityInput";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import Swal from "sweetalert2";

// Interface
interface Product {
  id: string;
  name: string;
  image: string;
  variant: string;
  oldPrice: string;
  newPrice: string;
  quantity: number;
}
interface Shop {
  id: string;
  shopName: string;
  isFavorite: boolean;
  products: Product[];
  vouchers: string[];
  shippingPromo?: string;
  comboPromo?: string;
}

// 1. Fetch từ API thật
const fetchCart = async (): Promise<Shop[]> => {
  const response = await fetch("http://localhost:3001/cart");
  if (!response.ok) throw new Error("Không thể tải giỏ hàng");
  return response.json();
};

function CartPage() {
  const queryClient = useQueryClient();

  const {
    data: initialData,
    isLoading,
    isError,
    error,
  } = useQuery<Shop[], Error>({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  const [cartData, setCartData] = useState<Shop[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    if (initialData) setCartData(initialData);
  }, [initialData]);

  // Logic Cập nhật số lượng (Chỉ cập nhật UI tạm thời, chưa gọi API để mượt hơn)
  const handleQuantityChange = (
    shopId: string,
    productId: string,
    newQuantity: number
  ) => {
    setCartData((prev) =>
      prev.map((s) =>
        s.id === shopId
          ? {
              ...s,
              products: s.products.map((p) =>
                p.id === productId ? { ...p, quantity: newQuantity } : p
              ),
            }
          : s
      )
    );
  };

  const calculateTotal = (product: Product) => {
    const price = Number(product.newPrice.replace(/\./g, "").replace("₫", ""));
    return (price * product.quantity).toLocaleString("vi-VN") + "₫";
  };

  // --- Checkbox Logic ---
  const allProductIds = useMemo(
    () => cartData.flatMap((s) => s.products.map((p) => p.id)),
    [cartData]
  );
  const isAllSelected =
    allProductIds.length > 0 &&
    allProductIds.every((id) => selectedProducts[id]);

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedProducts({});
    } else {
      const all = allProductIds.reduce((acc, id) => {
        acc[id] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setSelectedProducts(all);
    }
  };
  const handleToggleProductSelect = (id: string) => {
    setSelectedProducts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Tính tổng tiền
  const { totalPrice, selectedCount } = useMemo(() => {
    let total = 0;
    let count = 0;
    cartData.forEach((s) =>
      s.products.forEach((p) => {
        if (selectedProducts[p.id]) {
          count++;
          const price = Number(p.newPrice.replace(/\./g, "").replace("₫", ""));
          total += price * p.quantity;
        }
      })
    );
    return {
      totalPrice: total.toLocaleString("vi-VN") + "₫",
      selectedCount: count,
    };
  }, [cartData, selectedProducts]);

  // 2. Mutation XÓA NHIỀU (Gom theo Shop rồi gọi API)
  const deleteMultipleItems = async (selectedIds: string[]) => {
    const itemsByShop: Record<string, string[]> = {};
    selectedIds.forEach((pid) => {
      const shop = cartData.find((s) => s.products.some((p) => p.id === pid));
      if (shop) {
        if (!itemsByShop[shop.id]) itemsByShop[shop.id] = [];
        itemsByShop[shop.id].push(pid);
      }
    });

    const promises = Object.entries(itemsByShop).map(async ([shopId, pIds]) => {
      // Lấy dữ liệu mới nhất từ server
      const res = await fetch(`http://localhost:3001/cart/${shopId}`);
      const shop: Shop = await res.json();
      // Lọc bỏ sản phẩm cần xóa
      const updatedProducts = shop.products.filter((p) => !pIds.includes(p.id));

      // Gửi PATCH cập nhật
      return fetch(`http://localhost:3001/cart/${shopId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: updatedProducts }),
      });
    });
    await Promise.all(promises);
  };

  // Xử lý xóa 1 sản phẩm
  const handleDeleteProduct = (shopId: string, productId: string) => {
    Swal.fire({
      title: "Xóa sản phẩm?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ee4d2d",
      confirmButtonText: "Xóa",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteMultipleItems([productId]);
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        setSelectedProducts((prev) => {
          const n = { ...prev };
          delete n[productId];
          return n;
        });
        Swal.fire("Đã xóa!", "", "success");
      }
    });
  };

  // Xử lý xóa nhiều
  const handleDeleteSelected = async () => {
    const selectedIds = Object.keys(selectedProducts).filter(
      (id) => selectedProducts[id]
    );
    if (selectedIds.length === 0) return Swal.fire("Chưa chọn sản phẩm");

    Swal.fire({
      title: `Xóa ${selectedIds.length} sản phẩm?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ee4d2d",
      confirmButtonText: "Xóa hết",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteMultipleItems(selectedIds);
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        setSelectedProducts({});
        Swal.fire("Đã xóa!", "", "success");
      }
    });
  };

  // Xử lý Mua hàng
  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const selectedIds = Object.keys(selectedProducts).filter(
        (id) => selectedProducts[id]
      );
      await deleteMultipleItems(selectedIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setSelectedProducts({});
      Swal.fire({
        title: "Thanh toán thành công!",
        icon: "success",
        confirmButtonColor: "#ee4d2d",
      });
    },
  });

  const handleCheckoutClick = () => {
    if (selectedCount === 0) return Swal.fire("Vui lòng chọn sản phẩm");
    Swal.fire({
      title: "Xác nhận thanh toán",
      text: `Tổng tiền: ${totalPrice}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ee4d2d",
      confirmButtonText: "Đặt hàng",
    }).then((res) => {
      if (res.isConfirmed) checkoutMutation.mutate();
    });
  };

  if (isLoading)
    return <CircularProgress sx={{ display: "block", mx: "auto", my: 5 }} />;
  if (isError) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Box sx={{ bgcolor: "#f5f5f5" }}>
      <Container maxWidth="lg" sx={{ pt: 3, pb: 3 }}>
        {/* Header Bảng */}
        <Paper sx={{ p: 2, display: { xs: "none", md: "block" }, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ md: 5 }}>
              {" "}
              <Checkbox
                checked={isAllSelected}
                onChange={handleToggleSelectAll}
              />{" "}
              <b>Sản Phẩm</b>{" "}
            </Grid>
            <Grid size={{ md: 1 }} textAlign="center">
              Đơn Giá
            </Grid>
            <Grid size={{ md: 1 }} textAlign="center">
              Số Lượng
            </Grid>
            <Grid size={{ md: 1 }} textAlign="center">
              Số Tiền
            </Grid>
            <Grid size={{ md: 1 }} textAlign="center">
              Thao Tác
            </Grid>
          </Grid>
        </Paper>

        {/* Danh sách Shop */}
        {cartData.map((shop) => (
          <Paper key={shop.id} sx={{ mt: 2 }}>
            {/* Sản phẩm */}
            {shop.products.map((product) => (
              <Box key={product.id} sx={{ p: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid
                    size={{ xs: 12, md: 5 }}
                    display="flex"
                    alignItems="center"
                    gap={1.5}
                  >
                    <Checkbox
                      checked={!!selectedProducts[product.id]}
                      onChange={() => handleToggleProductSelect(product.id)}
                    />
                    <Box
                      component="img"
                      src={product.image}
                      sx={{ width: 80, height: 80, border: "1px solid #ddd" }}
                    />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-Box",
                          WebkitLineClamp: "2",
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {product.variant}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 4, md: 2 }} textAlign="center">
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: "line-through",
                        color: "text.secondary",
                      }}
                    >
                      {product.oldPrice}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {product.newPrice}
                    </Typography>
                  </Grid>
                  <Grid
                    size={{ xs: 4, md: 2 }}
                    display="flex"
                    justifyContent="center"
                  >
                    <QuantityInput
                      value={product.quantity}
                      onChange={(v) =>
                        handleQuantityChange(shop.id, product.id, v)
                      }
                    />
                  </Grid>
                  <Grid
                    size={{ xs: 2, md: 2 }}
                    textAlign="center"
                    color="primary.main"
                    fontWeight={600}
                  >
                    {calculateTotal(product)}
                  </Grid>
                  <Grid size={{ xs: 2, md: 1 }} textAlign="center">
                    <Link
                      component="button"
                      underline="none"
                      color="primary"
                      onClick={() => handleDeleteProduct(shop.id, product.id)}
                    >
                      Xóa
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            ))}
            <Divider />
            <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <LocalOfferOutlinedIcon color="primary" />
              <Typography variant="body2">{shop.vouchers[0]}</Typography>
            </Box>
          </Paper>
        ))}

        <CheckoutBar
          selectedCount={selectedCount}
          totalPrice={totalPrice}
          isAllSelected={isAllSelected}
          onSelectAllClick={handleToggleSelectAll}
          onDeleteSelectedClick={handleDeleteSelected}
          onCheckoutClick={handleCheckoutClick}
        />
      </Container>
    </Box>
  );
}

export default CartPage;
