import React from "react";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import CartContext from "../../store/cart-context";

import './Layout.css';

function Layout(props) {
  const cartCtx = React.useContext(CartContext);

  return (
    <>
      <Header onShowCart={cartCtx.showCart} />
      <main className="main-content">{props.children}</main>
      <Footer />
    </>
  );
}

export default Layout;
