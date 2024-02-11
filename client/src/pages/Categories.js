import { useNavigate } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import { Box, Button, Stack } from "@mui/material";
const Categories = () => {
  const navigate = useNavigate();
  const categories = useCategory();
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ maxWidth: "50%" }}>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          spacing={10}
          direction={"row"}
          useFlexGap
          flexWrap="wrap"
        >
          {categories.map((c) => (
            <Box>
              <Button
                sx={{ padding: "30px" }}
                onClick={() => navigate(`/category/${c.slug}`)}
              >
                {c.name}
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Categories;
