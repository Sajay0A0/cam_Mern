import "./App.css";
import { myContext } from "./user/Context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from 'axios'
import Signup from "./user/Signup";
import { useEffect, useState } from "react";
import Login from "./user/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Adlogin from "./admin/Adlogin";
import Adminpage from "./admin/Adminpage";
import Home from "./user/Home";
import Adminnav from "./admin/Adminnav";
import Usernav from "./user/Usernav";
import Camera from "./user/Camera";
import Audio from "./user/Audio";
import Lensesanaccess from "./user/Lensesanaccess";
import Lights from "./user/Lights";
// import Prodcatagories from "./user/Prodcatagories";
import Alluser from "./admin/Allusers";
import Dslr from "./dropdown/Dslr";
import Description from "./user/Descripsion";
import Mirrless from "./dropdown/Mirrless";
import Instant from "./dropdown/Instant";
import Contact from "./user/Contact";
import About from "./user/About";
import Dslrlenses from "./dropdown/Dslrlenses";
import Videocam from "./dropdown/Videocam";
import Mirrlesslens from "./dropdown/Mirrlesslens";
import Mediumformat from "./dropdown/Mediumformat";
import Morphiclens from "./dropdown/Morphiclens";
import Emailform from "./admin/Sendmail";
import Carti from "./user/Carti";
import Allcart from "./admin/Allcart";
import Microphone from "./dropdown/Microphone";
import Recoder from "./dropdown/Recoders";
import Main from "./user/Main";
import Ordernow from "./user/Ordernow";
import Checkout from "./user/Checkout";
import Byproduct from './user/Byproduct';
import Buyallprod from "./user/Buyallprod";
import Adminnavbar from "./admin/Adminnavbar";
import Accessory from "./dropdown/Accessories";
import Continueoslens from "./dropdown/Continuelight";
import Led from "./dropdown/Led";
import Flash from "./dropdown/Flash";
import Softbox from "./dropdown/Softbox";
import Nikon from "./brand/Nikon";
import Canon from "./brand/Canon";
import Placedorder from "./user/Placedorder";
import Placedall from "./user/Placedall";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fujifilm from "./brand/Fujifilm";
import Sony from "./brand/Sony";
import Horizon from "./user/Slidingimg";
import Sigma from "./brand/Sigma";
import Sirui from "./brand/Sirui";
import Dji from "./brand/Dji";
import Feelworld from "./brand/Feelworld";
import Godox from "./brand/Godox";
import Boya from "./brand/Boya";
import Tokina from "./brand/Tokina";
import Smallring from "./brand/Smallring";
import Tethertool from "./brand/Tethertool";
import Easycover from "./brand/Easycover";
import Loading from "./user/Loading";



function App() {
  const [product, setProduct] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adEmail, setAdemail] = useState("");
  const [adPassword, setAdpassword] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [description, setDescription] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [image, setImage] = useState("");
  const [user, setUser] = useState([]);
  const [catogery, setCatogery] = useState("");
  const [SearchInput, setSearchInput]=useState([])
  const [cart,setCart]=useState([]);
  const [like,setLike]=useState([])
  const [logUser,setLogUser]=useState([]);
  const [cartTotal,setCartTotal]=useState();
  const [brand,setBrand]=useState('');
  const [reverse,setReverse]=useState(false);
  const [checkout,setCheckout]=useState([])
  const [loading,setLoading]=useState(true)



  useEffect(()=>{
    fetchProduct();
},[]);

const fetchProduct=async()=>{
    try {
        const response =await axios.get('http://localhost:5000/api/user/getproducts');
        setProduct(response.data);

    } catch (error) {
        console.error('error fetch product:', error);
        
    }
};

