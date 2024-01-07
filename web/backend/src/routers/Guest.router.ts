import express from "express";
import GuestController from "../controllers/Guest.controller.js";
const router = express.Router();

router.get("/", GuestController.getAllGuests);

export default router;
