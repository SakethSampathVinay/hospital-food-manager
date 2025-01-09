import mongoose from "mongoose";

const DeliverySchema = new mongoose.Schema({
  mealBoxId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DietChart",
    required: true,
  },
  deliveryStaffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PantryStaff",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Delivered"],
    default: "Pending",
  },
  deliveryNotes: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const Delivery = mongoose.model("Delivery", DeliverySchema);
export default Delivery;
