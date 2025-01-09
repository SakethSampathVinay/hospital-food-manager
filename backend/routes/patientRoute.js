import express from "express";
import {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";

const patientRouter = express.Router();

patientRouter.get("/patients", getPatients);
patientRouter.post("/add-patients", addPatient);
patientRouter.put("/patients/:id", updatePatient);
patientRouter.delete("/patients/:id", deletePatient);

export default patientRouter;
