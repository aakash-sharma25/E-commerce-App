import React, { useEffect, useState, CSSProperties  } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth';
import BounceLoader from 'react-spinners/BounceLoader'

const override= {
  display: "flex",
  height:"100vh",
  margin: "0 auto",
  borderColor: "red",
  alignItems:"center",
  justifyContent:"center",
  flexDirection:"column",
  gap:"10px",

};


const Spinner = ({path ="login"}) => {

    const location = useLocation();
    const navigate= useNavigate();
    const [count , setcount] = useState(5);
    const [auth,setAuth]= useAuth()

    useEffect(() => {
       const interval = setTimeout(() => {
            setcount( ( pre) => --pre)
        }, 1000);
        count === 0 && navigate(`/${path}` ,{
            state:location.pathname,
        })

        return () => {
          clearInterval(interval)
        }
    },[count , navigate ,location,path])

  return (
    <>
      <div style={override} >
        <BounceLoader color="#36d7b7" />
        <p>Login Required ! Redirecting to login in {count} seconds</p>
      </div>
    </>
  )
}

export default Spinner