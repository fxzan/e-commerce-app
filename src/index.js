import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { CartContextProvider } from "./store/cart-context";
import { AuthContextProvider } from "./store/auth-context";
import { InfoModalContextProvider } from "./store/infoModal-context";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <InfoModalContextProvider>
      <AuthContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </AuthContextProvider>
    </InfoModalContextProvider>
  </BrowserRouter>
);
