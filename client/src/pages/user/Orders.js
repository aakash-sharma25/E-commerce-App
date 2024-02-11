import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/auth";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Navigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const matches = useMediaQuery('(min-width:800px)');
  return (
    <>
      <Container >
        <Stack
          // height={"50vh"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          flexWrap={"wrap"}
          gap={5}
          marginBlock={5}
          // sx={{overflow:"scroll"}}
        >
          <UserMenu />

          <Box width={matches?"70%":"100%"} sx={{overflow:"scroll"}} height={"80vh"} >
            {/* <Paper elevation={2} sx={{padding:3}}> */}
            <Typography variant="h4" textAlign={"center"} mb={3}>
              Your Orders
            </Typography>
            <Stack >
              {orders?.map((o, i) => {
                return (
                  <Stack>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>#</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Buyer</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>
                            Payment
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>
                            Quantity
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell scope="row">{i + 1}</TableCell>
                          <TableCell scope="row">{o?.status}</TableCell>
                          <TableCell scope="row">{o?.buyer?.name}</TableCell>
                          <TableCell scope="row">
                            {moment(o?.createAt).fromNow()}
                          </TableCell>
                          <TableCell scope="row">
                            {o?.payment.success ? "Success" : "Failed"}
                          </TableCell>
                          <TableCell scope="row">
                            {o?.products?.length}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                          <Stack  gap={3}>
                             {o?.products?.map((p, i) => (
                      <Stack direction={"row"} gap={3} key={p._id}>
                              
                                  <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            
                            alt={p.name}
                            width="250px"
                          />
                        
                        <Stack gap={3} >
                          <Typography>{p.name}</Typography>
                          <Typography>{p.description.substring(0, 30)}...</Typography>
                          <Typography fontWeight={600}>Price : ₹{p.price}</Typography>
                       <Button onClick={()=>{}} variant="contained">View</Button>
                        </Stack>
                           
                        
                      </Stack>
                    ))}
                          </Stack>
                   
                  </Stack>
                );
              })}

              {/* {orders?.map((o, i) => {
              return (
                <Box >
                  <table >
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Box>
              );
            })}
           */}
            </Stack>

            {/* </Paper> */}
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default Orders;
