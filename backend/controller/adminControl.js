const Admin=require("../model/adminDetails");
const User=require("../model/userDetails")
const Product=require("../model/productDetails")
const mongoose =require('mongoose');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');
const jwtSecretKey ="admin123";

const admin=async(req,res) =>{
    let hashedPassword =await bcrypt.hash(req.body.password,10);
    try {
        await Admin.create({
            name:req.body.name,
            mail:req.body.mail,
            password:hashedPassword,
        });
        res.json({success:true});
        
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
};

const loginAdmin = async(req,res) =>{
    try {
        const admin =await Admin.findOne({mail:req.body.mail});

        if (admin) {
            const comparePwd =await bcrypt.compare(req.body.password, admin.password);

            if (comparePwd) {
                 const authToken = jwt.sign({mail:admin.mail},jwtSecretKey);
                 res.json({success:true, authToken,useborId:admin._id });
                 console.log(authToken);
                
            }else{
                res.status(400).json({error:"incorrect password", success:false});

            }
            
        }else{
            res.status(400).json({error:"user not found0", success:false});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"an error occurred"});
        
    }
};

const findAllUsers = async (req, res) => {
    try {
      const user = await User.find();
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  };


  const addProduct =async (req,res)=>{
    try {
        const { prod_name ,price, description,image,catogery,brand,specify}=req.body;

        const product=new Product({prod_name:prod_name ,price:price, description:description,image: image,catogery:catogery,brand:brand,specify:specify});
        await product.save();
        res.json({message:"product added successfully"});
    } catch (error) {
        res.status(400).json({error:error.message});
        
    }
  };

  const updateProduct = async (req, res) => {
    try {
        const {id}=req.params;
        const { prod_name ,price, description,image,catogery,brand,specify}=req.body;
        const product =await Product.findByIdAndUpdate(
            id,
            { prod_name ,price, description,image,catogery,brand,specify},
            {new:true}
        );
        res.json(product)
    } catch (error) {
        res.status(400).json({error:error.message});
        
    }
  };

  const deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params
        await Product.findByIdAndDelete(id);
        res.json({message:"product deleted successfuly"});

    } catch (error) {
        res.status(400).json({error:error.message});
    }
  };

  const getAllProduct=async(req,res)=>{
    try {
        const product=await Product.find();
        res.json(product)
    } catch (err) {
        res.status(500).json({error:err.message})
        
    }
  };

  const deleteUser = async(req,res)=>{
    try {
        const {id} = req.params
        await User.findByIdAndDelete(id);
        res.json({message:"user deleted successfuly"});

    } catch (error) {
        res.status(400).json({error:error.message});
    }
  };
 

module.exports={
    admin,
    loginAdmin,
    findAllUsers,
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    deleteUser,
}

