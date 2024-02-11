import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAuth } from "../context/auth";
const ProductDetails = () => {
  const params = useParams();

  const navigate = useNavigate();

  const [cart, setCart] = useCart();
  const [auth, setauth] = useAuth();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //inital details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      console.log(data, "data from get product by params slug");
      setProduct(data?.product);

      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      // console.log(data);

      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <Container>
      <Stack alignItems={"center"} justifyContent={"center"} marginBlock={3}>
        <Paper elevation={3}>
          <Stack gap={5} alignItems={"center"}>
            <Typography variant="h5" fontWeight={600}>
              Product Detail
            </Typography>
            <Box width={"100%"} textAlign={"center"}>
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
                width={!matches ? "90%" : "70%"}
                height={!matches ? "90%" : "70%"}
              />
            </Box>

            <Stack width={!matches ? "90%" : "70%"} gap={3} mb={3}>
              <Typography variant="h5">Name : {product.name}</Typography>
              <Typography>Description : {product.description}</Typography>
              <Typography variant="h6">
                Price :<span style={{ color: "green" }}>₹{product.price}</span>
              </Typography>
              <Typography>Category : {product?.category?.name}</Typography>
              {auth?.token && (
                <>
                  {cart.some((item) => item._id === product._id) ? (
                    <Button
                      variant="contained"
                      // endIcon={cart}
                      endIcon={<AiOutlineShoppingCart />}
                      onClick={() => {
                        removeCartItem(product._id);
                        // setcart([...cart, p]);
                        // localStorage.setItem(
                        //   "cart",
                        //   JSON.stringify([...cart, p])
                        // );
                        // toast.success("Item added to cart");
                      }}
                    >
                      REMOVE
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      endIcon={<AiOutlineShoppingCart />}
                      onClick={() => {
                        // console.log(
                        //   cart.some((item) => item._id === product._id)
                        // );
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.success("Item added to cart");
                      }}
                    >
                      ADD
                    </Button>
                  )}
                </>
              )}

              {!auth?.token && (
                <Button
                  color="success"
                  variant="contained"
                  // endIcon={<AiOutlineShoppingCart />}
                  onClick={() => {
                    navigate("/login")
                  }}
                >
                  Login to Buy
                </Button>
              )}
            </Stack>
          </Stack>
        </Paper>
      </Stack>

      <Divider />

      <Stack
        flexWrap={"wrap"}
        justifyContent={"space-evenly"}
        gap={6}
        marginBlock={5}
      >
        <Typography variant="h5" textAlign={"center"} fontWeight={600}>
          Related Products
        </Typography>

        {relatedProducts?.map((p) => (
          <Card sx={{ width: "300px" }} key={p.name}>
            <CardMedia
              sx={{ height: "270px" }}
              image={`/api/v1/product/product-photo/${p._id}`}
              title={p.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {p.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {p.description.substring(0, 50)}...
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => navigate(`/product/${p.slug}`)}
                size="small"
                variant="contained"
              >
                More Deatil
              </Button>
              {auth?.token && (
                    <>
                      {cart.some((item) => item._id === p._id) ? (
                        <Button
                          variant="contained"
                          // endIcon={cart}
                          endIcon={<AiOutlineShoppingCart/>}
                          onClick={() => {
                            
                            removeCartItem(p._id)
                            // setcart([...cart, p]);
                            // localStorage.setItem(
                            //   "cart",
                            //   JSON.stringify([...cart, p])
                            // );
                            // toast.success("Item added to cart");
                          }}
                        >
                         REMOVE 
                        </Button>
                      ) : (
                       <Button
                          variant="contained"
                          endIcon={<AiOutlineShoppingCart/>}
                          onClick={() => {
                            // console.log(
                            //   cart.some((item) => item._id === p._id)
                            // );
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item added to cart");
                          }}
                        >
                          ADD 
                        </Button>
                      )}
                    </>
                  )}
              {/* <Button
                variant="contained"
                color="success"
                size="small"
                endIcon={<AiOutlineShoppingCart />}
                onClick={() => {
                  setCart([...cart, p]);
                  localStorage.setItem("cart", JSON.stringify([...cart, p]));
                  toast.success("Item added to cart");
                }}
              >
                Add to cart
              </Button> */}
            </CardActions>
          </Card>
        ))}

        {relatedProducts?.length === 0 && (
          <Typography variant="h5">No Product Found</Typography>
        )}
      </Stack>
    </Container>
  );
};

export default ProductDetails;
