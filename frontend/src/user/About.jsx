import Footer from "./Footer";
import Usernav from "./Usernav";
import Card from "react-bootstrap/Card";
import {MDBCard,MDBCardTitle,MDBCardText,MDBCardBody,MDBCardImage, MDBRow,MDBCol} from 'mdb-react-ui-kit';
import CardText from "react-bootstrap/esm/CardText";




export default function About(){

    return(
        <div>
           <Usernav/>
           <h1
          className="title text-center "
          style={{fontFamily:"Nova Square",display: "flex",position: "absolute",
          zIndex: 2,color: "white", marginLeft: "8%", fontSize: "120px",marginTop: "10%",}}>
         About us
        </h1>
        <img 
          src="https://images.pexels.com/photos/1447260/pexels-photo-1447260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="pic" className="w-100" style={{ height: "13cm", filter:'brightness(0.5)'}}/>

      <MDBCard border="light" style={{ maxWidth: '100%',paddingRight:'50px',paddingLeft:'50px', paddingTop:'30px', }}>
      <MDBRow className='g-0'>
        <MDBCol md='4'>
          <MDBCardImage style={{padding:'20px 10px 10px 10px',}} src='https://images.pexels.com/photos/14094009/pexels-photo-14094009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='...' fluid />
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>
            <MDBCardTitle style={{fontFamily:"Nova Square",fontWeight:'bolder',fontSize:'40px'}}>Our journey began in 2024</MDBCardTitle>
            <MDBCardText style={{fontSize:'19px',paddingTop:'35px'}}>
            FOTOCENTRE TRADING Co. was established in 1991 with the objective of providing sales service for Digital Camera, SLR Camera, Handycam, their accessories and all other related products. In the year of 2010 , it was incorporated to FOTOCENTRE TRADING PVT. LTD.
            </MDBCardText>
            <MDBCardText style={{fontSize:'19px', paddingTop:'20px'}} >
            FOTOCENTRE TRADING PVT. LTD. is an organization aided with young, dynamic & dedicated people. Since it’s inception, the sincere efforts of our personnel are directed towards achieving maximum customer satisfaction            
            </MDBCardText>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
    <div style={{padding:'20px 65px 0 65px',fontSize:'19px',}}>
    <p>We allot top priority to innovation & upgradation of technology in the avenues of Distribution of All kinds and brands of Digital Camera and their related accessories.</p>
    <p>We at FOTOCENTRE TRADING PVT. LTD. believe in providing good quality products & after sales service in real sense. Our responsibility does not end with just the sale of a product, rather, it begins with it and lasts until the product functioning is in accordance with our valued customer’s satisfaction.</p>
    <p>We at FOTOCENTRE TRADING PVT. LTD. believe in providing good quality products & after sales service in real sense. Our responsibility does not end with just the sale of a product, rather, it begins with it and lasts until the product functioning is in accordance with our valued customer’s satisfaction.</p>
    <p>Why We :- The company’s philosophy stands on the pedestal of Quality, Commitment & Excellence.</p>
    <p>Management’s Philosophy is to continuously invest financial resources to develop new markets and products thus providing products and services of the highest quality to its customers.</p>
    <p>Quality :- Every job is a self portrait of the person who does it. Quality is the essence of good works. It is the stepping stone to success. Because only quality can lead to achievement.</p>
    <p>Commitment :- Commitment is what transforms a promise into reality. It is the words that speak boldly of our intentions. And action that speaks louder than works. It is making the time when there is none. Commitment at FOTOCENTRE is the power to change the face of things.</p>
    <p>Excellence :- Going far beyond the call of duty, doing more than others expect….. this is what excellence is all about. And it comes from striving, maintaining the highest standards, looking after the smallest detail, going that extra mile. We strongly believe that Excellence means doing our very best in everything, in every way.</p>
    </div>
    <div  style={{display: "flex",flexWrap: "wrap",paddingLeft: "60px",marginTop: "20px",}}>

          <Card className="adl_img"style={{ width: "17rem", height: "21rem", marginBottom: "8px" }}>
              <Card.Img
                variant="top"
                src="https://i.pinimg.com/564x/4d/fb/b8/4dfbb81fe6db709e8d8a5c8ed6da39a3.jpg"/>
            <Card.Body>
              <CardText>hello</CardText>
            </Card.Body>
          </Card>

          <Card className="adl_img"style={{ width: "16rem", height: "16rem", marginBottom: "8px" }}>
              <Card.Img
                variant="top"
                src="https://i.pinimg.com/564x/4d/fb/b8/4dfbb81fe6db709e8d8a5c8ed6da39a3.jpg"/>
            <Card.Body>
            <CardText>hello</CardText>
            </Card.Body>
          </Card>

          <Card className="adl_img"style={{ width: "16rem", height: "16rem", marginBottom: "8px" }}>
              <Card.Img
                variant="top"
                src="https://i.pinimg.com/564x/4d/fb/b8/4dfbb81fe6db709e8d8a5c8ed6da39a3.jpg"/>
            <Card.Body>
            <CardText>hello</CardText>
             
            </Card.Body>
          </Card>
          </div><br />

        <Footer/>
      
        </div>
    )
}