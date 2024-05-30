import React from 'react';
import { useLocation } from 'react-router-dom';
// import "../components_style/OrderConfirmation.css"; // Add your CSS file for styling

export default function Placedall() {
    const location = useLocation();
    const { orderedProducts } = location.state || { orderedProducts: [] };

    return (
        <div className="order-confirmation">
            <h2>Order Confirmation</h2>
            <div className="products-list">
                {orderedProducts.map((product, index) => (
                    <div key={index} className="product-item">
                        <img style={{width:'80px'}} src={product.image} alt={product.prod_name} className="product-image" />
                        <h6>{product.prod_name}</h6>
                        <p>Quantity: {product.quantity || 1}</p>
                        <p>Price: {product.price * (product.quantity || 1)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
