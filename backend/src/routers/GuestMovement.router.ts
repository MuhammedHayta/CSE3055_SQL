import express from "express";
import GuestMovementController from "../controllers/GuestMovement.controller.js";
const router = express.Router();

router.get("/", GuestMovementController.getAllGuestMovements);
router.post("/", GuestMovementController.addGuestMovement);

export default router;