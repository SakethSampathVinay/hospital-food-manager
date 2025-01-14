import React, { useContext, useState, useEffect } from "react";
import { AdminContext } from "../../context/context";

const DietChart = () => {
  const { dietChart, setDietChart, getAllDietCharts } =
    useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllDietCharts();
      } catch (error) {
        setError("Failed to fetch diet charts.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="spinner"></div> {/* Custom spinner */}
        <p>Loading Diet Charts...</p>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">Diet Charts for Patients</p>

      {/* Container with both horizontal and vertical overflow */}
      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-auto">
        {/* Define custom column widths to avoid excess space */}
        <div className="grid grid-cols-[0.1fr_1fr_1fr_1fr_1fr_1fr_1fr] py-3 px-6 border-b">
          <p className="font-semibold">#</p>
          <p className="font-semibold">Name</p>
          <p className="font-semibold">Morning Meal</p>
          <p className="font-semibold">Afternoon Meal</p>
          <p className="font-semibold">Evening Meal</p>
          <p className="font-semibold">Night Meal</p>
          <p className="font-semibold">Special Instructions</p>
        </div>

        {dietChart.length > 0 ? (
          dietChart.map((dietChart, index) => (
            <div
              key={dietChart._id}
              className="grid grid-cols-[0.1fr_1fr_1fr_1fr_1fr_1fr_1fr] py-3 px-6 border-b hover:bg-gray-50"
            >
              <p>{index + 1}</p>
              <p>{dietChart.patientId?.name}</p>
              <p>{dietChart.morningMeal}</p>
              <p>{dietChart.afternoonMeal}</p>
              <p>{dietChart.eveningMeal}</p>
              <p>{dietChart.nightMeal}</p>
              <p>{dietChart.specialInstructions}</p>
            </div>
          ))
        ) : (
          <p className="text-center py-5">No Diet Charts available.</p>
        )}
      </div>
    </div>
  );
};

export default DietChart;
