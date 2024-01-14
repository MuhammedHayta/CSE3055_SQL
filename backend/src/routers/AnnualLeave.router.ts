import express from "express";
import AnnualLeaveController from "../controllers/AnnualLeave.controller.js";
const router = express.Router();

router.get("/", AnnualLeaveController.getAllAnnualLeaves);
router.post("/", AnnualLeaveController.addAnnualLeave);
router.put("/", AnnualLeaveController.updateAnnualLeave);
router.delete("/", AnnualLeaveController.deleteAnnualLeave);

export default router;
