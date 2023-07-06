const express = require("express");
const { generateBill, checkOrder, generateBillEfectivo, payed } = require("../controllers/mercadopago.controllers");

const router = express.Router();

router.post("/generateBill", generateBill);
router.get("/getorder/:id", checkOrder);
router.post("/generateBillEfectivo", generateBillEfectivo);
router.post("/payed", payed);

module.exports = router;
