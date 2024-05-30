import { UNSAFE_DataRouterContext, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Usernav from "./Usernav";
import { useContext, useEffect } from "react";
import { myContext } from "./Context";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Checkbox } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export default function Main(){

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
      price:product.price,
      quantity:1,

    })
    
   console.log("cart",res.data);
   } catch (error) {  
    console.log("error adding",error);
   }
  };

  function handleClick(productId){
    navigate(`/descript/${productId}`)
    }

    return(
        <div>
            <Usernav/>
            
            <div style={{display: "flex",flexWrap: "wrap",paddingLeft: "60px",marginTop: "20px",}}>

             { product.map((product) => (
            
            <Card
              className="body"
              style={{ width: "18rem", padding: "10px 13px" }}>
            
              <Card.Img
                className="image"
                style={{ height: "13rem", width: "15rem" }}
                variant="top"
                src={product.image}
                onClick={() => handleClick(product._id)}
              />
             
              <Card.Body>
                <Card.Title>{product.prod_name} </Card.Title>
                <Card.Text>₹{product.price}/-</Card.Text>
         
              </Card.Body>
              <Card.Body className="button">
           
            

                <Card.Link
                  className="btn btn-dark bg-white rounded-lg text-dark text-decoration-none"
                   onClick={() => addtocart(product)}
                >
                  <Checkbox style={{width:"200px",height:'31px'}} icon={<AddShoppingCartIcon sx={{fontSize:'30px',color:'black'}}/> }
                   checkedIcon={<ShoppingCartIcon sx={{fontSize:'30px',color:'black'}}/>}/>
                </Card.Link>
  
      
              </Card.Body>
            </Card>
            
            
          ))
        }
        </div>

        <Footer/>

        </div>
    )
}