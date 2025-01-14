import express from "express";
import {
  getMealsTask,
  updatePreparationStatus,
} from "../controllers/pantryStaffController.js";
import {
  getDietCharts,
  addDietChart,
  updateDietChart,
  deleteDietChart,
} from "../controllers/dietChartController.js";
import HospitalManager from "../middleaware/HospitalManagerAuth.js";

const dietChartRouter = express.Router();

// Get all diet charts
dietChartRouter.get("/diet-charts", HospitalManager, getDietCharts);

// Add a new diet chart
dietChartRouter.post("/add-diet-chart", HospitalManager, addDietChart);

// Update an existing diet chart
dietChartRouter.put("/diet-charts/:id", HospitalManager, updateDietChart);

// Delete a diet chart by ID
dietChartRouter.delete("/diet-charts/:id", HospitalManager, deleteDietChart);

// Get all meal preparation tasks
dietChartRouter.get("/meal-tasks", HospitalManager, getMealsTask);

// Update preparation status
dietChartRouter.put(
  "/meal-tasks/:id/status",
  HospitalManager,
  updatePreparationStatus
);

export default dietChartRouter;
