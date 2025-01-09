import express from "express";
import { getPantryStaff, addPantryStaff, updatePantryStaff, deletePantryStaff} from "../controllers/pantryStaffController.js";
const pantryStaffRouter = express.Router();

pantryStaffRouter.get("/pantry-staff", getPantryStaff);
pantryStaffRouter.post("/add-pantry-staff", addPantryStaff);
pantryStaffRouter.put("/pantry-staff/:id", updatePantryStaff);
pantryStaffRouter.delete("/pantry-staff/:id", deletePantryStaff);

export default pantryStaffRouter;
