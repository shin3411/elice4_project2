import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { cyan } from "@mui/material/colors";

function Loading() {
  const one = cyan[100];
  const two = cyan[100];
  const three = cyan[100];
  const four = cyan[100];
  return (
    <Stack
      direction="row"
      spacing={5}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "auto",
        height: "100vh",
      }}
    >
      <Skeleton
        variant="circular"
        sx={{ bgcolor: one, width: 40, height: 40 }}
      />
      <Skeleton
        variant="circular"
        sx={{ bgcolor: two, width: 40, height: 40 }}
      />
      <Skeleton
        variant="circular"
        sx={{ bgcolor: three, width: 40, height: 40 }}
      />
      <Skeleton
        variant="circular"
        sx={{ bgcolor: four, width: 40, height: 40 }}
      />
    </Stack>
  );
}
export default Loading;
