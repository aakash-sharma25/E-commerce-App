import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Box } from '@mui/material'

const Layout = ({children}) => {
  return (
    <Box style={{ minHeight:"100vh",display:'flex' , flexDirection:"column" , justifyContent:"space-between"}}>
    <Box>
        <Header/>
        <Box flex={1} >
      
        {children}

        </Box>
    </Box>
        
        <Footer/>
    </Box>
  )
}

export default Layout