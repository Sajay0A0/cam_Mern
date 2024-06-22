import { useContext, useEffect, useState } from "react";
import { myContext } from "./Context";
import axios from "axios";
import Usernav from "./Usernav";
import { useNavigate } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "../components_style/Cart.css";

export default function Carti() {
  const { product, cart, setCart } = useContext(myContext);
  const [cartTotal, setCartTotal] = useState(0);
  const email = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/getcart",
        {
          userEmail: email,
        }
      );

      setCart(response.data.cartItem);
    } catch (error) {
      console.error("error fetching cart:", error);
    }
  };
  console.log("Cart", cart);

  const cartProducts = cart.map(cartItem => {
    const productData = product.find(p => p._id === cartItem.productId);
    if (!productData) {
      return null; // Handle case where product data is not found
    }
    return {
      ...productData,
      quantity: cartItem.quantity,
      totalPrice: productData.price * cartItem.quantity
    };
  }).filter(item => item !== null); // Filter out null values

  console.log("Cart1", cartProducts);

  const confirmDelete = (product) => {
    if (window.confirm(`Are you sure to remove ${product.prod_name}?`)) {
      handleDelete(product._id);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.post("http://localhost:5000/api/user/deletecart", {
        userEmail: email,
        productId: productId,
      });
      // Filter out the deleted product from the cart
      const updatedCart = cart.filter((item) => item.productId !== productId);
      setCart(updatedCart);
    } catch (error) {
      console.error("error deleting item from cart:", error);
    }
  };

  useEffect(() => {
    const calculateCartTotal = () => {
      return cartProducts.reduce((total, product) => {
        return total + product.totalPrice;
      }, 0);
    };
    setCartTotal(calculateCartTotal());
  }, [cart, cartProducts]);

  const handleIncrementQty = async (productId) => {
    try {
      const updatedCart = cart.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: (item.quantity || 1) + 1 };
        }
        return item;
      });
      setCart(updatedCart);
      await updateCartQuantity(
        productId,
        updatedCart.find((item) => item.productId === productId).quantity
      );
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };

  // Decrement quantity function
  const handleDecrementQty = async (productId) => {
    try {
      const updatedCart = cart.map((item) => {
        if (item.productId === productId && item.quantity > 1) {
          return { ...item, quantity: (item.quantity || 1) - 1 };
        }
        return item;
      });
      setCart(updatedCart);
      await updateCartQuantity(
        productId,
        updatedCart.find((item) => item.productId === productId).quantity
      );
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    }
  };

  // Function to update quantity in the backend
  const updateCartQuantity = async (productId, newQuantity) => {
    try {
      await axios.post("http://localhost:5000/api/user/updatecart", {
        userEmail: email,
        productId: productId,
        quantity: newQuantity,
      });
    } catch (error) {
      console.error("Error updating quantity in backend:", error);
    }
    console.log("update", newQuantity);
  };

  function handleClick(productId) {
    navigate(`/descript/${productId}`);
  }
  function click(productId) {
    navigate(`/ordernow/${productId}`);
  }

  function check() {
    navigate('/checkout')
  }

  return (
    <div className="Container">
      <Usernav />
      {cartProducts.length === 0 ? (
        <div className="image-cart"></div>
      ) : (
        
        <table className="content-main">
          
          <tbody>
            {cartProducts.map((val) => (
              <tr key={val._id}>
                <td>
                  <img style={{marginLeft:'30px'}} className="image" src={val.image} onClick={() => handleClick(val._id)} alt="Product"
                  />
                </td>
                <td>{val.prod_name}</td>
                <td>₹{val.price}/-</td>
                <td>{val.description}</td>
                <td>
                  <div style={{ paddingTop: "20px", }}>
                    Price : ₹{val.price * (val.quantity || 1)}
                    <br />
                    Quantity: {val.quantity || 1}
                    <button
                      style={{ borderRadius: "15px", marginLeft: "6px" }}
                      onClick={() => handleDecrementQty(val._id)}
                    >
                      <KeyboardArrowDownIcon />
                    </button>
                    <button
                      style={{ borderRadius: "15px", marginLeft: "5px" }}
                      onClick={() => handleIncrementQty(val._id)}
                    >
                      <KeyboardArrowUpIcon />
                    </button>
                  </div>{" "}
                  <br />
               
                  <div style={{ marginLeft: "10px" }}>
                    <button
                      className="btn bttn btn-success rounded-lg text-decoration-none ml-2"
                      onClick={() => handleClick(val._id)}
                    >
                      Details
                    </button>

                    <button style={{ marginLeft: "2px" }} className="btn btn-danger bttn"
                      onClick={() => confirmDelete(val)}
                    >
                      Delete
                    </button>
                    <button className="btn bttn-1" onClick={() => click(val._id)}>Order now</button>
           
                  </div>
                  
                </td>
              </tr>
              
            ))}
          </tbody>
        </table>
      )}
      <h4 style={{paddingLeft:'43%',paddingTop:'20px'}}>Total: ₹{cartTotal.toFixed(2)}/-</h4>
      <button className="btn  bttn-2"  onClick={check}>
        Checkout
      </button>
      
    </div>
  );
}
