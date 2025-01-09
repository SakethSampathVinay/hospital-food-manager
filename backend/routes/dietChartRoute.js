import express from "express";
import {
  getDietCharts,
  addDietChart,
  updateDietChart,
  deleteDietChart
} from "../controllers/dietChartController.js";

const dietChartRouter = express.Router();

dietChartRouter.get("/diet-charts", getDietCharts);
dietChartRouter.post("/add-diet-chart", addDietChart);
dietChartRouter.put("/diet-charts/:id", updateDietChart);
dietChartRouter.delete("/diet-charts/:id", deleteDietChart);

export default dietChartRouter;
