import express from "express";
import {
  getDeliveries,
  addDelivery,
  updateDelivery,
  deleteDelivery
} from "../controllers/deliveryController.js";

const deliveryRouter = express.Router();

deliveryRouter.get("/deliveries", getDeliveries);
deliveryRouter.post("/add-delivery", addDelivery);
deliveryRouter.put("/deliveries/:id", updateDelivery);
deliveryRouter.delete("/deliveries/:id", deleteDelivery);

export default deliveryRouter;
