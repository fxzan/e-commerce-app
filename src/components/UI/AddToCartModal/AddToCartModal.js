import React from "react";
import './AddToCartModal.css';

function AddToCartModal(props) {
    return (
      <div className="add-to-cart-modal">
        <span>{props.item}</span> added to Cart successfully!
      </div>
    );
}

export default AddToCartModal;