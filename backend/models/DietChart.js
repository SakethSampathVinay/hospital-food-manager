import mongoose from "mongoose";

const DietChartSchema = new mongoose.Schema({
    patientId: {type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true},
    morningMeal: {type: String, required: true},
    afternoonMeal: {type: String, required: true},
    eveningMeal: {type: String, required: true},
    nightMeal: {type: String, required: true},
    specialInstructions: {type: String},
    preparationStatus: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending",
    }
})

const DietChart = mongoose.model("DietChart", DietChartSchema);
export default DietChart