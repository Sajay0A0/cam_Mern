import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/user/signup', {
            name: name,
            mail: email,
            password: password
        })
        .then(res => {
            const json = res.data;
            console.log(json);
            if (json.success) {
                toast.success(`${name} has been registered successfully!`, {
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
                    navigate('/login');
                }, 2000); // Add a delay to allow the user to see the toast notification
            } else {
                toast.error("Enter valid credentials", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        })
        .catch(err => {
            console.log(err);
            toast.error("An error occurred. Please try again.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-white p-5 rounded w-20" style={{border: 'solid 1px black'}}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input 
                            type="text" 
                            placeholder='Enter name'
                            autoComplete='off' 
                            name='name' 
                            className='form-control rounded' 
                            onChange={(e) => setName(e.target.value)}
                            value={name} 
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input 
                            type="email" 
                            placeholder='enter email' 
                            autoComplete='off' 
                            name='email' 
                            className='form-control rounded'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} 
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input 
                            type="password" 
                            placeholder='enter password'
                            name='password' 
                            className='form-control rounded' 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} 
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded'>Register</button>
                </form>

                <p>Already have an account? <Link to='/login' style={{textDecoration: "none", color: 'black', fontWeight: "bold"}}> please login here</Link></p>
                <Link to="/login" className="btn btn-default border w-100 rounded text-decoration-none" style={{backgroundColor: '#bb96f7'}}>
                    Login
                </Link>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Signup;
