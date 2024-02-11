import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Box, Button, CircularProgress, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { HiEyeOff } from 'react-icons/hi';
import { IoEyeOutline } from 'react-icons/io5';
import { FaSave } from 'react-icons/fa';

const ForgotPassword = () => { 

    const [auth , setauth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation() ;
    
      const [formdata, setformdata] = useState({
        email: "",
        password: "",
        answer:"",
      });

      const [loading,setloading]= useState(false);
      const [visible,setvisible]= useState(false);
    
      const submitHandler = async (e) =>{
        setloading(true)
        e.preventDefault();
        // console.log(formdata);
        try {
          const email=formdata.email;
          const password=formdata.password;
          const answer=(formdata.answer).toLowerCase();
          const res = await axios.post("/api/v1/auth/forgot-password", {
            email,
            password,
            answer,
          });
          setloading(false)
          if (res && res.data.success) {
  
            toast.success(res.data && res.data.message);
            navigate("/login");

          } else {
            
            toast.error(res.data.message);
          }
    
        } catch (error) {
          toast.error(error.response.data.message);
          console.log("error in frontend , register page");
          // console.log(error)
        }
      }
    
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
          <Stack direction="column" spacing={5}>
            <Box>
              <Typography className="text-border" variant="h4">
                Forgot Password
              </Typography>
            </Box>
            <Stack spacing={1} direction={"column"}>
              {/* <Typography>Enter Email Address : </Typography> */}
              <TextField
                // size="small"
                required
                name="email"
                type="email"
                id="outlined-basic"
                label="Enter Email"
                value={formdata.email}
                // placeholder="Email"
                variant="outlined"
                onChange={changeHandler}
              />
            </Stack>
            <Stack spacing={1} direction={"column"}>
              {/* <Typography>Enter Password</Typography>{" "} */}
              <TextField
                // size="small"
                required
                name="password"
                id="outlined-basic"
                value={formdata.password}
                label="Enter new Password"
               
                type={!visible ? "password" : "text"}
                variant="outlined"
                onChange={changeHandler}
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
            </Stack>
            <Stack spacing={1} direction={"column"}>
              {/* <Typography>Enter Email Address : </Typography> */}
              <TextField
                // size="small"
                required
                name="answer"
                type="text"
                id="outlined-basic"
                label="Enter Your favourite place"
                // placeholder="Email"
                variant="outlined"
                value={formdata.answer}
                onChange={changeHandler}
              />
            </Stack>

            <Button
              type="submit"
              // disabled={loading}
              onClick={submitHandler}
              variant="contained"
              endIcon={!loading && <FaSave />}
            >
              {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Stack>
         
         
        </form>
      </Box>
        </>
        // <div>
        //   <form onSubmit={submitHandler}>
        //     <div className="mb-3">
        //       <input
        //         type="email"
        //         placeholder="email"
        //         className="form-control"
        //         name="email"
        //         value={formdata.email}
        //         onChange={changeHandler}
        //       />
        //     </div>

        //     <div className="mb-3">
        //       <input
        //         type="password"
        //         placeholder="password"
        //         className="form-control"
        //         name="password"
        //         value={formdata.password}
        //         onChange={changeHandler}
        //       />
        //     </div>
        //     <div className="mb-3">
        //       <input
        //         type="text"
        //         placeholder="Enter your fovourite place"
        //         className="form-control"
        //         name="answer"
        //         value={formdata.answer}
        //         onChange={changeHandler}
        //       />
        //     </div>
    
        //     <button type="submit" className="btn btn-primary">
        //       reset password
        //     </button>

        //   </form>
        // </div>
  )
}

export default ForgotPassword