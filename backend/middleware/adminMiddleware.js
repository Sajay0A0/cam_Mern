const jwtSecretKey="admin123";
const jwt= require ('jsonwebtoken');

const adminMiddleware=async(req,res,next)=>{
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status (401).json({success:false,message:'unauthorized'})

    }
    try {
        const token=authToken.split(' ')[1];
        const decoded =jwt.verify(token,jwtSecretKey);
        req.user = jwt.decode.user
        next();
    } catch (error) {
        console.error(err);
        res.status (401).json({success:false, message:'invalid token'});
    }
};

module.exports=adminMiddleware