const Property=require('../models/propertyModel')

const addProperty=async(req,res)=>{
  try {
    const newProperty=await Property(req.body)
    const data=await newProperty.save()
    res.status(201).json({success:true,data})
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false,message:error.message})
  }
}

const allProperties=async(req,res)=>{
  try {
    const properties=await Property.find({})
    res.status(200).json({success:true,data:properties})
  } catch (error) {
     console.error(error);
     res.status(500).json({ success: false, message: error.message });
  }
}

module.exports={addProperty,allProperties}

