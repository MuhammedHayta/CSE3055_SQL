import express from "express";
import ParkingSlotController from "../controllers/ParkingSlot.controller.js";
const router = express.Router();

router.get("/", ParkingSlotController.getAllParkingSlots);

export default router;
