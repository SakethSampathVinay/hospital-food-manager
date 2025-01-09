import express from "express";
import Patient from "../models/Patients.js";

// GET all patients
const getPatients = async (request, response) => {
  try {
    const patients = await Patient.find();
    return response.json({
      success: true,
      patients: patients,
      message: "Getting Patients Successfully",
    });
  } catch (error) {
    console.log(error);
    return response.json({ success: false, message: "Not getting Get Patients" });
  }
};

// Add a new patient
const addPatient = async (request, response) => {
  try {
    const patient = request.body;
    const newPatient = new Patient(patient);
    await newPatient.save();
    return response
      .status(200)
      .json({ success: true, message: "Patient added Successfully" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ success: false, message: "Patient not added" });
  }
};

// Update a Patient by ID
const updatePatient = async (request, response) => {
    try {
        const { id } = request.params;
        const updatedData = request.body;

        const updatedPatient = await Patient.findByIdAndUpdate(id, updatedData, {new: true});

        if(!updatePatient) {
            return response.status(400).json({success: false, message: "Patient not updated"});
        }

        return response.status(200).json({success: true, message: "Patient updated Successfully", patient: updatedPatient});

    } catch(error) {
        console.log(error);
        return response.status(500).json({success: false, message: "Patient not updated"});
    }
}

// DELETE a patient by ID
const deletePatient = async (request, response) => {
  try {
    const { id } = request.params;
    await Patient.findByIdAndDelete(id);
    response
      .status(200)
      .json({ success: true, message: "Patient Deleted Succesfully" });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, message: "Patient not Deleted" });
  }
};

export { getPatients, addPatient, updatePatient, deletePatient };