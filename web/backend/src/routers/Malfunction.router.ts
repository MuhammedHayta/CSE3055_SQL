import express from "express";
import MalfunctionController from "../controllers/Malfunction.controller.js";
const router = express.Router();

router.get("/", MalfunctionController.getAllMalfunctions);
router.post("/", MalfunctionController.addMalfunction);
router.put("/", MalfunctionController.updateMalfunction);
router.delete("/", MalfunctionController.deleteMalfunction);

export default router;
