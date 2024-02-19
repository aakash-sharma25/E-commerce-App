import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import moment from "moment";
import {
  Box,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Select,
  useMediaQuery,
  MenuItem
} from "@mui/material";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    // console.log(orderId,value?.target?.value)
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value?.target?.value,
      });
      toast.success("status updated successfully")
      getOrders();
    } catch (error) {
      toast.error("unable to change status")
      console.log(error);
    }
  };
  const matches = useMediaQuery('(min-width:800px)');
  return (
    <Container>
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
        <AdminMenu />

        <Box
          width={matches ? "70%" : "100%"}
          sx={{ overflow: "scroll" }}
          height={"90vh"}
        >
          {/* <Paper elevation={2} sx={{padding:3}}> */}
          <Typography variant="h4" textAlign={"center"} mb={3}>
            All Orders Detais
          </Typography>
          <Stack>
            {orders?.map((o, i) => {
              return (
                <Stack marginBlock={2}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>#</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Buyer</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Payment</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Quantity</TableCell>
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
                        <Select
                          // bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <MenuItem key={i} value={s}>
                              {s}
                            </MenuItem>
                          ))}
                        </Select>
                        <TableCell scope="row">{o?.buyer?.name}</TableCell>
                        <TableCell scope="row">
                          {moment(o?.createAt).fromNow()}
                        </TableCell>
                        <TableCell scope="row">
                          {o?.payment.success ? "Success" : "Failed"}
                        </TableCell>
                        <TableCell scope="row">{o?.products?.length}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Stack gap={3}>
                    {o?.products?.map((p, i) => (
                      <Stack direction={"row"} gap={3} key={p._id}>
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          width="250px"
                          // height={"100px"}
                        />

                        <Stack gap={3}>
                          <Typography>{p.name}</Typography>
                          <Typography>
                            {p.description.substring(0, 30)}...
                          </Typography>
                          <Typography fontWeight={600}>
                            Price : ₹{p.price}
                          </Typography>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              );
            })}
          </Stack>

          {/* </Paper> */}
        </Box>
      </Stack>
    </Container>
    // <div title={"All Orders Data"}>
    //   <div className="row dashboard">
    //     <div className="col-md-3">
    //       <AdminMenu />
    //     </div>
    //     <div className="col-md-9">
    //       <h1 className="text-center">All Orders</h1>
    //       {orders?.map((o, i) => {
    //         return (
    //           <div className="border shadow">
    //             <table className="table">
    //               <thead>
    //                 <tr>
    //                   <th scope="col">#</th>
    //                   <th scope="col">Status</th>
    //                   <th scope="col">Buyer</th>
    //                   <th scope="col"> date</th>
    //                   <th scope="col">Payment</th>
    //                   <th scope="col">Quantity</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 <tr>
    //                   <td>{i + 1}</td>
    //                   <td>
    //                     <Select
    //                       bordered={false}
    //                       onChange={(value) => handleChange(o._id, value)}
    //                       defaultValue={o?.status}
    //                     >
    //                       {status.map((s, i) => (
    //                         <Option key={i} value={s}>
    //                           {s}
    //                         </Option>
    //                       ))}
    //                     </Select>
    //                   </td>
    //                   <td>{o?.buyer?.name}</td>
    //                   <td>{moment(o?.createAt).fromNow()}</td>
    //                   <td>{o?.payment.success ? "Success" : "Failed"}</td>
    //                   <td>{o?.products?.length}</td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //             <div className="container">
    //               {o?.products?.map((p, i) => (
    //                 <div className="row mb-2 p-3 card flex-row" key={p._id}>
    //                   <div className="col-md-4">
    //                     <img
    //                       src={`/api/v1/product/product-photo/${p._id}`}
    //                       className="card-img-top"
    //                       alt={p.name}
    //                       width="100px"
    //                       height={"100px"}
    //                     />
    //                   </div>
    //                   <div className="col-md-8">
    //                     <p>{p.name}</p>
    //                     <p>{p.description.substring(0, 30)}</p>
    //                     <p>Price : {p.price}</p>
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </div>
  );
};

export default AdminOrders;
