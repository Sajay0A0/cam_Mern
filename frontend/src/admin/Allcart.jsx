import { useContext, useEffect } from "react"
import { myContext } from "../user/Context"
import axios from "axios";
import Adminnavbar from "./Adminnavbar";

export default function Allcart(){
    const {product,cart,setCart}=useContext(myContext)
    const email=localStorage.getItem("userEmail")


    useEffect(() => {
        fetchCart();
      }, []);
    
      const fetchCart = async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/user/getcart",
            {
              userEmail: email,
              productId: product._id,
            }
          );
    
          setCart(response.data.cartItem);
        } catch (error) {
          console.error("error fetching cart:", error);
        }
      };
      const cartData = cart.map((cartItem) => cartItem.productId);
  const cartProducts = product.filter((productData) =>
    cartData.includes(productData._id)
  );

    return(
        <div>
          <Adminnavbar/>
             {/* <h2>All Users</h2>  */}
           {cartProducts.map((val)=>(
                <div style={{borderBottom:'solid 1px #ddd',paddingTop:'30px',marginTop:'20px'}}>
                  <ul>
                    <img style={{width:'100px'}} src={val.image} alt="" />
                     <label style={{paddingLeft:'90px'}}>{val.prod_name}</label>
                     <label style={{paddingLeft:'90px'}}>{val.price}</label>
                      
                    </ul>
                </div>
           ))
           }


        </div>
    )
}
