const express = require("express");
const router = express.Router();
const  ctrlProduct = require("../controllers/products");
const  ctrlBuyers = require("../controllers/buyers");
const  ctrlBikers = require("../controllers/bikers");
const ctrlAdmin= require("../controllers/admin");
const  verifyAccount= require("../controllers/verifyAccount")

//Clients
router.post("/register-buyer",ctrlBuyers.register)


//BIKERS
router.post("/register-biker",ctrlBikers.register);


//Administration
router.post("/register-admin",ctrlAdmin.register);

//Products
router.post("/product",ctrlProduct.register);


//OTHERS
router.get("/verifyaccount/:token", verifyAccount.verify);

module.exports=router;