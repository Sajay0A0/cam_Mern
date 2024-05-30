const mongoose=require('mongoose')
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:false
    },
    mail:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cart:{
        type:Array,
        required:true
    },
    like:{
        type:Array,
        required:true
    },
    address:{
        type:Array,
        required:true
    },
    placed:{
        type:Array,
        required:true
    }
    
});

const User=mongoose.model('samples',userSchema);

module.exports=User;