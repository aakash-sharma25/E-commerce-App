import React from "react";
import {

  Drawer,

} from "@mui/material";

export default function SideDrawer({ list, open }) {
  return (
    <Drawer
      variant="persistent"
      // anchor={open}

      open={open}
      // onClose={()=>setopen(false)}
    >
      {list()}
    </Drawer>
  );
}
