import '../components_style/Footer.css'
import { Link } from 'react-router-dom'
import { BsFacebook } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";



export default function Footer(){

    return(
        <div  className="footer " >
            <footer className='footer-main'>
                <p className="foot-name">&copy; 2024click a foto.all rights reserved</p>

               <div className='foot-values'>
               <section className='col-lg-4 ' style={{}}>
                <ul className='ul'>
                    <span  style={{display:'flex',paddingBottom:'10px',fontSize:'25px' }}> <b> C L I C K</b></span>
                <><Link className='  text-decoration-none' style={{color:"#f5f5dc"}} to='/'><span>We believe 
                    in providing good quality products & after sales service in real sense. Our  responsibility does not end with just the sale of a product, rather, it begins with it and lasts until the
                     product functioning is in  accordance with our valued customer’s satisfaction.</span></Link></>
                </ul>
                </section>
                <section className='col-lg-2 '>
                <ul className='ul'>
                    <span  style={{display:'flex',paddingBottom:'10px',fontSize:'25px'}}> <b>Quick Links</b></span>
                <li><Link className='d1  text-decoration-none' to='/'><p><span >Home</span></p></Link></li>
                <li><Link className='d1 text-decoration-none' to='/about'><p><span>About Us</span></p></Link></li>
                <li><Link className='d1 text-decoration-none' to='/contact'><p><span>Contact Us</span></p></Link></li>
                </ul>
                </section>
                <section className=' col-lg-3 ' >
                <ul className='ul'>
                    <span style={{display:'flex',paddingBottom:'10px',fontSize:'25px'}}> <b>Categories</b></span>
                <li><Link className='d1 text-decoration-none' to='/camera'><p><span >Action  Cameras</span></p></Link></li>
                <li><Link className='d1 text-decoration-none' to='/lenses'><p><span>Lenses & Accessories</span></p></Link></li>
                <li><Link className='d1 text-decoration-none' to='/audio'><p><span>Audio</span></p></Link></li>
                <li><Link className='d1 text-decoration-none' to='/lights'><p><span>Lighting & Studio</span></p></Link></li>
                </ul>
                </section>

                <section className='contact-info col-lg-3 '>
                <span  style={{display:'flex',paddingBottom:'10px',color:'#f5f5dc',fontSize:'25px'}}> <b>Contact Details</b></span>
               
  	            <span class="ph">Ph.No : 022-22700900<br/>+91 9985985473<br/>+91 8125173473</span><br/>
  	            <span class="Email-ID">Email : clickapick001@gmail.com</span><br />
  	            <span class="Address">Address :  104,1st Floor, Ravi Building,<br />189-191, Dr. D. N. Road, Fort,<br />Mumbai – 400 001, Maharashtra,<br />India</span><br />

                </section>

               </div>
               {/* <div  style={{display:'flex',flex:"wrap",marginLeft:'40%',fontSize:'26px',justifyContent:'space-around',marginRight:'40%'}}>
               <BsFacebook className='foot-icon'/>
               <BsLinkedin className='foot-icon'/>
               <FaTwitter className='foot-icon'/>
               <IoLogoInstagram className='foot-icon'/>


               </div> */}
               
               
            </footer>
            <br/>
            <br/>
        </div>
    )
}