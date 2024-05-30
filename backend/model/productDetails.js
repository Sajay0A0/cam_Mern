const mongoose =require("mongoose");
const productScheema=new mongoose.Schema({
    prod_name:String,
    description:String,
    image:String,
    catogery:String,
    brand:String,
    specify:String,
    price:Number,

});

const Product= mongoose.model('products',productScheema);
module.exports=Product;