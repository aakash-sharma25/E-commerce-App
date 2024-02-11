import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Container> 
     
      <Stack height={"50vh"} direction={"row"} alignItems={"center"} justifyContent={"center"} flexWrap={"wrap"} gap={5}>
        <UserMenu />
    
      <Box width={"70%"}>
        <Paper elevation={2} sx={{padding:3}}>
          <Typography variant="h5" marginBlock={1}>Name:  {auth?.user?.name}</Typography>
          <Typography variant="h5" marginBlock={1}>Email:  {auth?.user?.email}</Typography>
          <Typography variant="h5" marginBlock={1}>Address : {auth?.user?.address}</Typography>
        </Paper>
      </Box>
  </Stack>
     
    </Container>
  );
};

export default Dashboard;
