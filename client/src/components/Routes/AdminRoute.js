import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

const AdminRoute = () => {
    const [ok, setok] = useState(false);
    const [auth ,setauth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("/api/v1/auth/admin-auth");
            // console.log(res);
            if(res.data.ok) {
                setok(true)
            }else{
                setok(false);
            }
    }
    if(auth?.token) authCheck() ;  
},[auth?.token])
  return ok ? (<Outlet/>) :<Spinner path=""/>
}

export default AdminRoute