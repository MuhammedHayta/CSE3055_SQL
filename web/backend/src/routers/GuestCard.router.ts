import express from "express";
import GuestCardController from "../controllers/GuestCard.controller.js";
const router = express.Router();

router.get("/", GuestCardController.getAllGuestCards);

export default router;