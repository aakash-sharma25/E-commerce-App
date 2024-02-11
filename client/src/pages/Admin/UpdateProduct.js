import React, { useState, useEffect } from "react";

import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu";
import {
  Box,
  Button,
  Container,
  Input,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      console.log(data, "from set single product");
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      console.log(data, "all category");
      if (data?.success) {
        setCategories(data?.allCategories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer || answer === "NO" || answer === "no" || answer === "No")
        return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Succfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
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

          <Stack
            width={"60%"}
            marginBlock={2}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
          >
            <Typography variant="h5">Update Product</Typography>

            <Select
              fullWidth
              onChange={(value) => {
                setCategory(value);
              }}
              value={category}
            >
              {categories?.map((c) => (
                <MenuItem key={c._id} value={c._id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
            <Input
              fullWidth
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />

            <Box>
              {photo ? (
                <Box>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    width={"200px"}
                  />
                </Box>
              ) : (
                <Box>
                  <img
                    src={`/api/v1/product/product-photo/${id}`}
                    alt="product_photo"
                    height={"200px"}
                    width={"200px"}
                  />
                </Box>
              )}
            </Box>

            <TextField
              type="text"
              fullWidth
              value={name}
              label="write a name"
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              type="text"
              fullWidth
              value={description}
              label="write a description"
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              type="number"
              fullWidth
              value={price}
              label="write a Price"
              onChange={(e) => setPrice(e.target.value)}
            />

            <TextField
              fullWidth
              type="number"
              value={quantity}
              label="write a quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />

            {/* <Select fullWidth
              label="Select Shipping "
              onChange={(value) => {
                setShipping(value);
              }}
              value={shipping ? "yes" : "No"}
            >
              <MenuItem value="false">No</MenuItem>
              <MenuItem value="true">Yes</MenuItem>
            </Select> */}

            <Button variant="contained" onClick={handleUpdate}>
              UPDATE PRODUCT
            </Button>

            <Button variant="contained" color="error" onClick={handleDelete}>
              DELETE PRODUCT
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
    // <div >
    //   <div className="container-fluid m-3 p-3">
    //     <div className="row">
    //       <div className="col-md-3">
    //         <AdminMenu />
    //       </div>
    //       <div className="col-md-9">
    //         <h1>Update Product</h1>
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
    //             value={category}
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
    //             {photo ? (
    //               <div className="text-center">
    //                 <img
    //                   src={URL.createObjectURL(photo)}
    //                   alt="product_photo"
    //                   height={"200px"}
    //                   className="img img-responsive"
    //                 />
    //               </div>
    //             ) : (
    //               <div className="text-center">
    //                 <img
    //                   src={`/api/v1/product/product-photo/${id}`}
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
    //               value={shipping ? "yes" : "No"}
    //             >
    //               <Option value="0">No</Option>
    //               <Option value="1">Yes</Option>
    //             </Select>
    //           </div>
    //           <div className="mb-3">
    //             <button className="btn btn-primary" onClick={handleUpdate}>
    //               UPDATE PRODUCT
    //             </button>
    //           </div>
    //           <div className="mb-3">
    //             <button className="btn btn-danger" onClick={handleDelete}>
    //               DELETE PRODUCT
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default UpdateProduct;
