const express = require("express");
const users = require("./users");
const products = require("./products");
const mensajeria = require("./mensajeria");
const mercadopago = require("./mercadopago");

const router = express.Router();

router.use("/users", users);
router.use("/products", products);
router.use("/mensajeria", mensajeria);
router.use("/mercadopago", mercadopago);

module.exports = router;
