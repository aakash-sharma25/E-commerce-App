import { useState, useContext, createContext, useEffect } from "react";

const ThemeContext = createContext();
const CartProvider = ({ children }) => {
  const [mode, setmode] = useState("light");

  useEffect(() => {
    let mode = localStorage.getItem("mode");

    // let existingCartItem = localStorage.getItem("cart");
    // if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  return (
    <ThemeContext.Provider value={[cart, setCart]}>
      {children}
    </ThemeContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(ThemeContext);

export { useCart, ThemeProvider };