import React from 'react';
import ProductItem from './ProductItem.js';
import './Product.css';

function Product(props) {
    const { productClass, productItems } = props
    const products = productItems.map((product) => <ProductItem key={product.id} id={product.id} product={product} productClass={productClass}/>)
    return <div className='container' id={productClass}>
        <h2>{productClass.toUpperCase()}</h2>
        {products}
    </div>
}

export default Product;