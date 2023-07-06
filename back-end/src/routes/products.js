const express = require("express");
const { addProduct, addBebibda, addExtra, getProducts, deleteProducts, getProduct, getBebidas } = require("../controllers/products.controllers");

const router = express.Router();

router.post("/addProduct", addProduct);
router.post("/addBebibda", addBebibda);
router.post("/addExtra", addExtra);
router.get("/getProducts", getProducts);
router.delete("/deleteProducts", deleteProducts);
router.get("/getProduct/:id", getProduct);
router.get("/getBebidas", getBebidas);

module.exports = router;
