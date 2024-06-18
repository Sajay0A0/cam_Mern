import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Usernav from './Usernav';
import "../components_style/Placed.css";

export default function OrderSummary() {
    const [summary, setSummary] = useState([]);
    const email = localStorage.getItem("userEmail");

    useEffect(() => {
        if (email) {
            fetchSummary();
        }
    }, [email]);

    const fetchSummary = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/user/getsummery', { email });
            console.log('Fetch summary response:', response.data); 
            if (response.data.summeryItem) {
                const sortedSummary = response.data.summeryItem.sort((a, b) => new Date(b.date) - new Date(a.date));
                setSummary(sortedSummary);
            } else {
                setSummary([]);
            }
        } catch (error) {
            console.error("Error fetching summary:", error);
        }
    };

    console.log("Summary:", summary);

    return (
        <div>
            <Usernav/>
            <h2>Order Summary</h2>
            {summary.length > 0 ? (
                <div>
                    {summary.map((order, index) => (
                        <div key={index} className='prod-address'>
                            <div>
                                <p className='address-date'>Date : {new Date(order.date).toLocaleDateString()}</p>
                                <p className='user-address'>Deliver to : {order.address.fullname}, {order.address.city}, {order.address.state}, {order.address.pin}, {order.address.number}</p>
                            </div>
                            <div className="products-list">
                                <table>
                                    <tbody>
                                        {order.product && order.product.length > 0 ? (
                                            order.product.map((product, idx) => (
                                                <tr key={idx} className="product-item">
                                                    <td><img style={{width:'200px',margin:'0 0 0 15px'}} src={product.image} alt={product.prod_name} className="product-image" /></td>
                                                    <td className='product-name'>{product.prod_name}</td>
                                                    <td className='product-qty'>Quantity: {product.quantity || 1}</td>
                                                    <td className='product-price'>Price: {product.price * (product.quantity || 1)}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr key="noProduct">
                                                <td colSpan="4">No products found in this order.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No previous orders found.</p>
            )}
            <br />
        </div>
    );
}
