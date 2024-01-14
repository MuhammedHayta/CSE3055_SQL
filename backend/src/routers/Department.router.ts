import express from "express";
import DepartmentController from "../controllers/Department.controller.js";
const router = express.Router();

router.get("/", DepartmentController.getAllDepartments);

export default router;
