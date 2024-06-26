// Usernav.js
import React, { Fragment, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { myContext } from './Context';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../components_style/Usernav.css';
import '../components_style/Popup.css';

export default function Usernav() {
  const { logUser, setLogUser,cart, adEmail, setAdemail } = useContext(myContext);
  const [searchInput, setSearchInput] = useState('');
  const nav = useNavigate();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const pathtomap = {
    lig: '/lights',god: '/godox',mic:'/microphone',
    len: '/lenses',boy: '/boya',rec:'/record',
    mic: '/audio',tok: '/tokina',acce:'/accessory',
    cam: '/camera',sma: '/smallring',char:'/accessory',
    ds: '/dslr',tet: '/tethertool',cab:'/accessory',
    nik: '/nikon',eas: '/easycover',bat:'/accessory',
    can: '/canon',vid :'/videocam',cov:'/accessory',
    fuj: '/fujifilm',ins: '/instax',cas:'/accessory',
    son: '/sony',mir: '/mirrless',conti:'/continue',
    sig: '/sigma',len:'/Mirrlesslens',led:'/led',
    sir: '/sirui',meadi:'/Mediumformat',fla:'/flash',
    dji: '/dji',medi: '/Mediumformat',soft:'/softbox',
    feel: '/feelworld',mor: '/morphiclens'
  };

  const handleSearch = () => {
    const lowerCaseInput = searchInput.toLowerCase();
    for (const keyword in pathtomap) {
      if (lowerCaseInput.startsWith(keyword)) {
        return pathtomap[keyword];
      }
    }
  };

  const auth = () => {
    const authToken = localStorage.getItem('authToken');
    const userEmail = localStorage.getItem('userEmail');
    return authToken && userEmail;
  };

  const logoutbtn = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    alert('Logout successful');
    setLogUser(null);
    nav('/');
  };

  const adlogout = () => {
    localStorage.removeItem('adminAuthToken');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminId');
    alert('Admin logout successful');
    setAdemail(null);
    nav('/adlogin');
  };

  const [popup, setPopup] = useState(false);
  const click = () => {
    setPopup(!popup);
  };
  const unclick = () => {
    setPopup(false);
  };

  const authLink = (
    <div className="">
      <div className="pop me-2">
        <Link onClick={click} className="me-2">
          <AccountCircleIcon sx={{ fontSize: '60px', color: 'black' }} />
        </Link>

        <div>
          {popup ? (
            <div>
              <div className="pop-main"></div>
              <div className="popup">
                <div className="popUp-header">
                  <h1 className="pop-h1">
                    <AccountCircleIcon sx={{ fontSize: '120px', color: 'black' }} />
                  </h1>
                  <div>
                    <h6 className="pop-h2" onClick={unclick}>
                      <CloseIcon
                        sx={{ fontSize: '35px', borderLeft: 1, borderBottom: 1, borderRadius: '8px' }}
                      />
                    </h6>
                  </div>
                </div>
                <p className="pop-p">hey {logUser && logUser.name} ...!</p>

                <Link className="btn border-secondary  link-1" to="/placedall" style={{ fontWeight: '500' }}>
                  Orders
                </Link>
                <Link className="btn border-secondary  link-2" to="/adlogin" style={{ fontWeight: '500' }}>
                  Admin
                </Link>

                <div>
                  <Link onClick={logoutbtn}>
                    <span className="btn border-dark pop-logout me-2">Logout</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );

  const guestLink = (
    <Fragment>
      <li>
        <Link className="btn border-dark login-1" to="/login" style={{ fontWeight: '500' }}>
          Login
        </Link>
      </li>
    </Fragment>
  );

  return (
    <div className="div1 sticky-top">
      <Navbar expand="lg" className="color flex px-4 py-4 fixed">
        <Container className="nav">
          <Link
            className="text-dark text-decoration-none me-4"
            style={{ fontFamily: 'Nova Square', paddingRight: '30px', fontWeight: 'bolder' }}
            to="/"
          >
            C L I C K
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown className="me-3 hello" title=" Cameras" id="basic-nav-dropdown">
                <Link className="item" to="/dslr">
                  DSLR Camera
                </Link>
                <Link className="item" to="/mirrless">
                  Mirrorless Camera
                </Link>
                <Link className="item" to="/instax">
                  Instant Camera
                </Link>
                <Link className="item" to="/videocam">
                  Video Camera
                </Link>
              </NavDropdown>
              <NavDropdown className="me-3" title="Lenses & Accessories" id="basic-nav-dropdown">
                <Link className="item" to="/dslrlens">
                  DSLR Lenses
                </Link>
                <Link className="item" to="/Mirrlesslens">
                  Mirrorless Lenses
                </Link>
                <Link className="item" to="/mediumformat">
                  Medium Format
                </Link>
                <Link className="item" to="/morphiclens">
                  Anamorphic Lenses
                </Link>
                <Link className="item" to="/accessory">
                  Accessories
                </Link>
              </NavDropdown>
              <NavDropdown className="me-3" title="Audio" id="basic-nav-dropdown">
                <Link className="item" to="/microphone">
                  Microphones
                </Link>
                <Link className="item" to="/record">
                  Recorders
                </Link>
              </NavDropdown>
              <NavDropdown className="me-3" title="Lighting & Studio" id="basic-nav-dropdown">
                <Link className="item" to="/continue">
                  Continuous Light
                </Link>
                <Link className="item" to="/led">
                  LED & LED Panel
                </Link>
                <Link className="item" to="/flash">
                  Flash
                </Link>
                <Link className="item" to="/softbox">
                  Softbox
                </Link>
              </NavDropdown>

              <Link
                className="home me-5 text-dark text-decoration-none"
                style={{ marginTop: '7px' }}
                to="/contact"
              >
                Contact Us
              </Link>

              <Link
                className="home text-dark text-decoration-none"
                to="/cart">
              
                <AddShoppingCartIcon sx={{ marginTop: '7px',fontSize:'30px' }} /></Link>

                
                {totalItems > 0 && <span style={{display:'flex',margin:'0 0 30px 0 ',width:'19px',height:'19px',paddingLeft:'5px',borderRadius:'50px',backgroundColor:'black',color:'white', fontSize: '12px',fontWeight:'bold' }}>
                  {totalItems}</span>}
            </Nav>
            <div className="d-flex">
              <input
                className="me-2 rounded border-0"
                style={{ width: '100%' }}
                type="text"
                placeholder="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Link to={handleSearch()}>
                <Button className="text-dark me-3" variant="outline-success" style={{ fontWeight: '500' }}>
                  Search
                </Button>
              </Link>
            </div>

            {auth() ? authLink : guestLink}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
