import express from "express";
import StaffMovementController from "../controllers/StaffMovement.controller.js";
const router = express.Router();

router.get("/", StaffMovementController.getAllStaffMovements);
router.post("/", StaffMovementController.addStaffMovement);

export default router;