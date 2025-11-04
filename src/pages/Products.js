import React from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";

import ProductDetails from "../components/Products/ProductDetails";
import Reviews from "../components/Products/Reviews";
import AddToCartModal from "../components/UI/AddToCartModal/AddToCartModal";
import CartContext from "../store/cart-context";
import productsData from "../components/Products/productsData";
import InfoModalContext from "../store/infoModal-context";

function Products() {
  const modalCtx = React.useContext(InfoModalContext);
  const cartCtx = React.useContext(CartContext);
  const [showAddModal, setShowAddModal] = React.useState(false);

  const params = useParams();
  const product = productsData
    .find((productsClass) => productsClass.title === params.productClass)
    .items.find((item) => item.id === Number(params.productID));

  function addToCartHandler() {
    for (let item of cartCtx.items) {
      if (item.id === product.id) {
        modalCtx.showModal("Item already in Cart!");
        return;
      }
    }
    cartCtx.addItem({ ...product, amount: 1 });
    setShowAddModal(true);
    setTimeout(() => setShowAddModal(false), 2000);
  }

  const addModal = ReactDOM.createPortal(
    <AddToCartModal item={product.title} />,
    document.getElementById("overlays")
  );

  return (
    <>
      {showAddModal && addModal}
      {}
      <ProductDetails onAddToCart={addToCartHandler} product={product} />
      <Reviews />
    </>
  );
}

export default Products;
