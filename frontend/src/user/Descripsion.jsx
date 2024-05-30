import { useContext } from "react";
import { useParams } from "react-router-dom"
import { myContext } from "./Context";
import Usernav from "./Usernav";
import "../components_style/Description.css"
import Footer from "./Footer";
import axios from "axios";


export default function Description(){

    const {id}=useParams();
    const {product}=useContext(myContext)
    const email=localStorage.getItem("userEmail")

    const Productdetails=product.find((Product)=>Product._id===id)
const productId=Productdetails._id
    console.log("details",Productdetails._id,Productdetails.price);


    const addtocart =async (product)=>{
        try {
         const res=await axios.post("http://localhost:5000/api/user/addcart",{
           userEmail:email,
           productId:product._id,
           price:product.price,
           quantity:1
         })
         
        console.log("cart",res.data);
        } catch (error) {
         console.log("error adding",error);
        }
       };
     
    

    return(
        <div >
            <Usernav/>
            
            <h1>hello</h1>
            <div
          style={{display: "flex",flexWrap: "wrap",paddingLeft: "100px",marginTop: "20px",}}>
            {/* <div style={{border:'solid 1px black',margin:'0% 60% 0 10%',paddingLeft:'30px'}}> */}
            <img style={{width:'30rem',border:'solid 1px black',marginLeft:'90px',borderRadius:"8px"}} src={Productdetails.image} alt="pic" />
            
           
                <span style={{paddingLeft:'10%'}}></span>
                <ul className="pro-ul"><p className="pro-name">{Productdetails.prod_name}</p>
                    <li className="pro-li">{Productdetails.price}</li>
                    <li className="pro-li">{Productdetails.description}</li>
                    <li className="pro-li">nvdkxdn.lm</li>
                    <li className="pro-li">vxdvxdb</li>
                    <li className="pro-li">dgdsg</li>
                    <button onClick={()=>addtocart(Productdetails)}
                    style={{marginLeft:'',marginTop:'100px',width:'300px',height:'55px',borderRadius:'10px',fontSize:'25px',backgroundColor:'#008631',
                        color:'white', border:'none', fontWeight:'revert'
                    }}>
                       ADD TO CART</button>
                </ul>
            
            </div>
           

            <Footer/>
        </div>  
      
    )
}

