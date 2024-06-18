import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Adlogin() {
    const [adEmail, setAdemail] = useState("");
    const [adPassword, setAdpassword] = useState("");

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/user/adlogin', {
            mail: adEmail, password: adPassword
        })
            .then(res => {
                console.log("login:" + JSON.stringify(res.data));
                if (res.data.success) {
                    console.log("resdata", res.data);
                    localStorage.setItem("adminAuthToken", res.data.authToken);
                    localStorage.setItem("adminEmail", adEmail);
                    localStorage.setItem("adminId", res.data.adminId);
                    console.log("authToken", localStorage.getItem("authToken"));
                    console.log("res", res.data.admin);
                    toast.success("Login successful!",{
                        position: "top-center",
                    });
                    setTimeout(() => {
                        navigate('/adnavbar');
                    }, 2000);
                } else {
                    toast.error("Enter valid credentials.");
                }
            }).catch(err => {
                console.log(err);
                toast.error("An error occurred. Please try again",{
                    position: "top-center",
                });
            });
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-white p-5 rounded w-25" style={{ border: 'solid 1px black' }}>
                <h2>Admin login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="adEmail">
                            <strong>Email</strong>
                        </label>
                        <input type="email" placeholder="enter email"
                            autoComplete="off" name="adEmail"
                            className="form-control rounded"
                            onChange={(e) => setAdemail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="adPassword">
                            <strong>Password</strong>
                        </label>
                        <input type="password" placeholder="enter password"
                            name="adPassword" className="form-control rounded"
                            onChange={(e) => setAdpassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded">
                        Login
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Adlogin;
