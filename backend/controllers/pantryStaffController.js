import express from "express";
import PantryStaff from "../models/PantryStaff.js";
import jwt from "jsonwebtoken"

// API for loginPantryStaff
export const loginPantryStaff = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (
      email === process.env.HOSPITAL_PANTRY &&
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

// GET all Pantry Staff
export const getPantryStaff = async (request, response) => {
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

// Add a new Pantry Staff
export const addPantryStaff = async (request, response) => {
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

// Update a Pantry Staff by ID
export const updatePantryStaff = async (request, response) => {
  try {
    const { id } = request.params;
    const updatedData = request.body;

    const updatedStaff = await PantryStaff.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedStaff) {
      return response
        .status(400)
        .json({ success: false, message: "Pantry Staff not updated" });
    }

    return response.status(200).json({
      success: true,
      message: "Pantry Staff updated successfully",
      pantryStaff: updatedStaff,
    });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ success: false, message: "Not Updating Pantry Staff" });
  }
};

// Delete a Pantry Staff by ID
export const deletePantryStaff = async (request, response) => {
  try {
    const { id } = request.params;
    await PantryStaff.findByIdAndDelete(id);

    return response
      .status(200)
      .json({ success: true, message: "Pantry Staff deleted successfully" });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ success: false, message: "Error deleting Pantry Staff" });
  }
};