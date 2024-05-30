import { useContext } from "react";
import Usernav from "./Usernav";
import { myContext } from "./Context";
import Card from "react-bootstrap/Card";


export default function Like(){

    const {like,setLike}=useContext(myContext);


    function unbtn(val){
        setLike(like.filter((item)=>item !==val));
     }

    return(
        <div>
            <Usernav/>
            <h2>L I K E</h2>
            {like.map((val,index)=>
            <div>
            <Card
              className="body"
              style={{ width: "17rem", padding: "10px 15px" }}>
                 <Card.Body className="btn btn-defualt bg-primary rounded-lg text-white text-decoration-none"
                 onClick={()=>unbtn(val)}>like</Card.Body>
              <Card.Img className="image" variant="top" src={val.image} />
              <Card.Body>
                <Card.Title>{val.prod_name}</Card.Title>
                <Card.Text>₹{val.price}/-</Card.Text>
                <Card.Text>{val.description} </Card.Text>
              </Card.Body>
              </Card>
            </div>
        
        )}
        </div>
    )
      
}