import Delivery from "../models/Delivery.js";

// GET all deliveries
const getDeliveries = async (request, response) => {
  try {
    const deliveries = await Delivery.find().populate("mealBoxId deliveryStaffId");
    return response.json({
      success: true,
      deliveries,
      message: "Deliveries fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      message: "Error fetching Deliveries",
    });
  }
};

// Add a new delivery
const addDelivery = async (request, response) => {
  try {
    const { mealBoxId, deliveryStaffId, status, deliveryNotes } = request.body;

    const newDelivery = new Delivery({
      mealBoxId,
      deliveryStaffId,
      status,
      deliveryNotes,
    });

    await newDelivery.save();

    return response.status(200).json({
      success: true,
      message: "Delivery added successfully",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      message: "Failed to add Delivery",
    });
  }
};

// Update delivery by ID
const updateDelivery = async (request, response) => {
  try {
    const { id } = request.params;
    const updatedData = request.body;

    const updatedDelivery = await Delivery.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedDelivery) {
      return response.status(400).json({ success: false, message: "Delivery not updated" });
    }

    return response.status(200).json({ success: true, message: "Delivery updated successfully", delivery: updatedDelivery });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ success: false, message: "Error updating Delivery" });
  }
};

// Delete delivery by ID
const deleteDelivery = async (request, response) => {
  try {
    const { id } = request.params;
    await Delivery.findByIdAndDelete(id);

    return response.status(200).json({ success: true, message: "Delivery deleted successfully" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ success: false, message: "Error deleting Delivery" });
  }
};

export { getDeliveries, addDelivery, updateDelivery, deleteDelivery };
