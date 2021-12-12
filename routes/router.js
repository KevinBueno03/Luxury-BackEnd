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
router.put("/buyers/buyer/:idBuyer",ctrlBuyers.update);
router.get("/buyers/buyer/:token",ctrlBuyers.findOneByToken);

//BIKERS
router.post("/register-biker",ctrlBikers.register);
router.get("/bikers/biker/:token",ctrlBikers.findOneByToken);
router.get("/bikers",ctrlBikers.findAll);
router.put("/bikers/biker/update/:idBiker",ctrlBikers.update);
router.get("/bikers/active-accepted",ctrlBikers.findAllActiveAndAccepted);
router.get("/bikers/active",ctrlBikers.findAllActive);

//Category
router.post("/category",ctrlCategory.register);
router.get("/categories",ctrlCategory.getCategories);//obtener todas las categorias
router.get("/category/:idCategory/companies",ctrlCategory.getCompanies);
router.get("/category/:idCategory/companies-products",ctrlCategory.getCompaniesAndProducts);
router.put("/category/:idCategory",ctrlCategory.update);

//Company
router.post("/company/category/:idCategory",ctrlCompany.register);
router.get("/company/:idCompany/products",ctrlCompany.getProducts);
router.get("/companies/company/:idCompany",ctrlCompany.findOneById);
router.put("/company/:idCompany",ctrlCompany.update);
//Products
router.post("/product/company/:idCompany",ctrlProduct.register);
router.put("/product/:idProduct",ctrlProduct.update);
router.delete("/product/:idProduct/company/:idCompany",ctrlProduct.delete);

//orders
router.post("/orders/order/buyer/:idBuyer",ctrlOrder.register);
router.post("/orders/order/:idOrder/product-add",ctrlOrder.addProduct2Order);
router.post("/orders/order/:idOrder/product-subtract",ctrlOrder.subtractProduct2Order);
router.post("/orders/order/:idOrder/product-remove",ctrlOrder.removeProduct2Order);
router.put("/orders/order/:idOrder",ctrlOrder.update);
router.get("/orders/buyer/:idBuyer",ctrlOrder.findAllOrdersBuyer);
router.get("/orders/biker/:idBiker",ctrlOrder.findAllOrdersBiker);
router.get("/orders",ctrlOrder.getAllOrder);
router.get("/orders/order/:idOrder",ctrlOrder.getOrderById);
router.get("/orders/paid",ctrlOrder.getAllOrdersPaid);
router.get("/orders/not-paid",ctrlOrder.getOrdersNotPaid);
router.get("/orders/entregadas/:idBiker",ctrlOrder.findAllOrdersEntregadas);
router.get("/orders/not-paid-not-taked",ctrlOrder.getAllOrdersPaidAndNotTaked);
router.get("/orders/order/not-paid/buyer/:idBuyer",ctrlOrder.getOrderNotPaidBuyer);
router.get("/orders/paid/buyer/:idBuyer",ctrlOrder.getOrdersPaidBuyer);


//OTHERS
router.get("/verifyaccount/:token", verifyAccount.verify);
router.get("/auth",auth.verifyToken);
router.post("/login",userLogin.login)

module.exports=router;