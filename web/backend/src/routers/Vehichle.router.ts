import express from "express";
import VehicleController from "../controllers/Vehichle.controller.js";
const router = express.Router();

router.get("/", VehicleController.getAllVehicles);

export default router;
