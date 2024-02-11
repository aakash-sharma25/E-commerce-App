import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { CgProfile } from "react-icons/cg";
import { MdOutlineBorderColor } from "react-icons/md";
const AdminMenu = () => {
  
  const [selectedIndex, setselectedIndex] = useState(null);
  const navigate = useNavigate();
  return (
    <>
      <Box>
      <Typography variant="h4">Admin Panel</Typography>
      <List component="nav">
        <ListItemButton
          selected={selectedIndex === 0}
          // sx={selectedIndex===0 && {backgroundColor:"blue" ,color:"white"}}
          onClick={() => {
            setselectedIndex(0);
            navigate("/dashboard/admin/create-category");
          }}
        >
          <ListItemIcon>
          <MdOutlineBorderColor />
          </ListItemIcon>
          <ListItemText primary="Create Category" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 1}
          // sx={selectedIndex===1 && {backgroundColor:"blue" ,color:"white"}}
          onClick={() => {
            setselectedIndex(0);
            navigate("/dashboard/admin/create-product");
          }}
        >
          <ListItemIcon>
            <MdOutlineBorderColor />
          </ListItemIcon>
          <ListItemText primary="Create Products" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          // sx={selectedIndex===1 && {backgroundColor:"blue" ,color:"white"}}
          onClick={() => {
            setselectedIndex(0);
            navigate("/dashboard/admin/products");
          }}
        >
          <ListItemIcon>
            <MdOutlineBorderColor />
          </ListItemIcon>
          <ListItemText primary=" Products" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          // sx={selectedIndex===1 && {backgroundColor:"blue" ,color:"white"}}
          onClick={() => {
            setselectedIndex(0);
            navigate("/dashboard/admin/orders");
          }}
        >
          <ListItemIcon>
            <MdOutlineBorderColor />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          // sx={selectedIndex===1 && {backgroundColor:"blue" ,color:"white"}}
          onClick={() => {
            setselectedIndex(0);
            navigate("/dashboard/admin/users");
          }}
        >
          <ListItemIcon>
          <CgProfile />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      </List>
    </Box>
      {/* <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
             Products 
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
             Orders
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
        </div>
      </div> */}
    </>
  );
};

export default AdminMenu;