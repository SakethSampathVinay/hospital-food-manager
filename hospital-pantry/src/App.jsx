import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodPreparationTasks from "./pages/FoodPreparationTasks.jsx";
import ManageDeliveryPersonnel from "./pages/ManageDeliveryPersonnel.jsx";
import TrackMealDeliveries from "./pages/TrackMealDeliveries.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sideabar.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
    </>
  );
};

export default App;
