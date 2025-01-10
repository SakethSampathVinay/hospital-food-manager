import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// Create the context
export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || null);
  const [patients, setPatients] = useState([]);
  const [dashData, setDashData] = useState({
    patients: 0,
    dietChart: 0,
    delivery: 0,
  });
  const [dietChart, setDietChart] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [pantry, setPantry] = useState([]);

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  // Fetch all patients
  const getAllPatients = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/patients`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });
      if (data.success) {
        setPatients(data.patients);
      } else {
        toast.error(data.message || "Failed to fetch patients.");
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  // Fetch dashboard data
  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/dashboard-data`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });

      if (data?.success) {
        setDashData(data.dashData); // Set the fetched dashboard data
      } else {
        console.log("Error Occurred on Admin getDashData");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getAllDietCharts = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/api/diet-charts/diet-charts`,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      // Check if 'dietCharts' exists in the response and handle it
      if (data.dietCharts && Array.isArray(data.dietCharts)) {
        setDietChart(data.dietCharts);
        console.log(data.dietCharts);
      } else {
        console.log(
          "Error Occurred on Admin getAllDietCharts Context:",
          data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.log("Error fetching diet charts:", error);
    }
  };

  const getDelivery = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/get-deliveries`, {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });
      if (data?.success) {
        setDelivery(data.deliveries);
        console.log(data.deliveries);
      } else {
        toast.error(data.message || "Failed to fetch patients.");
      }
    } catch (error) {
      console.log("Error fetching diet charts:", error);
    }
  };

  const getPantryDetails = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/get-pantryStaff`, {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });
      console.log("API Response:", data); // Debug log
      if (data.pantryStaff && Array.isArray(data.pantryStaff)) {
        setPantry(data.pantryStaff); // Use the correct key
        console.log("Updated Pantry State:", data.pantryStaff);
      } else {
        toast.error("Pantry data is not in the expected format.");
      }
    } catch (error) {
      console.error("Error fetching pantry staff:", error);
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  const value = {
    aToken,
    setAToken,
    backend_url,
    patients,
    setPatients,
    getAllPatients,
    getDashData,
    dashData,
    setDashData,
    dietChart,
    setDietChart,
    getAllDietCharts,
    delivery,
    setDelivery,
    getDelivery,
    pantry,
    setPantry,
    getPantryDetails,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
