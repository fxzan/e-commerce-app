import React from "react";
import CartContext from "../../../store/cart-context";
import './HeaderCartButton.css';

function HeaderCartButton(props) {
  const cartCtx = React.useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((curItems) => curItems + 1, 0);

  return (
    <button className="button" onClick={props.onClick}>
      <span>Cart</span>
      <span className="badge">{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
