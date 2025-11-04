import React from "react";
import { useHistory } from 'react-router-dom';
import "./ProductDetails.css";
import backImg from "./left.png";

function ProductDetails(props) {
  const [mainImageUrl, setMainImageUrl] = React.useState(
    props.product.imageUrl[0]
  );

  const history = useHistory();

  const [zoom, setZoom] = React.useState(false);

  const zoomRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (zoomRef.current && !zoomRef.current.contains(event.target)) {
        zoomHandler();
      }
    }

    if (zoom) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [zoom]);

  function addToCartHandler() {
    props.onAddToCart();
  }

  function imageChangeHandler(event) {
    setMainImageUrl(event.target.src);
  }

  function zoomHandler() {
    setZoom((prev) => !prev);
  }

  const imageThumbs = [];
  for (let i = 0; i < Math.min(props.product.imageUrl.length, 6); i++) {
    const url = props.product.imageUrl[i];
    imageThumbs.push(
      <img
        key={url}
        src={url}
        alt={props.product.title}
        onClick={imageChangeHandler}
      />
    );
  }

  const zoomedImage = (
    <img
      className={"zoom"}
      src={mainImageUrl}
      alt={props.product.title}
      onClick={zoomHandler}
      ref={zoomRef}
    />
  );

  return (
    <>
      {zoom && zoomedImage}
      <img src={backImg} alt="Back" onClick={() => history.goBack()} className="back-button"/>
      <div className="product-item-details" id={`${props.product.id}-details`}>
        <div className="product-images">
          <div className="product-item-images-small">{imageThumbs}</div>
          <div className="product-item-details-image">
            <img
              src={mainImageUrl}
              alt={props.product.title}
              onClick={zoomHandler}
            />
            <button className="action-button secondary-button" onClick={addToCartHandler}>
              Add To Cart
            </button>
          </div>
        </div>
        <div className="product-item-details-info">
          <div className="product-item-details-title">
            <h2>{props.product.title}</h2>
            <p className="price">${props.product.price.toFixed(2)}</p>
          </div>
          <div className="product-item-details-description">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="rating">Rating: ⭐⭐⭐⭐⭐</div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
