import { useContext, useEffect, useState } from "react";
import { myContext } from "./Context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BsCashCoin } from "react-icons/bs";
import { CiCreditCard1 } from "react-icons/ci";
import "../components_style/Buyproduct.css";

export default function Buyallprod(){
    const { product, setProduct, cart, setCart } = useContext(myContext);
    const [mainAddress, setMainAddress] = useState([]);
    const [popupVisible, setPopupVisible] = useState(false);
    const email = localStorage.getItem("userEmail");
    const navigate = useNavigate();

    useEffect(() => {
        fetchAddress();
        fetchCart();
    }, []);

    const fetchAddress = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/user/getAddress", { email });
            setMainAddress(response.data.addressItem);
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };

    const fetchCart = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/user/getcart", { userEmail: email });
            setCart(response.data.cartItem);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const cartData = cart.map((cartItem) => cartItem.productId);
    const cartProducts = product.filter((productData) => cartData.includes(productData._id)).map(cartProduct => {
        const cartItem = cart.find(item => item.productId === cartProduct._id);
        return {
            ...cartProduct,
            quantity: cartItem ? cartItem.quantity : 1
        };
    });

    const handlePlaceOrder = async () => {
        try {
            await axios.post("http://localhost:5000/api/user/summery", {
                userEmail: email,
                product: cartProducts,
                address: mainAddress[0]
            });
            setPopupVisible(true);
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    const closePopup = () => {
        setPopupVisible(false);
        navigate('/', { state: { orderedProducts: cartProducts, address: mainAddress[0] } });
    };

    return (
        <div>
            <section>
                <div className="imager-line">
                    <img
                        style={{ width: '80%', marginLeft: '60px', borderRadius: "44%", marginTop: '45px' }}
                        src="https://img.freepik.com/premium-vector/successful-wireless-payment-concept-easy-contactless-approved-payment-by-credit-card-smartphone_368583-41.jpg?size=626&ext=jpg&ga=GA1.1.967060102.1715817600&semt=ais_user"
                        alt="pic"
                    />
                </div>
            </section>
            <div style={{ border: 'solid 1px gray', width: '100%', height: '50px', backgroundColor: '#BB96F7' }}>
                <Link to={'/cart'} >
                    <ArrowBackIcon sx={{ fontSize: '40px', marginTop: '5px', marginLeft: '10px', color: 'black' }} />
                </Link>
            </div>
            <div>
                {mainAddress.map((address) => (
                    <div key={address._id}>
                        <h6 style={{ marginTop: '30px', marginLeft: '35px' }}>Deliver to:</h6>
                        <div style={{ marginLeft: '40px', marginTop: '30px' }}>
                            <span className="span">{address.email}</span>,
                            <span className="span">{address.fullname}</span>,
                            <span className="span">{address.state}</span>,
                            <span className="span">{address.city}</span>,<br />
                            <span className="span">{address.pin}</span>,
                            <span className="span">{address.number}</span>
                        </div>
                        <div style={{ border: 'solid 1px #eeeeee', maxWidth: '70%', height: '10px', backgroundColor: '#eaeaea', marginTop: '40px' }}></div>
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', flexBasis: 'column', gap: '20px', paddingLeft: '0%' }}>
                <table style={{ marginLeft: '5px', marginTop: '20px' }}>
                    {cartProducts.map((val) => (
                        <tr key={val._id} style={{ border: 'solid 1px #BB96F7', borderRadius: '19px', marginTop: '0', maxWidth: '550px', width: '450px', display: 'flex', flexWrap: 'wrap', paddingTop: '0', marginTop: '5px', paddingLeft: '10px', marginLeft: '20px' }}>
                            <th scope="col">
                                <img src={val.image} style={{ width: "60px" }} alt="pic" />
                            </th>
                            <th scope="col" style={{ paddingTop: "20px", paddingLeft: "10px" }}>
                                <h6>{val.prod_name}</h6>
                            </th>
                            <th scope="col" style={{ paddingTop: '20px', paddingLeft: '40px' }}>{val.quantity || 1}</th>
                            <th scope="col" style={{ paddingLeft: "100px", paddingTop: "20px" }}>
                                <h6>{val.price * (val.quantity || 1)}</h6>
                            </th>
                        </tr>
                    ))}
                </table>
            </div>
            <div style={{ border: 'solid 1px black', maxWidth: '400px', margin: '1% auto', borderRadius: '8px', paddingBottom: '20px' }}>
                <div style={{ border: 'solid 1px #ddd', maxWidth: '250px', height: '250px', margin: 'auto', borderRadius: '15px' }}>
                    <img style={{ maxWidth: '200px', height: '200px', margin: 'auto 30px', borderRadius: '40px' }} src="https://cdni.iconscout.com/illustration/premium/thumb/parcel-delivery-7250230-5902792.png?f=webp" alt="pic" />
                    <h5 style={{ textAlign: 'center' }}>Take away</h5>
                </div>

                <div className="credit-drop" style={{ border: 'solid 1px black', borderRadius: '10px', margin: '20px 10px 0 10px' }}>
                    <input type="radio" id="credit" name="payment" />
                    <label htmlFor="credit">
                        <CiCreditCard1 style={{ fontSize: '30px' }} /> <h6 style={{ paddingTop: '10px', paddingLeft: '10px' }}>Credit / Debit / ATM card</h6>
                    </label>
                    <div className="credit-drp">
                        <div style={{ border: 'solid 1px #ddd', borderRadius: '8px' }}>
                            <label style={{ fontSize: '11px', padding: '10px 0 0 10px' }}>Card Number</label>
                            <input type="text" placeholder="xxxx xxxx xxxx xxxx" style={{ margin: '0 0 15px 10px', height: '40px', width: '300px' }} /> <br />
                            <div style={{ fontSize: '11px', padding: '0 0 0 10px', display: 'flex' }}>
                                <label>Valid Thru</label>
                                <label style={{ display: 'flex', marginLeft: '120px' }}>CVV</label>
                            </div>
                            <input type="text" placeholder="MM/YY" style={{ width: '130px', margin: '0 0 20px 10px' }} />
                            <input type="text" placeholder="CVV" style={{ width: '130px', margin: '0 0 20px 40px' }} />
                            <button className="btn btn-warning border-none" style={{ width: '300px', margin: '0 0 20px 10px' }} onClick={handlePlaceOrder}>Pay</button>
                        </div>
                    </div>
                </div>

                <div className="upi-drop" style={{ border: 'solid 1px black', borderRadius: '10px', margin: '20px 10px 0 10px' }}>
                    <input type="radio" id="upi" name="payment" />
                    <label htmlFor="upi">
                        <img style={{ width: '40px' }} src="https://t3.ftcdn.net/jpg/05/60/50/16/360_F_560501607_x7crxqBWbmbgK2k8zOL0gICbIbK9hP6y.jpg" alt="pic" /> <h6 style={{ paddingTop: '10px', paddingLeft: '10px' }}>UPI</h6>
                    </label>
                    <div className="upi-drp">
                        <div style={{ border: 'solid 1px #ddd', borderRadius: '8px' }}>
                            <label style={{ fontSize: '11px', padding: '10px 0 0 10px' }}>UPI ID</label>
                            <input type="text" placeholder="Enter your UPI ID" style={{ margin: '0 0 15px 10px', height: '40px', width: '300px' }} /> <br />
                            <button className="btn btn-warning border-none" style={{ width: '300px', margin: '0 0 20px 10px' }} onClick={handlePlaceOrder}>Pay</button>
                        </div>
                    </div>
                </div>
                <div className="cash-drop" style={{ border: 'solid 1px black', borderRadius: '10px', margin: '20px 10px 0 10px' }}>
          <input type="radio" id="cash" name="payment" />
          <label htmlFor="cash">
            <BsCashCoin style={{ fontSize: '30px' }} /> <h6 style={{paddingTop:'10px',paddingLeft:'10px'}}> Cash on Delivery</h6>
          </label>
          <div className="cash-drp">
          <div style={{border:'solid 1px #ddd',borderRadius:'8px'}}>
              <butto className="btn btn-warning" style={{margin:'20px 0 0 18px',width:'300px'}} onClick={handlePlaceOrder}>Place Order</butto>
            </div>
          </div>
        </div>

        </div>

            {popupVisible && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <img src="https://cdn-icons-png.freepik.com/512/7518/7518748.png" alt="Order placed successfully" style={{ width: '100px', paddingTop: '60px' }} />
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <h5>Your order has been placed successfully!</h5>
                            <button className="btn border-success" style={{width:'100px'}}  onClick={closePopup}>OK</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
