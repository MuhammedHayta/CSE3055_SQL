import express from "express";
import StaffController from "../controllers/Staff.controller.js";
const router = express.Router();

router.get("/", StaffController.getAllStaffs);

export default router;