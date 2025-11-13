// 📄 File: src/components/common/QuantityInput.tsx

import React from "react";
import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface QuantityInputProps {
  value: number;
  onChange: (newValue: number) => void;
}

function QuantityInput({ value, onChange }: QuantityInputProps) {
  const handleDecrease = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    // Đặt giới hạn tối đa, ví dụ 99
    if (value < 99) {
      onChange(value + 1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #ddd",
        borderRadius: "2px",
      }}
    >
      <IconButton
        size="small"
        onClick={handleDecrease}
        sx={{ borderRadius: 0 }}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <TextField
        size="small"
        value={value}
        InputProps={{
          readOnly: true,
          sx: {
            width: 40,
            "& input": { textAlign: "center", p: "4px 0" },
            "& fieldset": { border: "none" }, // Bỏ viền của TextField
          },
        }}
      />
      <IconButton
        size="small"
        onClick={handleIncrease}
        sx={{ borderRadius: 0 }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default QuantityInput;
