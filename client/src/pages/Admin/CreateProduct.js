import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
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
      console.log("data response on create-product", data);
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
                label="write a Price"
                onChange={(e) => setPrice(e.target.value)}
                InputProps={{
                  inputProps: {
                    min: 0, // Set the minimum value
                    
                  },
                  endAdornment: <></>, // Empty fragment to hide the icons
                }}
              />

              <TextField
                type="number"
                value={quantity}
                label="write a quantity"
                onChange={(e) => setQuantity(e.target.value)}
                InputProps={{
                  inputProps: {
                    min: 0, // Set the minimum value
                   
                  },
                  endAdornment: <></>, // Empty fragment to hide the icons
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
               
                 <Button variant="contained" onClick={handleCreate}>
                   CREATE PRODUCT
                 </Button>
             
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Container>
    // <div >
    //   <div className="container-fluid m-3 p-3">
    //     <div className="row">
    //       <div className="col-md-3">
    //         <AdminMenu />
    //       </div>
    //       <div className="col-md-9">
    //         <h1>Create Product</h1>
    //         <div className="m-1 w-75">
    //           <Select
    //             bordered={false}
    //             placeholder="Select a category"
    //             size="large"
    //             showSearch
    //             className="form-select mb-3"
    //             onChange={(value) => {
    //               setCategory(value);
    //             }}
    //           >
    //             {categories?.map((c) => (
    //               <Option key={c._id} value={c._id}>
    //                 {c.name}
    //               </Option>
    //             ))}
    //           </Select>
    //           <div className="mb-3">
    //             <label className="btn btn-outline-secondary col-md-12">
    //               {photo ? photo.name : "Upload Photo"}
    //               <input
    //                 type="file"
    //                 name="photo"
    //                 accept="image/*"
    //                 onChange={(e) => setPhoto(e.target.files[0])}
    //                 hidden
    //               />
    //             </label>
    //           </div>
    //           <div className="mb-3">
    //             {photo && (
    //               <div className="text-center">
    //                 <img
    //                   src={URL.createObjectURL(photo)}
    //                   alt="product_photo"
    //                   height={"200px"}
    //                   className="img img-responsive"
    //                 />
    //               </div>
    //             )}
    //           </div>
    //           <div className="mb-3">
    //             <input
    //               type="text"
    //               value={name}
    //               placeholder="write a name"
    //               className="form-control"
    //               onChange={(e) => setName(e.target.value)}
    //             />
    //           </div>
    //           <div className="mb-3">
    //             <textarea
    //               type="text"
    //               value={description}
    //               placeholder="write a description"
    //               className="form-control"
    //               onChange={(e) => setDescription(e.target.value)}
    //             />
    //           </div>

    //           <div className="mb-3">
    //             <input
    //               type="number"
    //               value={price}
    //               placeholder="write a Price"
    //               className="form-control"
    //               onChange={(e) => setPrice(e.target.value)}
    //             />
    //           </div>
    //           <div className="mb-3">
    //             <input
    //               type="number"
    //               value={quantity}
    //               placeholder="write a quantity"
    //               className="form-control"
    //               onChange={(e) => setQuantity(e.target.value)}
    //             />
    //           </div>
    //           <div className="mb-3">
    //             <Select
    //               bordered={false}
    //               placeholder="Select Shipping "
    //               size="large"
    //               showSearch
    //               className="form-select mb-3"
    //               onChange={(value) => {
    //                 setShipping(value);
    //               }}
    //             >
    //               <Option value="0">No</Option>
    //               <Option value="1">Yes</Option>
    //             </Select>
    //           </div>
    //           <div className="mb-3">
    //             <button className="btn btn-primary" onClick={handleCreate}>
    //               CREATE PRODUCT
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CreateProduct;
