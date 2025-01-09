import mongoose from "mongoose";

const PantryStaffSchema = new mongoose.Schema({
    name: {type: String, required: true},
    contactInfo: {type: String, required: true},
    role: {type: String, required: true},
})

const PantryStaff = mongoose.model("PantryStaff", PantryStaffSchema);
export default PantryStaff;
