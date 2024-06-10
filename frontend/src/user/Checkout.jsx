import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../components_style/Order.css';
import Usernav from "./Usernav";
import { myContext } from "./Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Checkout(){
    const { product, setProduct, cart, setCart } = useContext(myContext);
    const [mainAddress, setMainAddress] = useState([]);
    const [fullname, setFullname] = useState("");
    const [number, setNumber] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pin, setPin] = useState("");
    const [editEmail, setEditEmail] = useState(""); 
    const navigate = useNavigate();
    const [cartTotal, setCartTotal] = useState(0);

    const email = localStorage.getItem("userEmail");

    useEffect(() => {
        fetchAddress();
        fetchCart();
    }, []);

    const fetchAddress = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/user/getAddress", { email: email });
            setMainAddress(response.data.addressItem);
        } catch (error) {
            console.error('error fetching address:', error);
        }
    };

    const fetchCart = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/user/getcart", {
                userEmail: email,
                productId: product._id,
            });
            setCart(response.data.cartItem);
        } catch (error) {
            console.error("error fetching cart:", error);
        }
    };

   useEffect(() => {
    const calculateCartTotal = () => {
        return cartProducts.reduce((total, product) => {
            const quantity = product.quantity || 1;
            const price = product.price || 0;
            return total + price * quantity;
        }, 0);
    };
    setCartTotal(calculateCartTotal());
}, [cart]);


    const cartData = cart.map((cartItem) => cartItem.productId);
    const cartProducts = product.filter((productData) => cartData.includes(productData._id)).map(cartProduct => {
        const cartItem = cart.find(item => item.productId === cartProduct._id);
        return {
            ...cartProduct,
            quantity: cartItem ? cartItem.quantity : 1
            
            
        };
    });

    const addAddress = async () => {
        try {
            await axios.post('http://localhost:5000/api/user/addAddress', {
                email: email,
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
        setEditEmail(address.email); // Set the email of the address being edited
        setFullname(address.fullname);
        setNumber(address.number);
        setState(address.state);
        setCity(address.city);
        setPin(address.pin);
    };

    const cancelEdit = () => {
        setEditEmail(""); // Reset editEmail state variable
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
        toast.success('Order placed successfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setTimeout(() => {
            navigate('/buyallprod');
        }, 2000);  
    }

    return (
        <div>
            <Usernav />
            <div>
                <section>
                    <div className="imager-line">
                        <img
                            style={{
                                width: "100%",
                                marginLeft: "35px",
                                borderRadius: "60%",
                                marginTop: "50px"
                            }}
                            src="https://www.avonsolutions.com/wp-content/uploads/2022/07/An-Up-close-Look-into-the-World-of-Courier-Services.jpg"
                            alt="pic"
                        />
                    </div>
                </section>
                <h2>Add Address</h2>
                <form>
                    <section>
                        <div className="text-div-1">
                            <input
                                className="text-1"
                                type="text"
                                placeholder="email"
                                value={email}
                                readOnly
                            />
                            <span className="focus-border"></span>
                            <input
                                className="text-1"
                                type="text"
                                placeholder="Fullname"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                            <input
                                className="text-1"
                                type="text"
                                placeholder="Number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </div>
                        <div className="text-div-2">
                            <input
                                className="text-1"
                                type="text"
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                            <input
                                className="text-1"
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <input
                                className="text-1"
                                type="text"
                                placeholder="Pin"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                            />
                        </div>
                        <button className="bbtn-1" type="button" onClick={addAddress}>
                            ADD
                        </button>
                    </section>
                </form>
            </div>
            <h2>View Address</h2>
            <ul>
                {mainAddress.map((address) => (
                    <li key={address.email}>
                        <div>
                            {editEmail === address.email ? (
                                <>
                                    <div className="text-div-1">
                                        <input
                                            type="text"
                                            placeholder="email"
                                            value={email}
                                            readOnly
                                        />
                                        <input
                                            type="text"
                                            placeholder="Fullname"
                                            value={fullname}
                                            onChange={(e) => setFullname(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Number"
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="text-div-3">
                                        <input
                                            type="text"
                                            placeholder="State"
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="City"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Pin"
                                            value={pin}
                                            onChange={(e) => setPin(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        className="bbtn-2"
                                        style={{ marginLeft: "4%" }}
                                        onClick={() =>
                                            updateAddress(
                                                email,
                                                fullname,
                                                number,
                                                state,
                                                city,
                                                pin
                                            )
                                        }
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="bbtn-3"
                                        style={{ marginLeft: "5px" }}
                                        onClick={cancelEdit}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <div>
                                    <span className="span">-{address.email}-</span>
                                    <span className="span">-{address.fullname}</span>
                                    <span className="span">-{address.number}-</span>
                                    <span className="span">-{address.state}-</span>
                                    <span className="span">-{address.city}-</span>
                                    <span className="span">-{address.pin}-</span><br />
                                    <button
                                        className="bbtn-4"
                                        onClick={() => editAddress(address)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bbtn-5"
                                        onClick={() =>
                                            confirmDelete(address.email, address.fullname)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            <div style={{ border: 'solid 1px gray', maxWidth: '500px', margin: 'auto', marginTop: '100px', borderRadius: "8px" }}>
                <table style={{ marginLeft: '5px', marginTop: '20px' }}>
                    {cartProducts.map((val) => (
                        <tr
                            key={val._id}
                            style={{
                                border: "solid 1px #ddd",
                                borderRadius: "19px",
                                width: "450px",
                                display: "flex",
                                flexWrap: "wrap",
                                paddingTop: "10px",
                                paddingLeft: '10px',
                                marginLeft: '20px'
                            }}
                        >
                            <th scope="col"><img src={val.image} style={{ width: "70px" }} alt="pic" /></th>
                            <th scope="col" style={{ paddingTop: '20px', paddingLeft: '40px' }}>{val.quantity || 1}</th>
                            <th scope="col" style={{ paddingTop: "20px", paddingLeft: "10px" }}><h6>{val.prod_name}</h6></th>
                            <th scope="col" style={{ paddingLeft: "100px", paddingTop: "20px" }}><h6>{val.price * (val.quantity || 1)}</h6></th>
                        </tr>
                    ))}
                </table>
                <h5 style={{ paddingLeft: '300px', paddingTop: '20px' }}>Total: {cartTotal.toFixed(2)}/-</h5>
                <button
                    style={{
                        marginTop: "40px",
                        width: "250px",
                        height: "50px",
                        borderRadius: "10px",
                        marginLeft: "130px"
                    }}
                    onClick={bynow}
                >
                    Buy Now
                </button>
                <ToastContainer/>
            </div><br />
        </div>
    );
}
