import axios from "axios";
import { useState } from "react"

const Emailform =()=>{
    const [emailData,setEmailData]=useState({
        to:'',
        subject:'',
        text:'',
    });

    const handlechange = (e)=>{
        const {name,value}=e.target;
        setEmailData({...emailData,[name]:value});
    };
    const sendEmail =async()=>{
        try {
            const response=await axios.post('http://localhost:5000/api/user/sndemail',emailData);
            alert(response.data);
        } catch (error) {
            alert(`Error:${error.response.data}`);
        }
    };

    return(
        <div>
            <h2>send</h2>
            <input type="text" name="to" placeholder="recipient's email"
            value={emailData.to} onChange={handlechange} />

            <input type="text" name="subject" placeholder="Email subject"
            value={emailData.subject} onChange={handlechange} /> 

            <input type="text" name="text"  placeholder=" email content"
            value={emailData.text} onChange={handlechange} />    

            <button onClick={sendEmail}>send</button>
        </div>
    )
};
export default Emailform;