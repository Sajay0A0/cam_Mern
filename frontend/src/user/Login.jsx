import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "./Context";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {logUser,setLogUser}=useContext(myContext)

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
          alert("Login successful--!");
          setLogUser(res.data.user)
          navigate("/");
        }
        if (!res.data.success) {
          alert("Enter valid credentials...!");
        }
      })
      .catch((err) => console.log(err));
  };
console.log("log",logUser);
  return (
    <div className="d-flex justify-content-center  align-items-center  vh-100 ">
      <div className="bg-white p-5 rounded " style={{border:'solid 1px black'}}>
        <h2>Login</h2>  

        <form onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input style={{width:'17rem'}}
              type="email"
              placeholder="enter email"
              autoComplete="off"
              name="email"
              className="form-control rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input style={{width:'17rem'}}
              type="password"
              placeholder="enter password"
              name="password"
              className="form-control rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded ">
            Login
          </button>
        </form>
        <p>
          Not registerd...?please
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "black",
            }}
          >
            {" "}
            Signup
          </Link>
        </p>
        <Link
          to="/signup"
          className="btn btn-defualt border w-100  rounded text-decoration-none"
          style={{backgroundColor:'#bb96f7'}}
        >
          sign up
        </Link>
      </div>
    </div>
  );
}

export default Login;
