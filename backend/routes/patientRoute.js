import express from "express";
import {
  loginPatient,
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";
import authHospitalManager from "../middleaware/HospitalManagerAuth.js";

const patientRouter = express.Router();

patientRouter.get("/patients", authHospitalManager, getPatients);
patientRouter.post("/add-patients", authHospitalManager, addPatient);
patientRouter.put("/patients/:id", authHospitalManager, updatePatient);
patientRouter.delete("/patients/:id", authHospitalManager, deletePatient);
patientRouter.post("/login", loginPatient);

export default patientRouter;
