const mongoose =require ('mongoose')
const connectDB=async()=>{
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/Data`,{
            useNewUrlParser:true,

        })
        console.log('connectDB');
    } catch (error) {
        console.error(err);
        process.exit(1)
    }
}

module.exports=connectDB