import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/context";

// Add your image assets
const assets = {
  diet_chart:
    "https://static.vecteezy.com/system/resources/previews/023/518/126/non_2x/balanced-diet-chart-healthy-food-with-vitamins-vector.jpg", // Replace with the actual path
  delivery_icon:
    "https://icon-library.com/images/delivery-icon/delivery-icon-10.jpg", // Replace with the actual path
  patients_icon:
    "https://cdn.icon-icons.com/icons2/2265/PNG/512/crowd_patient_patients_icon_140420.png", // Replace with the actual path
};

const Dashboard = () => {
  const { getDashData, dashData } = useContext(AdminContext);

  // Fetch dashboard data when the component mounts
  useEffect(() => {
    getDashData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center space-y-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Hospital Food Manager Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 hover:shadow-2xl transition-all transform">
          <img
            className="w-14 h-14 object-contain"
            src={assets.patients_icon}
            alt="Doctor Icon"
          />
          <div>
            <p className="text-2xl font-semibold text-gray-700">
              {dashData.patients}
            </p>
            <p className="text-sm text-gray-400">Patients</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 hover:shadow-2xl transition-all transform">
          <img
            className="w-14 h-14 object-contain"
            src={assets.diet_chart}
            alt="Appointments Icon"
          />
          <div>
            <p className="text-2xl font-semibold text-gray-700">
              {dashData.dietChart}
            </p>
            <p className="text-sm text-gray-400">Diet Charts</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 hover:shadow-2xl transition-all transform">
          <img
            className="w-14 h-14 object-contain"
            src={assets.delivery_icon}
            alt="Patients Icon"
          />
          <div>
            <p className="text-2xl font-semibold text-gray-700">
              {dashData.delivery}
            </p>
            <p className="text-sm text-gray-400">Deliveryies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
