const express = require("express");
const { contacto, getContacto } = require("../controllers/mensajeria.controllers");

const router = express.Router();

router.post("/contacto", contacto);
router.get("/getcontacto", getContacto);

module.exports = router;
