const express = require("express");
const router = express.Router();
const  ctrlProduct = require("../controllers/products");
const  ctrlBuyers = require("../controllers/buyers");
const  ctrlBikers = require("../controllers/bikers");
const  ctrlAdmin= require("../controllers/admin");
const  ctrlCategory= require("../controllers/categories");
const  ctrlCompany= require("../controllers/companies");
const  ctrlOrder= require("../controllers/orders");
const  verifyAccount= require("../controllers/verifyAccount");
const  userLogin= require("../controllers/login");
const  auth=require("../controllers/auth");

//Administration
router.post("/register-admin",ctrlAdmin.register);
//Clients
router.post("/register-buyer",ctrlBuyers.register);
router.put("/buyer/:idBuyer",ctrlBuyers.update);

//BIKERS
router.post("/register-biker",ctrlBikers.register);
router.get("/biker",ctrlBikers.findOneByToken);
router.put("/biker/:idBiker",ctrlBikers.update);
router.get("/biker/active-accepted",ctrlBikers.findAllActiveAndAccepted);
router.get("/biker/active",ctrlBikers.findAllActive);

//Category
router.post("/category",ctrlCategory.register);
router.get("/categories",ctrlCategory.getCategories);//obtener todas las categorias
router.get("/category/:idCategory/companies",ctrlCategory.getCompanies);
router.get("/category/:idCategory/companies-products",ctrlCategory.getCompaniesAndProducts);
router.put("/category/:idCategory",ctrlCategory.update);
//Company
router.post("/company/:idCategory",ctrlCompany.register);
router.get("/company/:idCompany/products",ctrlCompany.getProducts);
router.put("/company/:idCompany",ctrlCompany.update);
//Products
router.post("/product/:idCompany",ctrlProduct.register);
router.put("/product/:idProduct",ctrlProduct.register);
router.delete("/product/:idProduct/category/:idCompany",ctrlProduct.delete);

//orders
router.post("/order/:idBuyer",ctrlOrder.register);
router.post("/order/products/:idOrder",ctrlOrder.addProduct2Order);
router.put("/order/:idOrder",ctrlOrder.update);
router.get("/orders/buyer/:idBuyer",ctrlOrder.findAllOrdersBuyer);
router.get("/orders/biker/:idBiker",ctrlOrder.findAllOrdersBiker);


//OTHERS
router.get("/verifyaccount/:token", verifyAccount.verify);
router.get("/auth",auth.verifyToken);
router.post("/login",userLogin.login)

module.exports=router;