import express from "express";
import {
  loginPantryStaff,
  getPantryStaff,
  addPantryStaff,
  updatePantryStaff,
  deletePantryStaff,
} from "../controllers/pantryStaffController.js";
import authHospitalPantry from "../middleaware/HospitalPantryAuth.js";

const pantryStaffRouter = express.Router();

pantryStaffRouter.get("/pantry-staff", authHospitalPantry, getPantryStaff);
pantryStaffRouter.post("/add-pantry-staff", authHospitalPantry, addPantryStaff);
pantryStaffRouter.put(
  "/pantry-staff/:id",
  authHospitalPantry,
  updatePantryStaff
);
pantryStaffRouter.delete(
  "/pantry-staff/:id",
  authHospitalPantry,
  deletePantryStaff
);
pantryStaffRouter.post("/login", loginPantryStaff);

export default pantryStaffRouter;
