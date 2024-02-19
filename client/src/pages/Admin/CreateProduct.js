import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import AdminMenu from "../../components/Layout/AdminMenu";
import {
  Box,
  Container,
  Stack,
  Typography,
  Paper,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Input,
} from "@mui/material";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setloading] = useState(false);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data.success) {
        setCategories(data.allCategories);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    setloading(true);
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const data = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      // console.log("data response on create-product", data);
      if (data?.data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
        navigate("/dashboard/admin");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }finally{
      setloading(false)
    }
  };

  return (
    <Container>
      <Stack
        marginBlock={5}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        gap={5}
      >
        <AdminMenu />

        <Box width={"70%"}>
          <Paper elevation={2} sx={{ padding: 3 }}>
            <Stack gap={2}>
              <Typography variant="h5">User Profile</Typography>
              {/* <FormControl fullWidth> */}
              <InputLabel id="demo-simple-select-label">
                Select Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                placeholder="Select Category"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {" "}
                {categories?.map((c) => (
                  <MenuItem value={c._id}>{c.name}</MenuItem>
                ))}
              </Select>
              <Typography>{photo ? photo.name : "Upload Photo"}</Typography>
              <Input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                // hidden
              />
              {photo && (
                <Box>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                  />
                </Box>
              )}

              <TextField
                type="text"
                value={name}
                label="write a name"
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                type="text"
                value={description}
                label="write a description"
                onChange={(e) => setDescription(e.target.value)}
              />

              <TextField
                type="number"
                value={price}
                label="Write a Price"
                onChange={(e) => setPrice(e.target.value)}
                InputProps={{
                  inputProps: {
                    min: 0,
                    
                  },
                  endAdornment: <></>, 
                }}
              />

              <TextField
                type="number"
                value={quantity}
                label="write a quantity"
                onChange={(e) => setQuantity(e.target.value)}
                InputProps={{
                  inputProps: {
                    min: 0, 
                   
                  },
                  endAdornment: <></>, 
                }}
              />
              <label>select Shipping</label>
               <Select
                  placeholder="select shipping "
                   onChange={(value) => {
                     setShipping(value);
                   }}
                 >
                   <Option value="0">No</Option>
                   <Option value="1">Yes</Option>
                 </Select>
               
                 <Button variant="contained" onClick={handleCreate} disabled={loading}>
                   CREATE PRODUCT
                 </Button>
             
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Container>
   
  );
};

export default CreateProduct;
