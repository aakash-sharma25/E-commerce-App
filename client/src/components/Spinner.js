import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Spinner = ({path ="login"}) => {

    const location = useLocation();
    const navigate= useNavigate();
    const [count , setcount] = useState(5);

    useEffect(() => {
       const interval = setTimeout(() => {
            setcount( ( pre) => --pre)
        }, 1000);
        count === 0 && navigate(`/${path}` ,{
            state:location.pathname,
        })

        return () => clearInterval(interval)
    },[count , navigate ,location,path])

  return (
    <p>Login required redirecting to login in {count} seconds</p>
  )
}

export default Spinner