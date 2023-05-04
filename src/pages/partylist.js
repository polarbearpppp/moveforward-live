import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shop-content";
import '../voteoffline.css'
import { NodeContext } from "../App";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";


export const PartyList = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount, removeFromCart2, addToCart2, dbar1, dbar2, dbar3 ,} =useContext(ShopContext);

  const voteColRef = collection(
    db,
    `${dbar1}/${dbar2}/ทุกจุด/${dbar3}/partyscore`
  );
  const docVoteRef = doc(voteColRef, productName);
  const [voteCount, setVoteCount] = useState(0);
  // Listen for real-time updates to the vote count
  useEffect(() => {
    const unsubscribe = onSnapshot(docVoteRef, (doc) => {
      if (doc.exists()) {
        setVoteCount(doc.data().score);
      } else {
        setVoteCount(0);
      }
    });
    return () => unsubscribe();
  }, [docVoteRef]);
  console.log('this is partylist file', dbar1,dbar2, dbar3, voteCount)
  return (
    <div className="cartItem justify-content-front">
      <img src={productImage} />
      <div className="description ">
        <p>
          <b>{productName}</b>
        </p>
        <p> score: {voteCount}</p>
        <div className="countHandler">
          <button classname="button" onClick={() => removeFromCart2(id,productName, `${dbar1}/${dbar2}/ทุกจุด/${dbar3}/partyscore`)}> - </button>
          <input
            type="number"
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id, productName, `${dbar1}/${dbar2}/ทุกจุด/${dbar3}/partyscore`)}
          />
          <button classname="button" onClick={() => addToCart2(id,productName, `${dbar1}/${dbar2}/ทุกจุด/${dbar3}/partyscore`)}> + </button>
        </div>
      </div>
    </div>
  );
};