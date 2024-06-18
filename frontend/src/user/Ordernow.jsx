import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../components_style/Order.css';
import Usernav from "./Usernav";
import Footer from "./Footer";
import { myContext } from "./Context";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Ordernow() {
  const { product, setProduct, cart, setCart } = useContext(myContext);
  const [mainAddress, setMainAddress] = useState([]);
  const [fullname, setFullname] = useState("");
  const [number, setNumber] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [productData, setProductData] = useState(null); // Initialize state for a single product
  const Navigate = useNavigate();
  const { id } = useParams();
  const [cartTotal, setCartTotal] = useState(0);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    fetchAddress();
  }, []);

  useEffect(() => {
    const selectedProduct = product.find(prd => prd._id === id);
    if (selectedProduct) {
      setProductData(selectedProduct); // Set the single product data
    }
  }, [id, product]);

  const userEmail = localStorage.getItem("userEmail");

  const fetchAddress = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/getAddress", { email: userEmail });
      setMainAddress(response.data.addressItem);
    } catch (error) {
      console.error('error fetching address:', error);
    }
  };

  useEffect(() => {
    const calculateCartTotal = () => {
      return cart.reduce((total, product) => {
        const quantity = product.quantity || 1;
        const price = product.price || 0;
        return total + price * quantity;
      }, 0);
    };
    setCartTotal(calculateCartTotal());
  }, [cart]);

  const addAddress = async () => {
    try {
      await axios.post('http://localhost:5000/api/user/addAddress', {
        email: userEmail,
        fullname: fullname,
        number: number,
        state: state,
        city: city,
        pin: pin,
      });
      fetchAddress();
      setFullname('');
      setNumber('');
      setState('');
      setCity('');
      setPin('');
    } catch (error) {
      console.error('error adding address:', error);
    }
  };

  const editAddress = (address) => {
    setEditEmail(address.email);
    setFullname(address.fullname);
    setNumber(address.number);
    setState(address.state);
    setCity(address.city);
    setPin(address.pin);
  };

  const cancelEdit = () => {
    setEditEmail("");
    setFullname('');
    setNumber('');
    setState('');
    setCity('');
    setPin('');
  };

  const updateAddress = async (updateEmail, updateFullname, updateNumber, updateState, updateCity, updatePin) => {
    try {
      await axios.post(`http://localhost:5000/api/user/updateAddress/${editEmail}`, {
        email: updateEmail,
        fullname: updateFullname,
        number: updateNumber,
        state: updateState,
        city: updateCity,
        pin: updatePin,
      });
      fetchAddress();
      cancelEdit();
    } catch (error) {
      console.error('error updating address:', error);
    }
  };

  const confirmDelete = (userEmail, deleteName) => {
    if (window.confirm(`Are you sure you want to delete this address, ${deleteName}?`)) {
      deleteAddress(userEmail);
    }
  };

  const deleteAddress = async (userEmail) => {
    try {
      await axios.post(`http://localhost:5000/api/user/deleteAddress/${userEmail}`);
      fetchAddress();
    } catch (error) {
      console.error('error deleting address:', error);
    }
  };

  function bynow() {
    toast.success('Order placed successfully!', 
     {
     position: "top-center",
     }
  );
    setTimeout(() => {
      Navigate(`/byproduct/${id}`)
    }, 2000);
  }

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/getcart",
        {
          userEmail: email,
          productId: product._id,
        }
      );

      setCart(response.data.cartItem);
    } catch (error) {
      console.error("error fetching cart:", error);
    }
  };
  console.log("Cart", cart);

  useEffect(() => {
    updateProductData();
  }, [cart]);

  const updateProductData = () => {
    const cartItem = cart.find(item => item.productId === id);
    if (cartItem) {
      const selectedProduct = product.find(p => p._id === id);
      if (selectedProduct) {
        const updatedProduct = {
          ...selectedProduct,
          quantity: cartItem.quantity,
          totalPrice: selectedProduct.price * cartItem.quantity,
        };
        setProductData(updatedProduct);
      }
    }
  };

  return (
    <div>
      <Usernav />
      <div>
        <section>
          <div className="imager-line"><img style={{ maxWidth: '100%', marginLeft: 'auto 35px', borderRadius: "80%", marginTop: '45px' }}
            src="https://www.avonsolutions.com/wp-content/uploads/2022/07/An-Up-close-Look-into-the-World-of-Courier-Services.jpg" alt="pic" /></div>
        </section>
        <h2>add Address</h2>

        <form><section>
          <div className="text-div-1">
            <input className="text-1" type="text" placeholder="email" value={userEmail} readOnly />
            <span className="focus-border"></span>
            <input className="text-1" type="text" placeholder="Fullname" value={fullname}
              onChange={(e) => setFullname(e.target.value)} />

            <input className="text-1" type="text" placeholder="Number" value={number}
              onChange={(e) => setNumber(e.target.value)} />
          </div>
          <div className="text-div-2">
            <input className="text-1" type="text" placeholder="State" value={state}
              onChange={(e) => setState(e.target.value)} />

            <input className="text-1" type="text" placeholder="City" value={city}
              onChange={(e) => setCity(e.target.value)} />

            <input className="text-1" type="text" placeholder="Pin" value={pin}
              onChange={(e) => setPin(e.target.value)} />
          </div>

          <button className='bbtn-1' type="button" onClick={addAddress}>ADD</button>
        </section>
        </form>

      </div>
      <h2>view address</h2>
      <ul>
        {mainAddress.map((address) => (
          <li key={address.email}>
            <div>
              {editEmail === address.email ? (
                <>
                  <div className="text-div-1">
                    <input type="text" placeholder="email" value={userEmail} readOnly />
                    <input type="text" placeholder="Fullname" value={fullname}
                      onChange={(e) => setFullname(e.target.value)} />
                    <input type="text" placeholder="Number" value={number}
                      onChange={(e) => setNumber(e.target.value)} />
                  </div>
                  <div className="text-div-3">
                    <input type="text" placeholder="State" value={state}
                      onChange={(e) => setState(e.target.value)} />
                    <input type="text" placeholder="City" value={city}
                      onChange={(e) => setCity(e.target.value)} />
                    <input type="text" placeholder="Pin" value={pin}
                      onChange={(e) => setPin(e.target.value)} />
                  </div>
                  <button className="bbtn-2" style={{ marginLeft: '4%' }} onClick={() => updateAddress(userEmail, fullname, number, state, city, pin)}>Update</button>
                  <button className="bbtn-3" style={{ marginLeft: '5px' }} onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <div>
                  <span className="span">-{address.email}-</span>
                  <span className="span">-{address.fullname}-</span>
                  <span className="span">-{address.number}-</span>
                  <span className="span">-{address.state}-</span>
                  <span className="span">-{address.city}-</span>
                  <span className="span">-{address.pin}</span><br /><br />
                  <button className="bbtn-4" onClick={() => editAddress(address)}>Edit</button>
                  <button className="bbtn-5" onClick={() => confirmDelete(address.email, address.fullname)}> Delete </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      {productData && ( // Check if productData is not null before rendering
        <div style={{ border: 'solid 1px gray', maxWidth: '500px', margin: 'auto', marginTop: '100px', borderRadius: "8px" }}>
          <table>
            <tr style={{ border: 'solid 1px #ddd', borderRadius: '19px', width: '450px', display: 'flex', flexWrap: 'wrap', paddingTop: '10px', marginTop: '20px', paddingLeft: '10px', marginLeft: '20px' }}>
              <th scope="col"><img src={productData.image} style={{ width: '90px' }} alt="pic" /></th>
              <th scope="col" style={{ paddingTop: '20px', paddingLeft: '40px' }}>{productData.quantity || 1}</th>
              <th scope="col" style={{ paddingTop: '20px', paddingLeft: '30px' }}><h6>{productData.prod_name}</h6></th>
              <th scope="col" style={{ paddingLeft: '100px', paddingTop: '20px' }}><h6>{productData.price * (productData.quantity || 1)}</h6></th>
            </tr>
          </table>

          <h5 style={{ paddingLeft: '300px', paddingTop: '20px' }}>Price : ₹{productData.price * (productData.quantity || 1)}</h5>

          <button style={{ marginTop: '60px', width: '250px', height: '50px', borderRadius: '10px', marginLeft: '130px' }} onClick={bynow}>
            By now</button>
          {/* <ToastContainer /> */}
        </div>
      )}
      <Footer />
    </div>
  );
}
