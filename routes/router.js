const express = require("express");
const router = express.Router();
const ctrlProduct = require("../controllers/products");
const ctrlCompanies = require("../controllers/Companies");
const ctrlCategories = require("../controllers/Categories");


//Clients


//BIKERS


//Administration
router.post("/product", ctrlProduct.register);
router.post("/company", ctrlCompanies.register);
router.post("/category", ctrlCategories.register);


//OTHERS

module.exports = router;