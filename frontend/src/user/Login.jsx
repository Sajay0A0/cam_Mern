import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "./Context";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logUser, setLogUser } = useContext(myContext);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/user/login", {
        mail: email,
        password: password,
      })
      .then((res) => {
        console.log("login:" + JSON.stringify(res.data));
        if (res.data.success) {
          console.log("resdata", res.data);
          localStorage.setItem("authToken", res.data.authToken);
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userId", res.data.userId);

          console.log("authToken", localStorage.getItem("authToken"));
          console.log("res", res.data.user);
          toast.success('Login successful!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLogUser(res.data.user);
          navigate("/");
        } else {
          toast.error("Enter valid credentials!", {
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
      .catch((err) => {
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
  };

  console.log("log", logUser);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-5 rounded w-25" style={{border: 'solid 1px black'}}>
        <h2>Login</h2>  
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input 
              type="email"
              placeholder="enter email"
              autoComplete="off"
              name="email"
              className="form-control rounded"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input 
              type="password"
              placeholder="enter password"
              name="password"
              className="form-control rounded"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded">
            Login
          </button>
        </form>
        <p>
          Not registered...? Please
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "black",
            }}
          >
            Signup
          </Link>
        </p>
        <Link
          to="/signup"
          className="btn btn-default border w-100 rounded text-decoration-none"
          style={{backgroundColor: '#bb96f7'}}
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Login;
