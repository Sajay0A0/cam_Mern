import React, { Fragment, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../components_style/Usernav.css';
import '../components_style/Popup.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { myContext } from '../user/Context';

export default function Adminnavbar() {
  const { adEmail, setAdemail } = useContext(myContext);
  const [popup, setPopup] = useState(false);
  const nav = useNavigate();

  const adminAuth = () => {
    const adminAuthToken = localStorage.getItem("adminAuthToken");
    const adminEmail = localStorage.getItem("adminEmail");
    return adminAuthToken && adminEmail;
  }

  const adlogout = () => {
    localStorage.removeItem("adminAuthToken");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminId");
    setAdemail(null);
    alert("Admin logout successful");
    nav('/adlogin', { replace: true }); // Use replace to prevent going back
  }

  const click = () => {
    setPopup(!popup);
  }

  const unclick = () => {
    setPopup(false);
  }

  const adminLink = (
    <div className="">
      <div className='pop'>
        <Link onClick={click} className=''>
          <AccountCircleIcon sx={{ fontSize: '60px', color: 'black' }} />
        </Link>
        <div>
          {popup ? 
            <div>
              <div className='pop-main'></div>
              <div className='popup'>
                <div className='popUp-header'>
                  <h1 className='pop-h1'><AccountCircleIcon sx={{ fontSize: '120px', color: 'black' }} /></h1>
                  <div>
                    <h6 className='pop-h2' onClick={unclick}>
                      <CloseIcon sx={{ fontSize: '35px', borderLeft: 1, borderBottom: 1, borderRadius: '8px' }} />
                    </h6>
                  </div>
                </div>
                <p className='pop-p'>Hello Admin!</p>
                <Link onClick={adlogout}>
                  <span className='btn border-dark pop-logout me-2'>Logout</span>
                </Link>
              </div>
            </div>
          : ''}
        </div>
      </div>
    </div>
  );

  const adLink = (
    <Fragment>
      <li><Link className='btn border-dark login-1' to='/adlogin' style={{fontWeight:'500'}}>Login</Link></li>
    </Fragment>
  );

  return (
    <div className='div1 sticky-top'>
      <Navbar expand="lg" className="color flex px-4 py-4 fixed">
        <Container className='nav'>
          <Link className="text-dark text-decoration-none me-5"
            style={{ fontFamily: "Nova Square", paddingRight: "30px", paddingTop: '5px', fontWeight: "bolder" }} to="/">C L I C K</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="home me-5 text-dark text-decoration-none"
                style={{ marginTop: '7px' }} to="/addproduct">Add Product</Link>
              <Link className="home me-5 text-dark text-decoration-none"
                style={{ marginTop: '7px' }} to="/getuser">Add User</Link>
              <Link className="home me-5 text-dark text-decoration-none"
                style={{ marginTop: '7px' }} to="/usercart">User Cart</Link>
              <Link className="home me-5 text-dark text-decoration-none"
                style={{ marginTop: '7px' }} to="/contact">Contact Us</Link>
            </Nav>
            {adminAuth() ? adminLink : adLink}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
