import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import SearchInput from "../Forms/SearchInput";
// import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { MdMenuOpen } from "react-icons/md";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { TbHome, TbLogin2 } from "react-icons/tb";
import { AiOutlineLogin, AiOutlineShoppingCart } from "react-icons/ai";
import SideDrawer from "../SideDrawer";
import { FaUser } from "react-icons/fa";
// import { IoClose } from "react-icons/io5";

const Header = () => {
  const matches = useMediaQuery("(min-width:850px)");

  // const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [open, setopen] = useState(false);
  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [auth, setauth] = useAuth();
  const [cart, setcart] = useCart();
  // const categories = useCategory();
  const navigate = useNavigate();
  const handleLogout = () => {
    setauth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");

    navigate("/login");
    toast.success("Logout successfull");
  };

  const list = () => {
    return (
      <Stack
        direction={"column"}
        spacing={3}
        sx={{ marginTop: 10 }}
        padding={5}
      >
        {" "}
        <Link to={"/"} >
          <Button endIcon={<TbHome />}>Home</Button>{" "}
        </Link>
        <Button>
          <Link style={{ textDecoration: "none" }} to={"/categories"}>
            Categories
          </Link>
        </Button>
        {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            sx={{ color: "black" }}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            {categories.map((m) => (
              <MenuItem>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/category/${m.slug}`}
                >
                  {m.name}
                </Link>
              </MenuItem>
            ))}
            <MenuItem>
              <Link style={{ textDecoration: "none" }} to={"/categories"}>
                All categories
              </Link>
            </MenuItem>
          </Select>
        </FormControl> */}
        {!auth.user ? (
          <Stack direction={"column"} spacing={3}>
            <Button endIcon={<TbLogin2 />}>
              <Link to={"/register"} style={{ textDecoration: "none" }}>
                Register
              </Link>
            </Button>
            <Button endIcon={<AiOutlineLogin />}>
              <Link to={"/login"} style={{ textDecoration: "none" }}>
                Login
              </Link>
            </Button>
          </Stack>
        ) : (
          <>
            <Tooltip title={auth?.user?.name}>
              {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      Profile */}
              {/* <Avatar alt="Remy Sharp">{auth?.user?.name[0]}</Avatar> */}

              {/* </IconButton> */}
              <Button onClick={handleOpenUserMenu} endIcon={<FaUser />}>
                Profile
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {" "}
              <MenuItem onClick={handleCloseUserMenu}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                >
                  Dashboard
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleLogout();

                  handleCloseUserMenu();
                }}
                sx={{ color: "red", fontWeight: "500px" }}
              >
                Logout
              </MenuItem>
            </Menu>
            <Button endIcon={<AiOutlineShoppingCart />}>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                Cart
              </Link>
            </Button>
          </>
        )}
        <Divider />
      </Stack>
    );
  };
  return (
    <>
      <Box>
        <SideDrawer list={list} open={open} />
        <AppBar sx={{ backgroundColor: "white", color: "black", zIndex: 2000 }}>
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography>Gadget Galaxy</Typography>

              <SearchInput />

              {matches ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    columnGap: 2,
                  }}
                >
                  <Button endIcon={<TbHome />}>
                    <Link to={"/"} style={{ textDecoration: "none" }}>
                      Home
                    </Link>
                  </Button>

                  {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      sx={{ color: "black" }}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {categories.map((m) => (
                        <MenuItem>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/category/${m.slug}`}
                          >
                            {m.name}
                          </Link>
                        </MenuItem>
                      ))}
                      <MenuItem>
                        <Link
                          style={{ textDecoration: "none" }}
                          to={"/categories"}
                        >
                          All categories
                        </Link>
                      </MenuItem>
                    </Select>
                  </FormControl> */}
                  <Button>
                    <Link style={{ textDecoration: "none" }} to={"/categories"}>
                      Categories
                    </Link>
                  </Button>

                  {!auth.user ? (
                    <Box>
                      <Button endIcon={<TbLogin2 />}>
                        <Link
                          to={"/register"}
                          style={{ textDecoration: "none" }}
                        >
                          Register
                        </Link>
                      </Button>
                      <Button endIcon={<AiOutlineLogin />}>
                        <Link to={"/login"} style={{ textDecoration: "none" }}>
                          Login
                        </Link>
                      </Button>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                      }}
                    >
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar alt="Remy Sharp">
                            {auth?.user?.name[0]}
                          </Avatar>
                          {/* <Avatar > A </Avatar> */}
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: "55px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        {" "}
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                          >
                            Dashboard
                          </Link>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleLogout();

                            handleCloseUserMenu();
                          }}
                          sx={{ color: "red", fontWeight: "500px" }}
                        >
                          Logout
                        </MenuItem>
                      </Menu>

                      <Box
                        sx={{
                          fontSize: "30px",
                          cursor: "pointer",
                          color: "blue",
                        }}
                      >
                        <Badge badgeContent={cart?.length} color="secondary">
                          <AiOutlineShoppingCart
                            onClick={() => navigate("/cart")}
                          />
                        </Badge>
                      </Box>
                    </Box>
                  )}
                </Box>
              ) : (
                <MdMenuOpen
                  fontSize={30}
                  cursor={"pointer"}
                  onClick={() => setopen(!open)}
                />
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
    </>
  );
};

export default Header;
