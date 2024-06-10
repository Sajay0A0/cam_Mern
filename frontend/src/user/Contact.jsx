
import Usernav from "./Usernav";
import Card from "react-bootstrap/Card";
import Footer from "./Footer";


export default function Contact(){

    return(
        <div>
            <Usernav/>
            <h1
          className="title text-center "
          style={{fontFamily:"Nova Square",display: "flex",position: "absolute",
          zIndex: 2,color: "white", marginLeft: "8%", fontSize: "120px",marginTop: "16%",}}>
         Contact now
        </h1>
        <img 
          src="https://images.pexels.com/photos/323503/pexels-photo-323503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="pic" className="w-100" style={{ height: "14cm", filter:'brightness(0.6)'}}/>

        <div 
          style={{display: "flex", flexWrap: "wrap",marginLeft:"10%", paddingLeft: "60px", marginTop: "80px",paddingBottom:'250px'}}>

          <Card className="adl_img" style={{ width: "20rem", height: "18rem",marginBottom:'150px'}}>
    
            <Card.Img variant="top" style={{height:"100%",filter:'brightness(1)'}} 
              src="https://i.pinimg.com/originals/f2/f9/c0/f2f9c091af7bcaeb0760ec0028faf264.png"/><br/>

            <Card.Text className="text-center">
              <b>Retail Store</b> <br /><br />
            104,1st Floor, Ravi Building, 189-191, Dr. D. N. Road, Fort, Mumbai – 400 001, Maharashtra, India.
            </Card.Text>
          </Card>

          <Card className="adl_img" style={{ width: "20rem", height: "18rem",marginBottom:'195px'}}> <br/>

    
             <Card.Img  variant="top" style={{height:"100%"}} 
                src="https://cdn3d.iconscout.com/3d/premium/thumb/calling-5779539-4849629.png"/>

             <Card.Text className="text-center">
             <b> Email:</b> clickapick001@gmail.com<br/><br />

              <b>Office:</b> 022-22700909 <br />
                   +91 22-40110120 <br /><br />

              <b>Contact:</b> +918451811717 <br />
              <b>WhatsApp:</b> +918451811717
             </Card.Text>
          </Card>

          <Card className="adl_img" style={{ width: "20rem", height: "18rem",marginBottom:'8px'}}><br/>
    
            <Card.Img  variant="top"  style={{height:"100%"}} 
              src="https://png.pngtree.com/png-vector/20220724/ourmid/pngtree-office-workplace-icon-work-icon-business-office-vector-png-image_38127618.png"/>

                <Card.Text className="text-center">
               <b> Working Hours</b><br /><br />

               <b> Monday to Saturday:</b><br /><br />

                 9 am – 6 pm
                </Card.Text>
            </Card>
        </div>

        <Footer/>

        </div>
    )
}