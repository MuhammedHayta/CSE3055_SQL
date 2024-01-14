import express from "express";
import WorkDayController from "../controllers/WorkDay.controller.js";
const router = express.Router();

router.get("/", WorkDayController.getAllWorkDays);
router.post("/", WorkDayController.addWorkDay);
router.put("/", WorkDayController.updateWorkDay);
router.delete("/", WorkDayController.deleteWorkDay);

export default router;