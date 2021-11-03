const express = require("express");
const router = express.Router();
const  ctrlProduct = require("../controllers/products");


//Clients


//BIKERS


//Administration
router.post("/new-product",ctrlProduct.register);



//OTHERS

module.exports=router;