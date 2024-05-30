
const addToCart = async (req, res) => {
    try {
        const { id, userID, name, price, image, qty,size } = req.body;
        // console.log("userid", userID);
        const user = await User.findOne({ _id: userID });
        // console.log("user", user);
        const existingItem = user.cart.find(item => item.id === id && item.size === size);

        if (existingItem) {
            return res.status(400).json({ message: "already added" });
            // existingItem.qty += qty
        } else {
            user.cart.push({
                id,
                name,
                price,
                image,
                qty,
                size
            });
            await user.save();
            res.status(200).json({ message: "successfully added to cart", user });
        }
    } catch (error) {
        res.status(400).json({ message: "unable to add", error });
    }
};


const increeementQty = async (req,res) => {
    try{
        const {userID,cart} = req.body
        const {id} = req.params
      
        // console.log("first",userID,id)
        // console.log("cart",cart)
       const updatedCart =  cart.map(data => {
        if(data.id === id){
        data.qty
    }
    return data
})
             
    // console.log("Updated Cart",updatedCart)
        // console.log("Quantity",ItemQty)
        await User.findByIdAndUpdate(userID,{cart:updatedCart})
        
        res.send({success:"true"})
    }
    catch (err) {
        console.log(err)
    }
}

const removeCart = async (req, res) => {
    try {
        const { userID,size } = req.body;
        const { id } = req.params;
        // console.log("userid", userID);
        const user = await User.findOne({ _id: userID });
        // console.log("user", user);
        const existingItem = user.cart.find(item => item.id === id && item.size === size);
        // Find the user by ID and pull the product with the given ID from the cart array

        if(existingItem){

        }
        const users = await User.findByIdAndUpdate(
            userID,
            {
                $pull: {
                    cart: { id,size } // Remove the product with the given ID from the cart array
                }
            },
            {
                new: true // Return the updated user object
            }
        );

        // Check if the user exists and return the updated user object
        if (users) {
            res.status(200).json({ message: "Product successfully removed from cart", user });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        // Handle any errors that occur during the removal process
        console.error(error);
        res.status(400).json({ message: "Unable to remove product from cart", error });
    }
};



const getCart = async (req, res) => {
    const userID = req.body.UserId
    try {
        const getCart = await User.findOne({ _id: userID })
        // console.log(getCart)
        res.json(getCart)
    }
    catch (err) {
        console.log(err)
    }
}
