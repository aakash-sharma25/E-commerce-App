import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineBorderColor } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
const UserMenu = () => {
  const [selectedIndex, setselectedIndex] = useState(null);
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h4">Dashboard</Typography>
      <List component="nav">
        <ListItemButton
          selected={selectedIndex === 0}
          // sx={selectedIndex===0 && {backgroundColor:"blue" ,color:"white"}}
          onClick={() => {
            setselectedIndex(0);
            navigate("/dashboard/user/profile");
          }}
        >
          <ListItemIcon>
            <CgProfile />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 1}
          // sx={selectedIndex===1 && {backgroundColor:"blue" ,color:"white"}}
          onClick={() => {
            setselectedIndex(0);
            navigate("/dashboard/user/orders");
          }}
        >
          <ListItemIcon>
            <MdOutlineBorderColor />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
      </List>
    </Box>
   
  );
};

export default UserMenu;
