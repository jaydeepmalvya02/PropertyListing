const express=require('express')
const app=express()
const cors=require('cors')
const {connectDB} =require('./config/db')
require('dotenv').config()
app.use(express.json())
const port=5000 || process.env.PORT
const propertyRouter=require('./routes/propertyRoutes')
const fileUploader=require('./config/cloudinary')
// config
app.use(cors())
connectDB()
// use Apis
app.use('/api/property',propertyRouter)
// Test APi
app.get('/',(req,res)=>{
    res.send("Api is working")
})
app.use("/api/upload",fileUploader)
app.listen(port,()=>{
  console.log(`server is running on http://localhost:${port}`)
})

