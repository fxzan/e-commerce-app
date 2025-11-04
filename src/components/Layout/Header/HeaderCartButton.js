import React from "react";
import CartContext from "../../../store/cart-context";
import './HeaderCartButton.css';
import AuthContext from "../../../store/auth-context";
import cartImg from "./cart.png";

function HeaderCartButton(props) {
  const cartCtx = React.useContext(CartContext);
  const authCtx = React.useContext(AuthContext)
  const numberOfCartItems = cartCtx.items.reduce((total, item) => total + item.amount, 0);

  return (
    <div className={!authCtx.isLoggedIn ? "header-cart-button cart-hidden" : "header-cart-button"} onClick={props.onClick}>
      <img src={cartImg} alt="Cart" className="header-icon"/>
      <span className="badge">{numberOfCartItems}</span>
    </div>
  );
}

export default HeaderCartButton;
