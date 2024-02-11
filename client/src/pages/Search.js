import React from "react";
import { useSearch } from "../context/search";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAuth } from "../context/auth";
const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const [auth, setauth] = useAuth();
  const navigate = useNavigate();
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
    <Container >
       <Stack
        marginBlock={5}
        direction={"row"}
        gap={7}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {values?.results.map((p) => (
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
            </CardContent>
            <CardActions sx={{ p: 1}}>
              <Button
                variant="outlined"
                onClick={() => navigate(`/product/${p.slug}`)}
              >
                Details
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
                            // setCart([...cart, p]);
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
                // endIcon={cart}
                onClick={() => {
                  setCart([...cart, p]);
                  localStorage.setItem("cart", JSON.stringify([...cart, p]));
                  toast.success("Item added to cart");
                }}
              >
                ADD TO CART
              </Button> */}
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Container>
     
    </>
  );
};

export default Search;