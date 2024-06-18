import axios from "axios";
import { useEffect, useContext, useState,} from "react";
import Usernav from "./Usernav";
import Card from "react-bootstrap/Card";
import "../components_style/Home.css";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "./Context";
import {MDBCard,MDBCardTitle,MDBCardText,MDBCardBody,MDBCardImage, MDBRow,MDBCol} from 'mdb-react-ui-kit';
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Checkbox } from "@mui/material";




export default function Home() {

  const {product,setProdut,cart,setCart,like,setLike}=useContext(myContext)
  const email=localStorage.getItem("userEmail")
  const navigate=useNavigate()

  useEffect(() =>{
    fetchProduct();
  },[]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/getproducts"
      );
      setProdut(response.data);
    } catch (error) {
      console.error("error fetch product:",error);
    }
  };

  const addtocart =async (product)=>{
   try {
    const res=await axios.post("http://localhost:5000/api/user/addcart",{
      userEmail:email,
      productId:product._id,
      quantity:1,
      price:0,
    })
    
   console.log("cart",res.data);
   } catch (error) {  
    console.log("error adding",error);
   }
  };
 
  
  // const addtolike =async (product)=>{
  //  try {
  //   const res=await axios.post("http://localhost:5000/api/user/addlike",{
  //     userEmail:email,
  //     productId:product._id,
  //   })
  //   console.log("like",res.data);
  //  } catch (error) {
  //   console.log("error adding",error);
  //  }
  // };

function handleClick(productId){
navigate(`/descript/${productId}`)
}

