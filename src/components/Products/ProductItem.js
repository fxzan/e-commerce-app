import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import AddToCartModal from "../UI/AddToCartModal/AddToCartModal"
import CartContext from "../../store/cart-context";
import InfoModalContext from "../../store/infoModal-context";

import "./ProductItem.css";

function ProductItem(props) {
  const cartCtx = React.useContext(CartContext);
  const modalCtx = React.useContext(InfoModalContext);

  const [showAddModal, setShowAddModal] = React.useState(false);

  const { title, price, imageUrl } = props.product;

  function addToCartHandler(event) {
    event.preventDefault();
    for (let item of cartCtx.items) {
      if (item.id === props.id) {
        modalCtx.showModal("Item already in Cart!");
        return;
      }
    }
    cartCtx.addItem({ ...props.product, amount: 1 });
    setShowAddModal(true);
    setTimeout(() => setShowAddModal(false), 3000);
  }

  const addModal = ReactDOM.createPortal(
    <AddToCartModal item={title} />,
    document.getElementById("overlays")
  );

  return (
    <div className="product-item" id={props.id}>
      <Link to={`/store/${props.productClass}/${props.id}`}>
        <h3>{title}</h3>
      </Link>
      <Link to={`/store/${props.productClass}/${props.id}`}>
        <img src={imageUrl[0]} alt={title} />
      </Link>
      <div className="product-details">
        <p>${price.toFixed(2)}</p>
        <button className="action-button secondary-button" onClick={addToCartHandler}>
          Add To Cart
        </button>
      </div>
      {showAddModal && addModal}
    </div>
  );
}

export default ProductItem;
