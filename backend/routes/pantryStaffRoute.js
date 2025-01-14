import express from "express";
import {
  loginPantryStaff,
  getPantryStaff,
  addPantryStaff,
  updatePantryStaff,
  deletePantryStaff,
} from "../controllers/pantryStaffController.js";
import HospitalPantryAuth from "../middleaware/HospitalPantryAuth.js";

const pantryStaffRouter = express.Router();

// Pantry Staff Login
pantryStaffRouter.post("/login", loginPantryStaff);

// Get all pantry staff
pantryStaffRouter.get("/pantry-staff", HospitalPantryAuth, getPantryStaff);

// Add a new pantry staff member
pantryStaffRouter.post("/add-pantry-staff", HospitalPantryAuth, addPantryStaff);

// Update a pantry staff member by ID
pantryStaffRouter.put(
  "/pantry-staff/:id",
  HospitalPantryAuth,
  updatePantryStaff
);

// Delete a pantry staff member by ID
pantryStaffRouter.delete(
  "/pantry-staff/:id",
  HospitalPantryAuth,
  deletePantryStaff
);

export default pantryStaffRouter;
