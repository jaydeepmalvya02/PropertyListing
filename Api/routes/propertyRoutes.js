const express=require('express')
const { addProperty, allProperties } = require('../controllers/propertyController')

const router=express.Router()

router.post('/add',addProperty)
router.get('/all',allProperties)

module.exports=router