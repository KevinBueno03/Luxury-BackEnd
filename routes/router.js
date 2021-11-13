const express = require("express");
const router = express.Router();
const ctrlProduct = require("../controllers/products");
const ctrlCompanies = require("../controllers/Companies");
const ctrlCategories = require("../controllers/Categories");
const ctrlBiker = require("../controllers/bikers");


//Clients


//BIKERS
router.post("/biker", ctrlBiker.register);


//Administration
router.post("/product", ctrlProduct.register);
router.post("/company", ctrlCompanies.register);
router.post("/category", ctrlCategories.register);


//OTHERS

module.exports = router;