import React, { useEffect, useState } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { AiOutlineShoppingCart } from "react-icons/ai";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
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
  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // cart?.map((m)=>{
    //   console.log(m._id);
    // })
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const matches = useMediaQuery('(min-width:1024px)');
  return (
    <>
      <Container>
        <Stack marginBlock={5}>
          <Typography variant="h4" textAlign={"center"}>
            {" "}
            {`Hello ${auth?.token && auth?.user?.name}`}
          </Typography>
          <Typography textAlign={"center"} variant="h6">
            {" "}
            {cart?.length
              ? `You Have ${cart.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout"
                }`
              : " Your Cart Is Empty"}{" "}
          </Typography>
        </Stack>
        {/* <div className="row"> */}
        <Stack
          justifyContent={"center"}
           alignItems={"center"}
          marginBlock={5}
          direction={"row"}
          gap={7}
          flexWrap={"wrap-reverse"}
      
        >
        <Stack direction={"row"} flexWrap={"wrap"} alignItems={"center"} justifyContent={"center"}  gap={3}>
            {cart?.map((p) => (
            <Card sx={{ width: 300 }}>
              <CardMedia
                sx={{ height: 150 }}
                image={`/api/v1/product/product-photo/${p._id}`}
                title={p.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {p.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {p.description.substring(0, 30)}...
                </Typography>
                <Typography variant="body2">Price :₹{p.price}</Typography>
              </CardContent>
              <CardActions sx={{ p: 1 }}>
                <Button
                endIcon={<AiOutlineShoppingCart/>}
                  variant="outlined"
                  onClick={() => removeCartItem(p._id)}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
        {
          cart?.length > 0 && (
            <Stack width={!matches?"100%":"30%"}  gap={2} alignItems={"center"} justifyContent={"center"}>
                <Typography variant="h4">Cart Summary</Typography>
                <Typography variant="h5">Total | Checkout | Payment</Typography>
              
                <Typography variant="h5">Total : ₹{totalPrice() } </Typography>
                {auth?.user?.address ? (
              <>
                <Stack gap={2} alignItems={"center"} >
                  <Typography>Your Current Address</Typography>
                  <Typography>{auth?.user?.address}</Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </Button>
                </Stack>
              </>
            ) : (
              <Box >
                {auth?.token ? (
                  <Button
                   
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </Button>
                )}
              </Box>
            )}
            <Box>
            {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <Button
                    variant="contained"
                    color="success"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </Button>
                </>
              )}
            </Box>
              </Stack>
          )
        }
              
          {/* <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}

            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div> */}
        </Stack>
      </Container>
    </>
  );
};

export default CartPage;
