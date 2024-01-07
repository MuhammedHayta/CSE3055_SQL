import express from "express";
import MachineController from "../controllers/Machine.controller.js";
const router = express.Router();

router.get("/", MachineController.getAllMachines);

export default router;