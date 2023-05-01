import React from 'react';
import { PRODUCTS } from "../products";
import { Votecontent } from './Votecontent';
import "../vote.css";

const Vote = () => {
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1> Vote </h1>
      </div>

      <div className="products">
        {PRODUCTS.map((product) => (
          <Votecontent data={product} />
        ))}
      </div>
    </div>
  );
};

export default Vote;


