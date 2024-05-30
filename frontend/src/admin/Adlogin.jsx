import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Adlogin(){

    const [adEmail,setAdemail ]=useState("")
    const [adPassword,setAdpassword]=useState("");

    const navigate=useNavigate();

    axios.defaults.withCredentials=true;
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:5000/api/user/adlogin',{
            mail:adEmail, password:adPassword
        })
        .then(res =>{
            console.log("login:" +
            JSON.stringify(res.data))
            if(res.data.success) {
                console.log("resdata",res.data);
                localStorage.setItem("adminAuthToken",res.data.authToken)
                localStorage.setItem("adminEmail",adEmail)
                localStorage.setItem("adminId",res.data.adminId)
                console.log("authToken",localStorage.getItem("authToken"))
                console.log("res",res.data.admin);
                alert("Login successful--!")
                navigate('/adnavbar')
            }
            if (!res.data.success) {
                alert("Enter valid credentials...!")
            }
        }).catch(err => console.log(err))
    }


    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100-">
            <div className="bg-white p-3 rounded w-25">
                <h2>Admin login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="adEmail">
                            <strong>Email</strong>
                        </label>
                        <input type="email" placeholder="enter email"
                        autoComplete="off" name="adEmail"
                        className="form-control rounded-0"
                        onChange={(e)=>setAdemail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="adPassword">
                            <strong>Password</strong>
                        </label>
                        <input type="password" placeholder="enter password"
                        name="adPassword" className="form-control rounded-0"
                        onChange={(e)=>setAdpassword (e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                    Login
                </button>
                </form>
            </div>
        </div>
    )
}
export default Adlogin;