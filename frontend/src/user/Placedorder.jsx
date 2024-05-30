import React from "react";
import { useLocation } from "react-router-dom";

export default function Placedorder() {
  const location = useLocation();
  const { productData } = location.state || {}; // Extract product data from location state

  return (
    <div>
      <h2>Order Summary</h2>
      {productData ? (
        <div>
          <img src={productData.image} alt={productData.prod_name} style={{ width: '100px' }} />
          <h3>{productData.prod_name}</h3>
          <p>Price: ₹{productData.price}</p>
          <p>Quantity: {productData.quantity || 1}</p>
        </div>
      ) : (
        <p>No product data available.</p>
      )}
    </div>
  );
}
