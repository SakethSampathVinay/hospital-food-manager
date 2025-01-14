import express from "express";
import {
  getDeliveries,
  addDelivery,
  updateDelivery,
  deleteDelivery,
  loginDelivery,
  deliveryPersonnel,
  getDeliveryPersonnel,
  mealBoxDeliveryPersonnel,
  updateDeliveryStatus,
} from "../controllers/deliveryController.js";
import HospitalDelivery from "../middleaware/HospitalDeliveryAuth.js";

const deliveryRouter = express.Router();

// Delivery Personnel Login
deliveryRouter.post("/login", loginDelivery);

// Get all deliveries
deliveryRouter.get("/deliveries", HospitalDelivery, getDeliveries);

// Add a new delivery
deliveryRouter.post("/add-delivery", HospitalDelivery, addDelivery);

// Update a delivery by ID
deliveryRouter.put("/deliveries/:id", HospitalDelivery, updateDelivery);

// Delete a delivery by ID
deliveryRouter.delete("/deliveries/:id", HospitalDelivery, deleteDelivery);

// Add new delivery personnel
deliveryRouter.post("/add-personnel", HospitalDelivery, deliveryPersonnel);

// Get all delivery personnel
deliveryRouter.get("/personnel", HospitalDelivery, getDeliveryPersonnel);

// Assign a meal box to delivery personnel
deliveryRouter.post("/assign-meal", HospitalDelivery, mealBoxDeliveryPersonnel);

// Update delivery status
deliveryRouter.put(
  "/update-status/:id",
  HospitalDelivery,
  updateDeliveryStatus
);

export default deliveryRouter;
