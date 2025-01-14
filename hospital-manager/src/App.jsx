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
import NotFound from "./pages/NotFound.jsx";
import AddPatient from "./pages/AddPatients/AddPatients.jsx";
import AddDiet from "./pages/AddDiets/AddDiets.jsx";
import AddPantryStaff from "./pages/AddPantryStaff/AddPantryStaff.jsx";
import AssignPantry from "./pages/AssignPantry/AssignPantry.jsx";

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
                <Route path="/add-patient" element={<AddPatient />} />
                <Route path="/add-diet" element={<AddDiet />} />
                <Route path="/add-pantrystaff" element={<AddPantryStaff />} />
                <Route path="/assign-pantry" element={<AssignPantry />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};

export default App;
