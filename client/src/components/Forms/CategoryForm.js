import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form style={{width:"100%"}} onSubmit={handleSubmit}>
        <Box marginBlock={3}>
        <Typography variant="h6" mb={2}>Edit Category</Typography>
          <TextField
          
            type="text"
            fullWidth
            label="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Box>

        <Button variant="contained" type="submit" >
          Submit
        </Button>

      </form>
    </>
  );
};

export default CategoryForm;