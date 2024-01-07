import express from "express";
import StaffMovementController from "../controllers/StaffMovement.controller.js";
const router = express.Router();

router.get("/", StaffMovementController.getAllStaffMovements);

export default router;