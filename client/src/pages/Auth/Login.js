import React, { useEffect, useState } from "react";
// import Layout from '../../components/Layout/Layout'
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { IoEyeOutline } from "react-icons/io5";
import { HiEyeOff, HiSave } from "react-icons/hi";
import { FaSave } from "react-icons/fa";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const Login = () => {
  const [auth, setauth] = useAuth();
  const [loading, setloading] = useState(false);

  const [visible, setvisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const islogin = async () => {
    setloading(true);
    const data = await localStorage.getItem("auth");
    if (data) {
      const token = await JSON.parse(data);
      const response = await axios.get("/api/v1/auth/user-auth", {
        headers: {
          Authorization: `${token.token}`,
        },
      });
      setloading(false);
      console.log(response);
      if (response?.data?.ok) {
        navigate("/");
      }
    } else {
      setloading(false);
    }
  };
  useEffect(() => {
    islogin();
  }, []);

  const submitHandler = async (e) => {
    setloading(true);
    e.preventDefault();
    try {
      const email = formdata.email;
      const password = formdata.password;
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setauth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
        setloading(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setloading(false);
      toast.error(error.response.data.message);
      console.log("error aa gaya hai frontend mai register page");
      console.log(error);
    }
  };

  const changeHandler = (event) => {
    setformdata({
      ...formdata,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <form
          style={{ background: "#ffffff", padding: "5%" }}
          onSubmit={submitHandler}
        >
          <Stack direction="column" spacing={3}>
            <Box>
              <Typography className="text-border" variant="h4">
                Login
              </Typography>
            </Box>
            <Stack spacing={1} direction={"column"}>
              {/* <Typography>Enter Email Address : </Typography> */}
              <TextField
                required
                name="email"
                type="email"
                label="Enter Email"
                variant="outlined"
                onChange={changeHandler}
                value={formdata.email}
              />
            </Stack>
            <Stack spacing={1} direction={"column"}>
              <TextField
                required
                name="password"
                label="Enter Password"
                type={!visible ? "password" : "text"}
                variant="outlined"
                onChange={changeHandler}
                value={formdata.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setvisible(!visible)}
                        edge="end"
                      >
                        {visible ? <HiEyeOff /> : <IoEyeOutline />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="span">
                Forgot Password ?{" "}
                <Typography
                  onClick={() => {
                    navigate("/forgot-password");
                  }}
                  variant="span"
                  sx={{ color: "blue", cursor: "pointer" }}
                >
                  Click Here
                </Typography>{" "}
              </Typography>
            </Stack>

            <Button
              type="submit"
              disabled={loading}
              variant="contained"
              endIcon={!loading && <FaSave />}
            >
              {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>

            <Button
              disabled={loading}
              variant="contained"
              // endIcon={!loading && <FaSave />}
              onClick={(e) => {
                setformdata({
                  email:"guest@guest.com",
                  password: "123456",
                });
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Guest credential"}
            </Button>
          </Stack>
          <Box marginTop={4}>
            <Typography variant="span">
              Dont Have Account ?{" "}
              <Typography
                onClick={() => {
                  navigate("/register");
                }}
                variant="span"
                sx={{ color: "blue", cursor: "pointer" }}
              >
                Register Here .
              </Typography>{" "}
            </Typography>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default Login;
