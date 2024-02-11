import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { AiFillCaretLeft, AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [cart, setCart] = useCart();
  const [auth, setauth] = useAuth();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    // console.log(cart);
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    setloading(true);
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
      setloading(false);
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
  return (
    <>
      {loading ? (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        </>
      ) : (
        <>
          <Container
            sx={{
              marginTop: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography>Category - {category?.name} </Typography>
            <Typography>{products?.length} - product found </Typography>
            <Stack
              direction="row"
              flexWrap="wrap"
              spacing={5}
              marginTop={"50px"}
            >
              {products?.map((p) => (
                <Card sx={{ maxWidth: "18rem" }} key={p.name}>
                  <CardMedia
                    sx={{ height: "9rem", ":hover": "cursor:pointer" }}
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
                            endIcon={<AiOutlineShoppingCart />}
                            onClick={() => {
                              removeCartItem(p._id);
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
                    {/* <Button variant="contained" color="success" size="small" endIcon={<AiOutlineShoppingCart />} onClick={()=>{
                       setcart([...cart,p])
                    localStorage.setItem("cart" , JSON.stringify([...cart,p]))
                    toast.success("Item added to cart")
                  
                    }}>
                      Add to cart
                    </Button> */}
                    {/* {cart.some((item) => item._id === p._id) ? (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        endIcon={<AiOutlineShoppingCart />}
                        onClick={() => {
                          setcart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item added to cart");
                        }}
                      >
                        Remove from cart
                      </Button>
                    ) : (
                      "cart"
                    )} */}
                  </CardActions>
                </Card>
              ))}
            </Stack>
          </Container>
        </>
      )}
    </>

    // <div>
    //   <div className="container mt-3">
    //     <h4 className="text-center">Category - {category?.name}</h4>
    //     <h6 className="text-center">{products?.length} result found </h6>
    //     <div className="row">
    //       <div className="col-md-9 offset-1">
    //         <div className="d-flex flex-wrap">
    //           {products?.map((p) => (
    //             <div
    //               className="card m-2"
    //               style={{ width: "18rem" }}
    //               key={p._id}
    //             >
    //               <img
    //                 src={`/api/v1/product/product-photo/${p._id}`}
    //                 className="card-img-top"
    //                 alt={p.name}
    //               />
    //               <div className="card-body">
    //                 <h5 className="card-title">{p.name}</h5>
    //                 <p className="card-text">
    //                   {p.description.substring(0, 30)}...
    //                 </p>
    //                 <p className="card-text"> $ {p.price}</p>
    //                 <button
    //                   className="btn btn-primary ms-1"
    //                   onClick={() => navigate(`/product/${p.slug}`)}
    //                 >
    //                   More Details
    //                 </button>
    //                 <button className="btn btn-secondary ms-1">
    //                   ADD TO CART
    //                 </button>
    //               </div>
    //             </div>
    //           ))}
    //         </div>

    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CategoryProduct;
