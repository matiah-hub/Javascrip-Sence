const express = require("express");
const controller = require("../controllers/mascotas.controller");

const router = express.Router();

router.get("/", controller.getMascotas);
router.post("/", controller.createMascota);
router.delete("/", controller.deleteMascota);

module.exports = router;