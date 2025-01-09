import DietChart from "../models/DietChart.js";

// GET all diet charts
const getDietCharts = async (request, response) => {
  {
    try {
      const dietCharts = await DietChart.find().populate(
        "patientId",
        "name age"
      );
      return response
        .status(200)
        .json({ message: "All Diet Charts", dietCharts });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Not Getting Diet Charts" });
    }
  }
};

// Add a new diet chart
const addDietChart = async (request, response) => {
  try {
    const {
      patientId,
      morningMeal,
      afternoonMeal,
      eveningMeal,
      nightMeal,
      specialInstructions,
    } = request.body;
    const newDietChart = new DietChart({
      patientId,
      morningMeal,
      afternoonMeal,
      eveningMeal,
      nightMeal,
      specialInstructions,
    });

    await newDietChart.save();
    return response
      .status(200)
      .json({ message: "Diet Chart Added Successfully", newDietChart });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "Not Adding Diet Chart" });
  }
};

// Update a Diet chart by ID
const updateDietChart = async (request, response) => {
  try {
    const { id } = request.params;
    const updateDiet = request.body;

    const updatedDietChart = await DietChart.findByIdAndUpdate(id, updateDiet, {
      new: true,
    });

    if (!updatedDietChart) {
      return response.status(404).json({ message: "Diet Chart Not Found" });
    }

    return response
      .status(200)
      .json({ message: "Diet Chart Updated Successfully", updatedDietChart });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "Not Updating Diet Chart" });
  }
};

// Delete a diet chart by ID
const deleteDietChart = async(request, response) => {
    try {
        const { id } = request.params;
        await DietChart.findByIdAndDelete(id);

        return response.status(200).json({message: "Diet Chart Deleted Successfully"});
    } catch(error){
        console.log(error);
        return response.status(500).json({message: "Not Deleting Diet Chart"});
    }
}

export { getDietCharts, addDietChart, updateDietChart, deleteDietChart };