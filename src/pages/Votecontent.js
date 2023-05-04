import { useContext, useEffect, useState } from "react";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { ShopContext } from "../context/shop-content";
import "../vote.css";
import { db } from "../firebase";

export const Votecontent = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart, cartItems, removeFromCart } = useContext(ShopContext);
//   console.log('Thiss is your selected district =============>','1',props.bar1,'2',props.bar2,'3',props.bar3)
  // State to store the current vote count
//  console.log(`${props.bar1}/${props.bar2}/${props.bar3}/${props.bar3}/partyscore`)
  // Set up the Firestore reference
//   const locate = "จุดที่ 3";
  const voteColRef = collection(
    db,
    `${props.bar1}/${props.bar2}/ทุกจุด/${props.bar3}/partyscore`
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

  return (
    <div className="product">
      <img src={productImage} alt="pic" />
      <div className="description padtop">
        <p>
          <b className="padtop">{productName}</b>
        </p>
        <p className="padtop padbot">
          <b> Score: {voteCount} </b>
        </p>
      </div>
      <div className="gird2">
        <button
          className="addToCartBttn "
          onClick={() => {
            // Update the vote count in Firestore
            const newVoteCount = voteCount + 1;
            updateDoc(docVoteRef, { score: newVoteCount });

            // Add the product to the cart
            // addToCart(id, productName, `${props.bar1}/${props.bar2}/ทุกจุด/${props.bar3}/partyscore`);
          }}
        >
          Vote{voteCount > 0 && <> </>}
        </button>
        {voteCount > 0 && (
          <button
            className="addToCartBttn "
            onClick={() => {
              // Update the vote count in Firestore
              const newVoteCount = voteCount - 1;
              updateDoc(docVoteRef, { score: newVoteCount });

              // Remove the product from the cart
            //   removeFromCart(id, productName, `${props.bar1}/${props.bar2}/ทุกจุด/${props.bar3}/partyscore`);
            }}
          >
            Vote Remove{voteCount > 0 && <> </>}
          </button>
        )}
      </div>
    </div>
  );
};
