import express from "express";
import {
  getDietCharts,
  addDietChart,
  updateDietChart,
  deleteDietChart,
} from "../controllers/dietChartController.js";
import authHospitalManager from "../middleaware/HospitalManagerAuth.js";

const dietChartRouter = express.Router();

dietChartRouter.get("/diet-charts", authHospitalManager, getDietCharts);
dietChartRouter.post("/add-diet-chart", authHospitalManager, addDietChart);
dietChartRouter.put("/diet-charts/:id", authHospitalManager, updateDietChart);
dietChartRouter.delete(
  "/diet-charts/:id",
  authHospitalManager,
  deleteDietChart
);

export default dietChartRouter;
