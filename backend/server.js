const express=require('express')
const cors=require ('cors')
const connectDB=require('./config/db')
const userRoutes=require('./routes/userRoutes')
// const productRoutes=require('./routes/userRoutes')

const app=express();
const PORT=process.env.PORT || 5000

app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,HEAD,PUT,PATCH,DELETE",
    credentials:true
}))

connectDB();

app.use('/api/user',userRoutes);
// app.use('/api/admin',productRoutes)

app.listen(PORT,()=>{
    console.log(`server is running on port${PORT}`);
});