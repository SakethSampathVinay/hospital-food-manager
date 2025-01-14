import express from "express";
import {
  loginPatient,
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
  adminDashboard,
  getDeliveries,
  getPantryStaff,
  addDietChart,
  addPantryStaff,
  assignPantry,
} from "../controllers/patientController.js";
import authHospitalManager from "../middleaware/HospitalManagerAuth.js";
import multer from "multer";

const upload = multer();

const patientRouter = express.Router();

patientRouter.get("/patients", authHospitalManager, getPatients);
patientRouter.post(
  "/add-patients",
  upload.none(),
  authHospitalManager,
  addPatient
);
patientRouter.put("/patients/:id", authHospitalManager, updatePatient);
patientRouter.delete("/patients/:id", authHospitalManager, deletePatient);
patientRouter.get("/dashboard-data", authHospitalManager, adminDashboard);
patientRouter.get("/get-deliveries", authHospitalManager, getDeliveries);
patientRouter.get("/get-pantryStaff", authHospitalManager, getPantryStaff);
patientRouter.post(
  "/add-diet-chart",
  upload.none(),
  authHospitalManager,
  addDietChart
);
patientRouter.post(
  "/add-pantry-staff",
  upload.none(),
  authHospitalManager,
  addPantryStaff
);
patientRouter.post("/assigned-pantry", assignPantry);
patientRouter.post("/login", loginPatient);

export default patientRouter;
