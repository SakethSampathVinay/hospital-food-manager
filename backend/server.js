import express from "express"
import cors from "cors"
import connectToDB from "./config/database.js";
import patientRouter from "./routes/patientRoute.js";
import dietChartRouter from "./routes/dietChartRoute.js";
import deliveryRouter from "./routes/deliveryRoute.js";
import pantryStaffRouter from "./routes/pantryStaffRoute.js";

const app = express();
const port = 4000

app.use(cors())
app.use(express.json())

connectToDB();

app.use("/api", patientRouter)
app.use("/api/diet-charts", dietChartRouter)
app.use("/api/deliveries", deliveryRouter);
app.use("/api/pantry-staff", pantryStaffRouter);

app.get("/", (request, response) => {
    console.log("API is working fine");
    response.json("API is Working Fine")
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
});