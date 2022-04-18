import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import AddToCartModal from "../UI/AddToCartModal/AddToCartModal"
import CartContext from "../../store/cart-context";

import "./ProductItem.css";

function ProductItem(props) {
  const cartCtx = React.useContext(CartContext);

  const [showAddModal, setShowAddModal] = React.useState(false);

  const { title, price, imageUrl } = props.product;

  function addToCartHandler(event) {
    event.preventDefault();
    for (let item of cartCtx.items) {
      if (item.id === props.id) {
        alert("Item already in Cart!");
        return;
      }
    }
    cartCtx.addItem({ ...props.product, amount: 1 });
    setShowAddModal(true);
    setTimeout(() => setShowAddModal(false), 2000);
  }

  const addModal = ReactDOM.createPortal(
    <AddToCartModal item={title} />,
    document.getElementById("overlays")
  );

  return (
    <div className="product-item" id={props.id}>
      <Link to={`/e-commerce-app/store/${props.productClass}/${props.id}`}>
        <h3>{title}</h3>
      </Link>
      <div className="product-item-image">
        <Link to={`/e-commerce-app/store/${props.productClass}/${props.id}`}>
          <img src={imageUrl[0]} alt={title} />
        </Link>
      </div>
      <div className="product-details">
        <span>${price.toFixed(2)}</span>
        <button className="addToCart-btn" onClick={addToCartHandler}>
          Add To Cart
        </button>
      </div>
      {showAddModal && addModal}
    </div>
  );
}

export default ProductItem;
