import { useContext, useEffect, useState } from "react"
import { myContext } from "./Context"
import Card from "react-bootstrap/Card";
import Usernav from "./Usernav";
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import { useNavigate } from "react-router-dom";

export default function Cart(){

    
    const {product,cart,setCart}=useContext(myContext);
     const [cartTotal, setCartTotal]=useState(0);
     const navigate=useNavigate()


     function handleClick(productId){
        navigate(`/descript/${productId}`)
        }

     useEffect(()=>{
        const calculateCartTotal=()=>{
            return cart.reduce((total,item)=>{
                const quantity=item.quantity || 1;
                const price = item.price || 0;
                return total + price * quantity;
            },0);
        }
        setCartTotal(calculateCartTotal());
    },[cart])

    const handleQuantityChange = (valId,newquantity) =>{
        const updatCart=cart.map((val)=>
    val.id === valId ? {...val,quantity:newquantity}:val);
    setCart(updatCart);
    }

     
     function unCartbtn(val){
        setCart(cart.filter((item)=>item !==val));
     }

    return(
        <div>
            <Usernav/>
            <div>
            <h2>C A R T</h2>
            <h3 style={{paddingLeft:"45%"}}>Total:{cartTotal.toFixed(2)}/-</h3>
           {cart.map((val,index)=>
           <div>
           
            <Card
              className="body"
              style={{ width: "20rem", padding: "10px 15px" }}>
              <Card.Img className="image" variant="top" src={val.image} />
              <Card.Body>
                <Card.Title>{val.prod_name}</Card.Title>
                <Card.Text>₹{val.price}/-</Card.Text>
                <Card.Text>{val.description} </Card.Text>
              </Card.Body>
              <Card.Body>
                <Card.Link href="#" 
                className="btn btn-dark bg-white rounded-lg text-dark text-decoration-none"
                onClick={() => handleClick(product._id)}>Details</Card.Link>
                 <Card.Link className="btn btn-dark bg-white rounded-lg text-dark text-decoration-none"
                  onClick={()=>unCartbtn(val)}> <ProductionQuantityLimitsOutlinedIcon sx={{fontSize:'30px'}}/> </Card.Link>
              </Card.Body>
              </Card>

              Quantity : 
                   
                {val.quantity || 1}
                <button onClick={()=> handleQuantityChange(val.id,Math.max(1,(val.quantity || 1)-1))}>delete</button>

                <button onClick={()=> handleQuantityChange(val.id,(val.quantity || 1)+1)}>{" "}add</button>

                <h5>total: {(val.price || 0)*(val.quantity || 1)}/-</h5>

               </div>
               
           )}
                   
       </div>
        </div>
    )
}