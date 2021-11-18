const express = require("express");
const router = express.Router();
const  ctrlProduct = require("../controllers/products");
const  ctrlBuyers = require("../controllers/buyers");
const  ctrlBikers = require("../controllers/bikers");
const  ctrlAdmin= require("../controllers/admin");
const  ctrlCategory= require("../controllers/categories");
const  ctrlCompany= require("../controllers/companies");
const  verifyAccount= require("../controllers/verifyAccount");
const  userLogin= require("../controllers/login")
const  auth=require("../controllers/auth")


//Clients
router.post("/register-buyer",ctrlBuyers.register)


//BIKERS
router.post("/register-biker",ctrlBikers.register);

//Administration
router.post("/register-admin",ctrlAdmin.register);

//Products
router.post("/product/:idCompany",ctrlProduct.register);

//Category
router.post("/category",ctrlCategory.register);

//Company
router.post("/company/:idCategory",ctrlCompany.register);

//OTHERS
router.get("/verifyaccount/:token", verifyAccount.verify);
router.get("/auth",auth.verifyToken);
router.post("/login",userLogin.login)

module.exports=router;