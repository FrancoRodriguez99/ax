const express = require("express");
const { signIn, singUp, googleLogIn, address, addressadd, changeAddres, deleteAddress, editUser, getProfile } = require("../controllers/users.controllers");

const router = express.Router();

router.post("/signIn", signIn);
router.post("/singUp", singUp);
router.post("/googleLogIn", googleLogIn);
router.get("/address/:id", address);
router.post("/address/:id", addressadd);
router.post("/changeAddres/:id", changeAddres);
router.delete("/deleteAddress/:id", deleteAddress);
router.post("/editUser/:id", editUser);
router.get("/getProfile/:id", getProfile);

module.exports = router;
