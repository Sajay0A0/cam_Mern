import Usernav from "../user/Usernav";
import{Link} from "react-router-dom"
import"../components_style/Adminnav.css"
import Adminnavbar from "./Adminnavbar";

export default function Adminnav(){

    return(
        <div>
            <Adminnavbar/>
            <h2>hello admin</h2>

        
            <div className="addpro"  >
                <Link className="btn border-dark link" to={"/addproduct"} style={{paddingTop:'10px',paddingLeft:'30px',display:'flex',}}>Add Product</Link>
            </div><br />

            <div className="addpro">
                <Link className=" btn border-dark link" to={"/getuser"} style={{paddingTop:'10px',paddingLeft:'50px' ,display:'flex',}}>Add User</Link>
            </div><br />

            {/* <div className="addpro">
                <Link className="link" to={"/sndmail"}> mail</Link>
            </div> */}
            <div className="addpro">
                <Link className="btn border-dark link" to={"/usercart"} style={{paddingTop:'10px',paddingLeft:'50px' ,display:'flex',}}>User Cart</Link>
            </div>
        </div>
    )
}