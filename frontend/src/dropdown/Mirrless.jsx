import { useContext } from "react"
import { myContext } from "../user/Context"
import Card from 'react-bootstrap/Card';
import "../components_style/Home.css";
import Usernav from "../user/Usernav";
import Footer from "../user/Footer";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Checkbox } from "@mui/material";
import axios from "axios";

export default function Mirrless(){

  const {product,cart,setCart,like,setLike}=useContext(myContext)
  const navigate=useNavigate()
  const email=localStorage.getItem("userEmail")

    const mirrorless=product.filter((p)=>
    p.specify==="mirrless")
    console.log("mirrless",product,mirrorless);

    function handleClick(productId){
      navigate(`/descript/${productId}`)
    }

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

    // const addtolike =(likeitem)=>{
    //   if (like.includes(likeitem)){
    //     setLike(like.filter((product)=>product !==likeitem))
    //   }else{
    //     setLike([...like,likeitem])
    //   }
    //   console.log("likeitems",likeitem);
    // };

    return(
        <div>
          <Usernav/>
            <h1
          className="title text-center "
          style={{display: "flex",position: "absolute",zIndex: 2,color: "white", marginLeft: "8%", fontSize: "120px",marginTop: "10%",}}>
          Mirrorless <br /> Cameras
        </h1>
        <img 
          src="https://images.pexels.com/photos/206501/pexels-photo-206501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1  "
          alt="pic" className="w-100" style={{ height: "15cm", filter:'brightness(0.5)'}}/>
            <div style={{ display: "flex", flexWrap: "wrap", paddingLeft: "50px", marginTop: "60px",}}>
            { mirrorless.map((product) => (
            <Card
              className="body"
              style={{ width: "18rem", padding: "10px 13px" }}>
            {/* <Card.Link
            className=" bg-white rounded-lg text-dark text-decoration-none"
           style={{paddingLeft:'90%'}} onClick={() => addtolike(product)}
          >
            {like.includes(product) ? <Favorite fontSize="large" sx={{ color:'red'}}/> :<FavoriteBorder fontSize="large"/>} 
          </Card.Link> */}

              {/* <Link to='/camera'> */}
              <Card.Img
                className="image"
                style={{ height: "13rem", width: "15rem" }}
                variant="top"
                src={product.image}
                onClick={() => handleClick(product._id)}
              />
              {/* </Link> */}
              <Card.Body>
                <Card.Title>{product.prod_name} </Card.Title>
                <Card.Text>₹{product.price}/-</Card.Text>
                {/* <Card.Text>{product.description} </Card.Text> */}
              </Card.Body>
              <Card.Body className="button">
                {/* < to='/login'> */}
              <Card.Link
                  className="btn btn-dark bg-white rounded-lg text-dark text-decoration-none"
                  style={{height:'44px'}} onClick={() => handleClick(product._id)}>
                
                 details
                </Card.Link>
            

                <Card.Link
                  className="btn btn-dark bg-white rounded-lg text-dark text-decoration-none"
                   onClick={() => addtocart(product)}
                >
                  <Checkbox style={{width:"47px",height:'31px'}} icon={<AddShoppingCartIcon sx={{fontSize:'30px',color:'black'}}/> } checkedIcon={<ShoppingCartIcon sx={{fontSize:'30px',color:'black'}}/>}/>
                </Card.Link>
              </Card.Body>
            </Card>
          ))}
            </div>
           <Footer/>

        </div>
    )
}