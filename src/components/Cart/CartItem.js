import React from "react";
import "./CartItem.css";

function CartItem(props) {
  function onRemove(event) {
    event.preventDefault();
    props.onRemove(props.item.cartID);
  }

  function onIncrease(event) {
    event.preventDefault();
    props.onIncrease(props.item.cartID);
  }

  function onRemoveAll(event) {
    event.preventDefault();
    props.onRemoveAll(props.item.cartID);
  }

  return (
    <li className="cart-item">
      <div className="cart-item-title">
        <img
          className="cart-item-image"
          src={props.item.imageUrl[0]}
          alt={props.item.title}
        />
        <h4>{props.item.title}</h4>
      </div>
      <div className="cart-item-details">
        <div className="cart-price">${props.item.price.toFixed(2)}</div>
        <div className="cart-amount"> x {props.item.amount}</div>
      </div>
      <div className="cart-item-actions">
        <div>
          <button onClick={onRemove}> - </button>
          <button onClick={onIncrease}> + </button>
        </div>
        <div className="remove-item" onClick={onRemoveAll}>Remove</div>
      </div>
    </li>
  );
}

export default CartItem;