// function handleReverse(){
//   setReverse(!reverse)
// }

  return (
    <div>
      <Usernav />

      <div>
        <h1
          className="title text-center "
          style={{fontFamily: "Nova Square",display: "flex",position: "absolute",zIndex: 2,
          color: "white",marginLeft: "8%",fontSize: "120px",marginTop: "10%",textShadow:'0 0 15px black'}}>
          C L I C K
        </h1>
        <img
          src="https://previews.123rf.com/images/norgal/norgal1909/norgal190900012/129916433-photography-gear-on-wooden-table-digital-camera-lens-and-other-accessories.jpg"
          alt="pic"
          className="w-100"
          style={{ height: "15cm", filter: "brightness(0.5)" }}
        />

        <div
          style={{display: "flex",flexWrap: "wrap",paddingLeft: "60px",marginTop: "30px",}}>
          <Card className="adl_img"style={{ width: "20rem", height: "12rem", marginBottom: "120px" }}>
            <Card.Text
              style={{fontFamily: "Roboto Mono",position: "absolute",zIndex: 2,color: "white",marginLeft: "8%",fontSize: "35px",marginTop: "7%",}}>
              <Link to="/camera" className="text-decoration-none text-white ">Action <br /> Cameras</Link>
            </Card.Text>
            <Link to="/camera">
              <Card.Img
                style={{ height:"16rem",filter: "brightness(0.5)" }}
                variant="top"
                src="https://images.pexels.com/photos/3773478/pexels-photo-3773478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
            </Link>
            <Card.Body>
              <Link
                to="/camera"
                className="btn btn-defualt border w-50 bg-primary rounded-lg text-white text-decoration-none">
                Shop Now
              </Link>
            </Card.Body>
          </Card>

          <Card
            className="adl_img"
            style={{ width: "20rem", height: "12rem", marginBottom: "120px" }}
          >
            <Card.Text
              style={{
                fontFamily: "Roboto Mono",
                position: "absolute",
                zIndex: 2,
                color: "white",
                marginLeft: "8%",
                fontSize: "35px",
                marginTop: "7%",
              }}
            >
             <Link to="/lenses" className="text-decoration-none text-white "> Lenses & Accessories</Link>
            </Card.Text>
            <Link to="/lenses">
              <Card.Img
                style={{ height:"16rem", filter: "brightness(0.5)" }}
                variant="top"
                src="https://previews.123rf.com/images/norgal/norgal1909/norgal190900012/129916433-photography-gear-on-wooden-table-digital-camera-lens-and-other-accessories.jpg"
              />
            </Link>
            <Card.Body>
              <Link
                to="/lenses"
                className="btn btn-defualt border w-50 bg-primary rounded-lg text-white text-decoration-none"
              >
                Shop Now
              </Link>
            </Card.Body>
          </Card>

          <Card
            className="adl_img"
            style={{ width: "20rem", height: "12rem", marginBottom: "120px" }}
          >
            <Card.Text
              style={{
                fontFamily: "Roboto Mono",
                position: "absolute",
                zIndex: 2,
                color: "white",
                marginLeft: "8%",
                fontSize: "35px",
                marginTop: "7%",
              }}
            >
            <Link to="/audio" className="text-decoration-none text-white ">Audio</Link>  
            </Card.Text>
            <Link to="/audio">
              <Card.Img
                style={{height:"16rem", filter: "brightness(0.5)" }}
                variant="top"
                src="https://media.istockphoto.com/id/1488918697/photo/man-working-from-his-home-in-los-angeles-california.webp?b=1&s=170667a&w=0&k=20&c=XuwuMpBouL-IzXm4Mlodi4wNeFNlZVAiIq9JZQS91Rs="
              />
            </Link>
            <Card.Body>
              <Link
                to="/audio"
                className="btn btn-defualt border w-50 bg-primary rounded-lg text-white text-decoration-none"
              >
                Shop Now
              </Link>
            </Card.Body>
          </Card>

          <Card className="adl_img" style={{ width: "20rem", height: "12rem",marginBottom: "90px" }}>
            <Card.Text
              style={{
                fontFamily: "Roboto Mono",
                position: "absolute",
                zIndex: 2,
                color: "white",
                marginLeft: "8%",
                fontSize: "35px",
                marginTop: "7%",
              }}
            >
              <Link to="/lights" className="text-decoration-none text-white ">Lighting & <br />
              Studio</Link>
            </Card.Text>
            <Link to="/lights">
              <Card.Img
                style={{height:"16rem", filter: "brightness(0.9)" }}
                variant="top"
                src="https://images.pexels.com/photos/4123589/pexels-photo-4123589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
            </Link>
            <Card.Body>
              <Link
                to="/lights"
                className="btn btn-defualt border w-50 bg-primary rounded-lg text-white text-decoration-none"
              >
                Shop Now
              </Link>
            </Card.Body>
          </Card>
        </div>

        {/* <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            paddingLeft: "50px",
            marginTop: "90px",
          }}>

            <div  >
            <Link to='/main' className="btn btn-primary text-white w-100 " 
            style={{width:'300px',height:'60px',padding:'10px 30px 20px',
            fontSize:'30px',fontFamily:'Noto Sans Korean'}}>Shop Now</Link>
            </div>
        
        </div> */}
        
      </div>
      <br />
      <div>
      <MDBCard style={{ marginTop:'50px',maxWidth: '100%',backgroundColor:'#BB96F7'}}>
      <MDBRow className='g-0'>
        <MDBCol md='4'>
          <MDBCardImage style={{padding:'20px 30px 20px'}} className="w-100"
          src='https://images.pexels.com/photos/14094009/pexels-photo-14094009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='PIC' fluid />
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>
            <MDBCardTitle style={{ marginTop:'20px',textAlign:'center',fontSize:'40px'}}>All Products</MDBCardTitle>
            <MDBCardText>
              This is a wider card with supporting text below as a natural lead-in to additional content. This
              content is a little bit longer.
            </MDBCardText>
              <Link className="text-dark" to='/main'>
            <button className="btn border-dark show-butto-new" >All Products</button></Link>
            
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
      </div>
      <br />

      <div className="title1">
        <h2 class="" style={{ textAlign: "center" }}>
          Why C L I C K ?
        </h2>

        <p style={{ textAlign: "center" }}>
          A platform that puts a world of possibilities at your fingertips.
        </p>
      </div>
      <div className="message">
        <div
          className="smart-icon"
          style={{ marginRight: "10px", paddingLeft: "10%" }}
        >
          <img
            style={{ marginLeft: "25%", marginBottom: "10%" }}
            src="https://fotocentreindia.com/wp-content/uploads/2018/07/light-bulb-outlined-hand-drawn-tool.png"
            alt="oic"
          />
          <p>
            With dozens of intelligent concepts, you’ll
            <br /> find what you’re looking for in our store, and <br />
            it will be unique and personalized to match.
          </p>
        </div>
        <div
          className="smart-icon"
          style={{ marginRight: "10px", paddingLeft: "10%" }}
        >
          <img
            style={{ marginLeft: "25%", marginBottom: "10%" }}
            src="https://fotocentreindia.com/wp-content/uploads/2018/07/chatting-speech-bubbles-hand-drawn-bubbles-couple.png"
            alt="oic"
          />
          <p>
            Our customer support is second to none – <br />
            users rave about how we don’t rest until <br />
            every issue is solved to their satisfaction.
          </p>
        </div>
        <div
          className="cart-icon"
          style={{ marginRight: "10px", paddingLeft: "10%" }}
        >
          <img
            style={{ marginLeft: "25%", marginBottom: "10%" }}
            src="https://fotocentreindia.com/wp-content/uploads/2018/07/shopping-cart-sketch.png"
            alt="oic"
          />
          <p>
            With 128-bit SSL security with advanced <br />
            encryption you are guaranteed that your <br />
            purchases are safe.
          </p>
        </div>
      </div>
      <br />





        <Footer/>
    </div>
  );
}
