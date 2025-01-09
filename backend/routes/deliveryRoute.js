import express from "express";
import {
  getDeliveries,
  addDelivery,
  updateDelivery,
  deleteDelivery,
  loginDelivery,
} from "../controllers/deliveryController.js";
import authHospitalDelivery from "../middleaware/HospitalDeliveryAuth.js";

const deliveryRouter = express.Router();

deliveryRouter.get("/deliveries", authHospitalDelivery, getDeliveries);
deliveryRouter.post("/add-delivery", authHospitalDelivery, addDelivery);
deliveryRouter.put("/deliveries/:id", authHospitalDelivery, updateDelivery);
deliveryRouter.delete("/deliveries/:id", authHospitalDelivery, deleteDelivery);
deliveryRouter.post("/login", loginDelivery);

export default deliveryRouter;
