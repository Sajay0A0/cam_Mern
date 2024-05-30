import axios from "axios";
import { useContext, useEffect, useState } from "react"
import "../components_style/Adminpage.css"
import { myContext } from "../user/Context";
import Adminnavbar from "./Adminnavbar";


export default function Adminpage(){

    // const [product,setProduct]=useState([]);
    const {product,setProduct}=useContext(myContext)
    const [productName,setProductName]=useState('');
    const [productPrice,setProductPrice]=useState('');
    const [description,setDescription]=useState('');
    const [catogery,setCatogery]=useState('');
    const [brand,setBrand]=useState('');
    const [specify,setSpecify]=useState('');
    const [editProduct,setEditProduct]=useState(null);
    const [image,setImage]=useState('');

    useEffect(()=>{
        fetchProduct();
    },[]);

    const fetchProduct=async()=>{
        try {
            const response =await axios.get('http://localhost:5000/api/user/getproducts');
            setProduct(response.data);

        } catch (error) {
            console.error('error fetch product:',error);
            
        }
    };
    console.log("prod",product);

    const addProduct=async()=>{
        try {
           await axios.post('http://localhost:5000/api/user/add',{ prod_name:productName,price:productPrice,description:description,image:image,catogery:catogery,brand:brand,specify:specify},
           (req,res)=>console.log(req.body));
           fetchProduct()

           setProductName('');
           setProductPrice('');
           setDescription('');
           setImage('');
           setCatogery('');
           setBrand('');
           setSpecify('');
        } catch (error) {
            console.error('error adding product',error );
            
        }
    };

    const editproduct = (product) => {
        setEditProduct(product._id);
        setProductName(product.prod_name);
        setProductPrice (product.price);
        setDescription(product.description);
        setImage(product.image);
        setCatogery(product.catogery);
        setBrand(product.brand);
        setSpecify(product.specify)
      };
    
      const cancelEdit=()=>{
        setEditProduct(null);
        setProductName('');
        setProductPrice('');
        setDescription('');
        setImage('');
        setCatogery('');
        setBrand('');
        setSpecify('');
      };

      const updateProduct=async (id,updateName,updatePrice,updateDescription,updateimage,Updatecatogery,updatebrand,updatespecify)=>{
        try {
            await axios.put(`http://localhost:5000/api/user/update/${id}`,{prod_name:updateName,price:updatePrice,description:updateDescription,
            image:updateimage,catogery:Updatecatogery,brand:updatebrand,specify:updatespecify});
            fetchProduct();
            cancelEdit();
        } catch (error) {
            console.error('error updating product:',error);

        }
      };
      const confirmDelete=(id,deleteProdName)=>{
        if (window.confirm(`are you sure you want to delete this product,"${deleteProdName}"?`)) {
            deleteProduct(id);
            console.log("deleteProduct",id);
        }
      };

      const deleteProduct =async(id)=>{
        try {
            await axios.delete(`http://localhost:5000/api/user/delete/${id}`);
            fetchProduct();
        } catch (error) {
            console.error('error deleting product:',error);
            
            
        }
      };


    return(
        <div>
            <Adminnavbar/>

          <div>
            <h2 className="text-center" style={{marginTop:'30px'}}>add product</h2>
            <form style={{marginTop:'20px'}}>
                <input className="edit" type="text" placeholder="product name" value={productName}
                onChange={(e)=> setProductName (e.target.value)}/>

                <input className="edit"  type="text" placeholder="product price" value={productPrice}
                onChange={(e)=> setProductPrice (e.target.value)}/>

                <input className="edit" type="text" placeholder=" description" value={description}
                onChange={(e)=> setDescription (e.target.value)}/>

                <input className="edit" type="text" placeholder="image" value={image}
                onChange={(e)=> setImage(e.target.value)}/>

                <input className="edit" type="text" placeholder="catogery" value={catogery}
                onChange={(e)=> setCatogery (e.target.value)} />

                <input className="edit" type="text" placeholder="brand" value={brand}
                onChange={(e)=> setBrand (e.target.value)} />

                <input className="edit" type="text" placeholder="specify" value={specify}
                onChange={(e)=> setSpecify (e.target.value)} />
              

                <button onClick={addProduct}> ADD </button>
            </form>

          </div>
          <h2  style={{marginLeft:'6cm',marginTop:'25px'}}>All Products</h2>
          <div className="ul-decoration">
        <ol>
          {product.map((product)=>(
            <li key={product._id}>
                <div>
                    {editProduct === product._id ?(
                        <>
                        <input className="edit" type="text" placeholder="product name" value={productName} 
                        onChange={(e)=> setProductName(e.target.value)}/>

                        <input className="edit" type="text" placeholder="product price" value={productPrice} 
                        onChange={(e)=>setProductPrice(e.target.value)}/>

                        <input className="edit" type="text" placeholder="description" value={description} 
                        onChange={(e)=> setDescription(e.target.value)}/>

                        <input className="edit" type="text" placeholder="img url" value={image}
                        onChange={(e)=>setImage(e.target.value)} />

                        <input className="edit" type="text" placeholder="catogery" value={catogery}
                        onChange={(e)=> setCatogery(e.target.value)} />

                        <input className="edit" type="text" placeholder="brand" value={brand}
                        onChange={(e)=> setBrand(e.target.value)} />

                        <input className="edit" type="text" placeholder="specify" value={specify}
                        onChange={(e)=> setSpecify(e.target.value)} />


                        <button className="btn3" onClick={()=> updateProduct (product._id,productName,productPrice,description,image,catogery,brand,specify)}>Update</button>
                        <button className="btn4" onClick={cancelEdit}>Cancel</button>
                        </>
                    ):(
                        <div className="adnav">
                        <span><img className="img" style={{marginLeft:'10px'}} src={product.image} alt="pic"/></span>
                        <span className="span" style={{paddingLeft:'20px'}}>{product.prod_name}</span>
                        <span className="span"> - ₹{product.price}/-</span>
                        <span className="span">-{product.description}</span>
                        <span className="span">-{product.catogery}-</span>
                        <span className="span">-{product.brand}-</span>
                        <span className="span">-{product.specify}-</span>
                        - <button className="btn1" onClick={()=> editproduct(product)}>Edit</button>
                        <button className="btn2"  onClick={()=> confirmDelete(product._id,product.prod_name)}> Delete </button>
                        </div>
                    )}
                </div>
            </li>
          ))}
          </ol>
          </div>
          
        </div>
    )
}