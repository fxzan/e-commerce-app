import React from "react";

import Product from "../components/Products/Product";
import productsData from "../components/Products/productsData";

function Store() {
  const productContainers = productsData.map((product) => (
    <Product
      key={product.title}
      productClass={product.title}
      productItems={product.items}
    />
  ));

  return <>{productContainers}</>;
}

export default Store;
