import React from "react";
import './AddToCartModal.css';

function AddToCartModal(props) {
    return (
      <div className="add-to-cart-modal">
        <p>{props.item} <span>added to Cart successfully!</span></p>
      </div>
    );
}

export default AddToCartModal;