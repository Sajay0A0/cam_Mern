const User = require("../model/userDetails");
const Product = require("../model/productDetails");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecretKey = "sajay123";

const createUser = async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    await User.create({
      name: req.body.name,
      location: req.body.location,
      mail: req.body.mail,
      password: hashedPassword,
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ mail: req.body.mail });

    if (user) {
      const comparePwd = await bcrypt.compare(req.body.password, user.password);

      if (comparePwd) {
        const authToken = jwt.sign({ mail: user.mail }, jwtSecretKey, {
          expiresIn: "1d",
        });
        res.json({ success: true, authToken, userId: user._id, user });
        console.log(authToken);
      } else {
        res.status(400).json({ error: "incorrect password", success: false });
      }
    } else {
      res.status(400).json({ error: "user not found", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "an error occurred" });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const addCart = async (req, res) => {
//   const { userEmail, productId, quantity } = req.body;
//   try {
//     const user = await User.findOne({ mail: userEmail });

//     if (!user) {
//       return res.status(404).json({ msg: "user not found" });
//     }
//     const Cartitems = await user.cart.find((item) => item.productId === productId);
//     if (Cartitems) {
//       res.status(400).json({ message: "already exists" });
//     } else {
//       user.cart.push({ productId, quantity });
//     }

//     await user.save();

//     res.status(200).send({ userCart: user.cart });
//   } catch (error) {
//     console.error(error);
//   }
// };

const addCart =async (req,res)=> {
  try {
    const {userEmail, productId, quantity,price}=req.body;
    const user =await User.findOne({ mail: userEmail});
    console.log("cart",req.body);
    if (!user){
      return res.status(404).json({msg:"user not found"});
    }
      const totalPrice =price *quantity;
    const Cartitems=user.cart.find(item=>item.productId===productId );
    if (Cartitems) {
      return res.status(409).json({message:"product already added"})
    }else{
      user.cart.push({
        productId,
        price:totalPrice,
        quantity
      });
      await user.save();
      res.status(200).json({message:"successfully added to cart"})
    }
  } catch (error) {
    res.status(400).json({ message: "unable to add cart", error });
    
  }
};

// const increementQty =async (req,res)=>{
//   try {
//     const {userEmail,cart}= req.body
//     const {productId}=req.params

//     const updateCart=cart.map(data =>{
//       if(data.productId===productId){
//         data.quantity
//       }
//       return data
//     })

//     await User.findByIdAndUpdate(userEmail,{cart:updateCart})
//     res.send ({success:"true"})
//   } catch (err) {
//     console.log(err);
    
//   }
// }

const removeCart=async(req,res)=>{
  try {
    const{userEmail}=req.body;
    const {productId}=req.params;

    const user =await User.findOne({mail: userEmail});
    const  Cartitems=user.cart.find(item=> item.productId===productId);
    if (Cartitems) {

    }
      const users=await User.findByIdAndUpdate(
        userEmail,
        {
          $pull:{
            cart:{productId}
          }
        },
        {
          new:true
        }
      );
      if(users){
            res.status(200).json({message:"Product successfully removed from cart", user});
      }else{
        res.status(404).json({message:"User not found"});
      }
      
    
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Unable to remove product from cart", error });
  }
};

// const getCart =async (req,res)=>{
//   const userEmail=req.body.UserEmail
//   try {
//     const getCart=await User.findOne({mail: userEmail})
//     res.json(getCart)
//   } catch (err) {
//     console.log(err);
    
//   }
// }

const getCart = async (req, res) => {
  const { userId, productId, userEmail } = req.body;
  try {
    const user = await User.findOne({ mail: userEmail });
    if (!user) {
      return res.status(404).send("user not found");
    }
    const cartItem = user.cart;
    res.status(202).send({ success: true, cartItem });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};




const updateCart = async (req, res) => {
  try {
    const { userEmail, productId, quantity } = req.body;
    const user = await User.findOne({ mail: userEmail });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const cartItem = user.cart.find((item) => item.productId === productId);

    if (!cartItem) {
      return res.status(404).json({ msg: "Cart item not found" });
    }
    const totalPrice = cartItem.price / cartItem.quantity * quantity;

    // Update the quantity of the cart item
    cartItem.quantity = quantity;
    cartItem.price = totalPrice;

    // Mark the 'cart' field as modified to ensure it gets saved to the database
    user.markModified('cart');

    // Save the updated user document
    await user.save();

    // Send response with updated user document
    res.status(200).json({ message: "Cart item quantity updated successfully", user });
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// const updateCart = async (req, res) => {
//   try {
//     const { userEmail, productId, quantity } = req.body;
//     const user = await User.findOne({ mail: userEmail });

//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     const cartItem = user.cart.find((item) => item.productId === productId);

//     if (!cartItem) {
//       return res.status(404).json({ msg: "Cart item not found" });
//     }

//     cartItem.quantity = quantity;
//     await user.save();
//     // console.log("quantity",quantity);
    
//     res.status(200).json({ message: "Cart item quantity updated successfully", user });
//   } catch (error) {
//     console.error("Error updating cart item quantity:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const deleteCartItem = async (req, res) => {
  const { userEmail, productId } = req.body;
  try {
    const user = await User.findOne({ mail: userEmail });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const index = user.cart.findIndex((item) => item.productId === productId);
    if (index === -1) {
      return res.json({ msg: "Cart item not found" });
    }

    user.cart.splice(index, 1);
    await user.save();
    res.status(200).json({ msg: "Cart item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addLike = async (req, res) => {
  const { userEmail, productId } = req.body;
  try {
    const user = await User.findOne({ mail: userEmail });

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    const Likeitems = await user.like.find((item) => item.productId === productId);
    if (Likeitems) {
      res.status(400).json({ message: "already exists" });
    } else {
      user.like.push({ productId });
    }

    await user.save();
    const userLike = user.like;
    res.status(200).send({ userLike });
  } catch (error) {
    console.error(error);
  }
};

const getLike = async (req, res) => {
  const {  userEmail } = req.body;
  try {
    const user = await User.findOne({ mail: userEmail });
    if (!user) {
      return res.status(404).send("user not found");
    }
    const likeItem = user.like;
    res.status(202).send({ success: true, likeItem });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

const addAddress = async (req, res) => {
  try {
    const {email,fullname, number, state, city, pin } = req.body;
    console.log(req.body);
    const user = await User.findOne({ mail: email });

    console.log("addd",user);
    
    if (!user) {
      return res.status(408).json({ msg: "User not found" });
    }

    const addressItem = user.address.find(item => item.mail === email);

    if (addressItem) {
      return res.status(409).json({ message: "Address already added" });
    } else {
      user.address.push({
        email,
        fullname,
        number,
        state,
        city,
        pin,
        
      });

      await user.save();
      res.status(200).json({ message: "Address successfully added" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Unable to add address", error });
  }
};

const getAddress =async (req,res)=>{
  const {email}=req.body;
  console.log("getA",req.body);
  try {
    const user=await User.findOne({mail:email});
    if(!user){
      return res.status(404).send("user not found");
    }
    const addressItem =user.address;
    res.status(202).send({success:true,addressItem});
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!")
  }
};


const deleteAddress=async(req,res)=>{
  const {email}=req.params;
  try {
    const user=await User.findOne({mail:email});
    if(!user){
      return res.status(408).json({msg:"user not found"});
    }
    const index=user.address.findIndex((item)=>item.email===email);
    if(index === -1){
      return res.json({ msg: "address not found" });
    }
    user.address.splice(index,1);
    await user.save();
    res.status(200).json({ msg: "address deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
    
  }
};
const updateAddress = async (req, res) => {
  try {
    const { email, fullname, number, state, city, pin } = req.body;

    console.log(req.body);

    // Find the user by email
    const user = await User.findOne({ mail: email });

    if (!user) {
      return res.status(408).json({ message: "User not found" });
    }

    // Find the address index to update
    const addressIndex = user.address.findIndex(
      (addr) => addr.email === email
    );

    if (addressIndex === -1) {
      return res.status(409).json({ message: "Address not found for the user" });
    }

    // Update the address
    user.address[addressIndex].email = email;
    user.address[addressIndex].fullname = fullname;
    user.address[addressIndex].number = number;
    user.address[addressIndex].state = state;
    user.address[addressIndex].city = city;
    user.address[addressIndex].pin = pin;
    

    // Mark the 'address' field as modified to ensure it gets saved to the database
    user.markModified('address');

    // Save the updated user document
    const updatedUser = await user.save();

    res.status(200).json({ message: "Address updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const prodSummery = async (req, res) => {
  try {
    const { userEmail, productId } = req.body;

    if (!userEmail || !productId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findOne({ mail: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const productExists = user.placed.some(item => item.productId === productId);

    if (productExists) {
      return res.status(409).json({ message: "Product already added" });
    }

    user.placed.push({
      productId,
    });

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Successfully added" });
  } catch (error) {
    console.error("Error adding product to placed orders:", error);
    res.status(500).json({ message: "Unable to add product to placed orders", error });
  }
};





module.exports={
  createUser,
  loginUser,
  getAllProduct,
  addCart,
  getCart,
  updateCart,
  deleteCartItem,
  addLike,
  getLike,
  removeCart,
  addAddress,
  getAddress,
  deleteAddress,
  updateAddress,
  prodSummery,
};
