import React from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import "./Cart.css";

function Cart(props) {
  const cartCtx = React.useContext(CartContext);

  function removeCartItem(cartID) {
    cartCtx.removeItem(cartID);
  }

  function increaseCartItem(cartID) {
    cartCtx.increaseItem(cartID);
  }

  function removeAll(cartID) {
    cartCtx.removeAll(cartID);
  }

  const cartItems = (
    <ul>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.cartID}
          item={item}
          onRemove={removeCartItem}
          onIncrease={increaseCartItem}
          onRemoveAll={removeAll}
        />
      ))}
    </ul>
  );

  

  return (
    <>
      <div className="backdrop" onClick={props.onClose} />
        <div className="cart-modal">
          {cartItems}
          {cartCtx.items.length === 0 && <p>No items in Cart.</p>}
          {cartCtx.items.length !== 0 &&
          <div className="cart-total">
            <span>Cart Total:</span> ${cartCtx.totalAmount}
          </div>}
          {cartCtx.items.length !== 0 && (
            <button className="action-button cart-actions" onClick={props.onPurchase}>
              Purchase
            </button>
          )}
          <button className="action-button secondary-button cart-actions" onClick={props.onClose}>
            Close
          </button>
      </div>
    </>
  );
}

export default Cart;
