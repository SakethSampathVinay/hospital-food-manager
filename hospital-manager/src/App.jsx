import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { AdminContext } from "./context/context.jsx";
import { ToastContainer } from "react-toastify";
import Patients from "./pages/Patients/Patients.jsx";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import DietChart from "./pages/DietCharts/DietCharts.jsx";
import DeliveryTracking from "./pages/DeliveryTracking/DeliveryTracking.jsx";
import Pantry from "./pages/Pantry/Pantry.jsx";

const App = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <>
      <ToastContainer />
      {aToken ? (
        <div className="bg-[#F8F9FD] min-h-screen">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <div className="flex-grow p-4">
              <Routes>
                <Route path="/patients" element={<Patients />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/diet-charts" element={<DietChart />} />
                <Route
                  path="/delivery-tracking"
                  element={<DeliveryTracking />}
                />
                <Route path="/pantry-details" element={<Pantry />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
};

export default App;
