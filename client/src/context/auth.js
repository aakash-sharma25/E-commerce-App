import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

const Authprovider = ({ children }) => {
  const [auth, setauth] = useState({
    user: null,
    token: "",
  });

  //setting the default headers in every axios request  => 
  // matlab har axios request me abb header jayaga with token

  axios.defaults.headers.common["Authorization"] = auth?.token

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setauth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  },[ ]);
  return (
    <AuthContext.Provider value={[auth, setauth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, Authprovider };