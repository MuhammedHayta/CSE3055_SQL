import express from "express";
import GuestController from "../controllers/Guest.controller.js";
const router = express.Router();

router.get("/", GuestController.getAllGuests);
router.post("/", GuestController.addGuest);
router.put("/", GuestController.updateGuest);
router.delete("/", GuestController.deleteGuest);

export default router;
