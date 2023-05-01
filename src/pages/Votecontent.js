import React, { useContext } from "react";
import { ShopContext } from "../context/shop-content";
// import myImage from '../asset/products/1.png';
import "../vote.css";
export const Votecontent = (props) => {
  const { id, productName, price, productImage } = props.data;
//   const { addToCart, cartItems } = useContext(ShopContext);

//   const cartItemCount = cartItems[id];
    console.log(`product => ${productImage}`)
  return (
    <div className="product">
      <img src={productImage} alt="pic"/>
      <div className="description padtop" >
        <p>
          <b className="padtop">{productName}</b>
        </p>
        <p className="padtop padbot"> Score: {price}</p>
      </div>
      <button className="addToCartBttn ">
        Vote
      </button>
    </div>
  );
};

// onClick={() => addToCart(id)}
// {cartItemCount > 0 && <> ({cartItemCount})</>}