useEffect(()=>{
  setTimeout(() => {
    setLoading(false)
  }, 2500);
})

  const val = {
    product,setProduct,
    // fetchProduct,
    name,setName,
    email,setEmail,
    password,setPassword,
    adEmail,setAdemail,
    adPassword,setAdpassword,
    productName,setProductName,
    productPrice,setProductPrice,
    description,setDescription,
    editProduct,setEditProduct,
    image,setImage,
    user,setUser,
    catogery,setCatogery,
    SearchInput, setSearchInput,
    cart,setCart,
    cartTotal,setCartTotal,
    brand,setBrand,
    like,setLike,
    reverse,setReverse,
    logUser,setLogUser,
    checkout,setCheckout,
    loading,setLoading
  };

  return (
    <div>
      {loading ? (
        <Loading/>
      ):(
      <myContext.Provider value={val}>
        <BrowserRouter>

          <Routes>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<Home />} />
            <Route path="/navbar" element={<Usernav />} />
            <Route path="/adlogin" element={<Adlogin />} />
            <Route path="/addproduct" element={<Adminpage />} />
            <Route path="/adnavbar" element={<Adminnav />} />
            <Route path="/adminnavbar" element={<Adminnavbar/>}/>
            {/* <Route path="/products/:catogery" element={<Prodcatagories/>}/> */}
            <Route path="/camera" element={<Camera />} />
            <Route path="/audio" element={<Audio/>}/>
            <Route path="/lenses" element={<Lensesanaccess/>}/>
            <Route path="/lights" element={<Lights/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path='/getuser' element={<Alluser/>}/>
            <Route path="/descript/:id" element={<Description/>}/>
            {/* <Route path="/cart" element={<Cart/>}/> */}
            <Route path="/cart" element={<Carti/>}/>
            {/* <Route path="/like" element={<Likey/>}/> */}
            <Route path="/dslr" element={<Dslr/>}/>
            <Route path="/mirrless" element={<Mirrless/>}/>
            <Route path="/instax" element={<Instant/>}/>
            <Route path="/dslrlens" element={<Dslrlenses/>}/>
            <Route path="/videocam" element={<Videocam/>}/>
            <Route path="/Mirrlesslens" element={<Mirrlesslens/>}/>
            <Route path="/Mediumformat" element={<Mediumformat/>}/>
            <Route path="/morphiclens" element={<Morphiclens/>}/>
            <Route path="/microphone" element={<Microphone/>}/>
            <Route path="/record" element={<Recoder/>}/>
            <Route path="/accessory" element={<Accessory/>}/>
            <Route path="/continue" element={<Continueoslens/>}/>
            <Route path="/led" element={<Led/>}/>
            <Route path="/flash" element={<Flash/>}/>
            <Route path="/softbox" element={<Softbox/>}/>
            <Route path="/nikon" element={<Nikon/>}/>
            <Route path="/canon" element={<Canon/>}/>
            <Route path="/fujifilm" element={<Fujifilm/>}/>
            <Route path="/sony" element={<Sony/>}/>
            <Route path="/sigma" element={<Sigma/>}/>
            <Route path="/sirui" element={<Sirui/>}/>
            <Route path="/dji" element={<Dji/>}/>
            <Route path="/feelworld" element={<Feelworld/>}/>
            <Route path="/godox" element={<Godox/>}/>
            <Route path="/boya" element={<Boya/>}/>
            <Route path="/tokina" element={<Tokina/>}/>
            <Route path="/smallring" element={<Smallring/>}/>
            <Route path="/tethertool" element={<Tethertool/>}/>
            <Route path="/easycover" element={<Easycover/>}/>
            <Route path="/sndmail" element={<Emailform/>}/>
            <Route path="/usercart" element={<Allcart/>}/>
            <Route path="/main" element={<Main/>}/>
            <Route path="/ordernow/:id" element={<Ordernow/>}/>
            <Route path="/checkout" element={<Checkout/>}/> 
            <Route path="/byproduct/:id" element={<Byproduct/>}/>
            <Route path="/buyallprod" element={<Buyallprod/>}/>
            <Route path="/palacedorder" element={<Placedorder/>}/>
            <Route path="/placedall" element={<Placedall/>}/>
            <Route path="/sliding" element={<Horizon/>}/>

          </Routes>
          <ToastContainer/>
        </BrowserRouter>
      </myContext.Provider>
      )}
    </div>
  );
}

export default App;
