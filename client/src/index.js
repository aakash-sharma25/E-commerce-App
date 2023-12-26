import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Authprovider } from "./context/auth";
import { SearchProvider } from "./context/search";
import { CartProvider } from "./context/cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Authprovider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </Authprovider>
);
