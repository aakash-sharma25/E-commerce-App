import React, { useState, useEffect } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
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
          >
            <Box
              sx={{
                overflow: "scroll",
                textAlign:"center",
                
              }}
              height={"80vh"}
              width={"100%"}
            >
            <Typography variant="h5" textAlign={"center"}>All Products</Typography>
              {products?.map((p) => (
                <Card s sx={{ maxWidth: 400, marginBlock: 2 }}>
                  <CardMedia
                    sx={{ height: 150 }}
                    image={`/api/v1/product/product-photo/${p._id}`}
                    title="Product Image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {p.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {p.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() =>
                        navigate(`/dashboard/admin/product/${p.slug}`)
                      }
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Box>

            {/* <Paper elevation={2} sx={{ padding: 3 }}>
              <Typography variant="h6">All Products List</Typography>
              <Stack
                // overflow={"scroll"}
                height={"100vh"}
                gap={3}
                alignItems={"center"}
                justifyContent={"center"}
                // width={"80%"}
              >
                {products?.map((p) => (
                  <Box width={"80%"}>
                     <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} style={{textDecoration:"none"}}>
                    <Stack gap={2} >
                      <img
                      style={{textAlign:"center"}}
                        src={`/api/v1/product/product-photo/${p._id}`}
                        height={300}
                        width={300}
                        alt={p.name}
                      />
                      <Stack gap={2}>
                        <Typography>{p.name}</Typography>
                        <Typography>{p.description}</Typography>
                      </Stack>
                    </Stack>
                    <Divider />
                  </Link>
                  </Box>
                 
                ))}
              </Stack>
            </Paper> */}
          </Stack>
        </Stack>
      </Container>
      {/* <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Products;
