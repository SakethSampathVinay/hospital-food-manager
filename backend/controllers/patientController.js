import express from "express";
import Patient from "../models/Patients.js";
import jwt from "jsonwebtoken";
import Delivery from "../models/Delivery.js";
import DietChart from "../models/DietChart.js";
import PantryStaff from "../models/PantryStaff.js";

// API for loginPatient
const loginPatient = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (
      email === process.env.HOSPITAL_MANAGER &&
      password === process.env.PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      console.log(token);
      return response.json({
        success: true,
        message: "Logged Successfully",
        token,
      });
    } else {
      return response.json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
  } catch (error) {
    console.log(error);
    return response.json({ success: false, message: "Error Occured" });
  }
};

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
    return response.json({
      success: false,
      message: "Not getting Get Patients",
    });
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
    return response
      .status(500)
      .json({ success: false, message: "Patient not added" });
  }
};

// Update a Patient by ID
const updatePatient = async (request, response) => {
  try {
    const { id } = request.params;
    const updatedData = request.body;

    const updatedPatient = await Patient.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatePatient) {
      return response
        .status(400)
        .json({ success: false, message: "Patient not updated" });
    }

    return response.status(200).json({
      success: true,
      message: "Patient updated Successfully",
      patient: updatedPatient,
    });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ success: false, message: "Patient not updated" });
  }
};

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

//API to get Dashboard Data for Admin Panel
const adminDashboard = async (request, response) => {
  try {
    const patients = await Patient.find({});
    const delivery = await Delivery.find({});
    const dietChart = await DietChart.find({});

    const dashData = {
      patients: patients.length,
      dietChart: dietChart.length,
      delivery: delivery.length,
    };

    response.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error.message });
  }
};

// GET all deliveries
const getDeliveries = async (request, response) => {
  try {
    const deliveries = await Delivery.find().populate(
      "mealBoxId deliveryStaffId"
    );
    return response.json({
      success: true,
      deliveries,
      message: "Deliveries fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      message: "Error fetching Deliveries",
    });
  }
};

// GET all Pantry Staff
const getPantryStaff = async (request, response) => {
  try {
    const pantryStaff = await PantryStaff.find();
    return response
      .status(200)
      .json({ message: "All Pantry Staff", pantryStaff });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "Not Getting Pantry Staff" });
  }
};

const addDietChart = async (request, response) => {
  try {
    const {
      patientId,
      morningMeal,
      afternoonMeal,
      eveningMeal,
      nightMeal,
      specialInstructions,
    } = request.body;

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return response.status(404).json({ message: "Patient not found" });
    }

    // Create a new diet chart
    const newDietChart = new DietChart({
      patientId,
      morningMeal,
      afternoonMeal,
      eveningMeal,
      nightMeal,
      specialInstructions,
    });

    // Save the new diet chart to the database
    await newDietChart.save();

    // Populate the patient name in the response
    const dietChartWithPatient = await DietChart.findById(
      newDietChart._id
    ).populate("patientId", "name");

    return response.status(200).json({
      message: "Diet Chart Added Successfully",
      newDietChart: {
        patientName: dietChartWithPatient.patientId.name,
        morningMeal,
        afternoonMeal,
        eveningMeal,
        nightMeal,
        specialInstructions,
      },
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Not Adding Diet Chart" });
  }
};

// Add a new Pantry Staff
const addPantryStaff = async (request, response) => {
  try {
    const { name, contactInfo, role } = request.body;
    const newPantryStaff = new PantryStaff({
      name,
      contactInfo,
      role,
    });
    await newPantryStaff.save();
    return response.status(200).json({
      success: true,
      message: "Pantry Staff Added Successfully",
      newPantryStaff,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "Not Adding Pantry Staff" });
  }
};

// POST API to assign pantry staff to a patient
const assignPantry = async (req, res) => {
  const { patientId, pantryStaffId } = req.body;

  // Validate input fields
  if (!patientId || !pantryStaffId) {
    return res.status(400).json({ message: "Please provide patientId and pantryStaffId." });
  }

  try {
    // Check if pantry staff exists
    const pantryStaff = await PantryStaff.findById(pantryStaffId);
    if (!pantryStaff) {
      return res.status(404).json({ message: "Pantry staff not found." });
    }

    // Check if the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    // Assign pantry staff to the patient
    patient.assignedTo = pantryStaffId;
    await patient.save();

    return res.status(200).json({ message: "Pantry staff assigned to patient successfully!", patient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error assigning pantry staff to patient." });
  }
};

export {
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
};
