import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../components_style/Usernav.css'
import '../components_style/Popup.css'
import { Fragment, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { myContext } from './Context';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';

export default function Usernav() {
  const { logUser, setLogUser, adEmail, setAdemail } = useContext(myContext);
  const [searchInput, setSearchInput] = useState('');
  const nav = useNavigate();

  const pathtomap = {
    dsl: '/dslr',
    lig: '/lights',
    len: '/lenses',
    mic: '/audio',
    cam: '/camera',
    ds: '/dslr',
    nik:'/nikon',
    can:'/canon',
    
  };

  const handleSearch = () => {
    const lowerCaseInput = searchInput.toLowerCase();
    for (const keyword in pathtomap) {
      if (lowerCaseInput.startsWith(keyword)) {
        return pathtomap[keyword];
      }
    }
  }

  const auth = () => {
    const authToken = localStorage.getItem("authToken");
    const userEmail = localStorage.getItem("userEmail");
    return authToken && userEmail;
  }

  // const adminAuth = () => {
  //   const adminAuthToken = localStorage.getItem("adminAuthToken");
  //   const adminEmail = localStorage.getItem("adminEmail");
  //   return adminAuthToken && adminEmail;
  // }

  const logoutbtn = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    alert("Logout successful");
    setLogUser(null);
    nav("/");
    // window.location.reload()
  }

  const adlogout = () => {
    localStorage.removeItem("adminAuthToken");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminId");
    alert("Admin logout successful");
    setAdemail(null);
    nav('/adlogin');
  }

    const [popup,setPopup]=useState(false)
    const click =()=>{
      setPopup(!popup)
    }
   const unclick =()=>{
    setPopup(false)
   }
  
    const authLink = (
    
      <div className="">
        <div className='pop me-2'>
          <Link  onClick={click} className='me-2'>
          <AccountCircleIcon sx={{fontSize:'60px', color:'black'}}/>
          </Link>

          <Link className='btn border-secondary text-secondary login-1' to='/adlogin' style={{fontWeight:'500'}}>Admin</Link>
          
          <div>
            {popup?
            <div  >
              <div className='pop-main' >  </div>
              <div className='popup'>
              <div className='popUp-header'>
                <h1 className='pop-h1'><AccountCircleIcon sx={{fontSize:'120px', color:'black'}}/></h1>
               <div> <h6 className='pop-h2' onClick={unclick}><CloseIcon sx={{fontSize:'35px',borderLeft:1 ,borderBottom:1,borderRadius:'8px',}}/></h6></div>
                
                </div>
                <p className='pop-p'>hey {logUser && logUser.name} ...!</p>
                
                  <Link onClick={logoutbtn}>
                  <span className='btn border-dark   pop-logout me-2'>Logout  </span>
                  </Link>
                  </div>
            
            </div>:''}
            
          </div>
          </div>
  
        </div>
    );


  const guestLink = (
    <Fragment>
      {/* <li><Link to='/signup'>signup</Link></li> */}
      <li><Link className='btn border-dark login-1' to='/login' style={{fontWeight:'500'}}>Login</Link></li>
    </Fragment>
  );

  return (
    <div className='div1 sticky-top'>
       <Navbar expand="lg" className="color flex px-4 py-4 fixed">
        <Container className='nav'>
          <Link className=" text-dark text-decoration-none me-4"
            style={{ fontFamily: "Nova Square", paddingRight: "30px", fontWeight: "bolder" }} to="/">C L I C K</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown className="me-3 hello" title=" Cameras" id="basic-nav-dropdown">
                <Link className='item' to="/dslr">DSLR Camera</Link>
                <Link className='item' to="/mirrless">Mirrorless Camera</Link>
                <Link className='item' to="/instax">Instant Camera</Link>
                <Link className='item' to="/videocam">Video Camera</Link>
              </NavDropdown>
              <NavDropdown className="me-3 " title="Lenses & Accessories" id="basic-nav-dropdown">
                <Link className='item' to="/dslrlens">DSLR Lenses</Link>
                <Link className='item' to="/Mirrlesslens">Mirrorless Lenses</Link>
                <Link className='item' to="/mediumformat">Medium Format</Link>
                <Link className='item' to="/morphiclens">Anamorphic Lenses</Link>
                <Link className='item' to="/accessory">Accessories</Link>
                <Link className='item' to="/palacedorder">order</Link>
              </NavDropdown>
              <NavDropdown className="me-3" title="Audio" id="basic-nav-dropdown">
                <Link className='item' to="/microphone">Microphones</Link>
                <Link className='item' to="/record">Recorders</Link>
              </NavDropdown>
              <NavDropdown className="me-3" title="Lighting & Studio" id="basic-nav-dropdown">
                <Link className='item' to="/continue">Continuous Light</Link>
                <Link className='item' to="/led">LED & LED Panel</Link>
                <Link className='item' to="/flash">Flash</Link>
                <Link className='item' to="/softbox">Softbox</Link>
              </NavDropdown>

              <Link className="home me-5 text-dark text-decoration-none"
                style={{ marginTop: '7px' }} to="/contact">Contact Us</Link>
                
              <Link className="home me-4 text-dark text-decoration-none"
                style={{ marginTop: '7px' }} to="/cart">
                <AddShoppingCartIcon sx={{ fontSize: '30px' }} />
              </Link>
            </Nav>
            <div className="d-flex">
              <input className='me-2 rounded border-0' style={{width:'100%'}} type="text" placeholder='search'
                value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
              <Link to={handleSearch()}>
                <Button className='text-dark me-3' variant="outline-success" style={{fontWeight:'500'}}>Search</Button>
              </Link>
            </div>

            {auth() ? authLink : guestLink}

          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </div>
  );
}
