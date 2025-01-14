import React, { useState, useEffect } from "react";
import axios from "axios";

const TrackMealDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    axios
      .get("/api/delivery/deliveries", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setDeliveries(response.data.deliveries))
      .catch((error) => console.error("Error fetching deliveries:", error));
  }, []);

  const markAsDelivered = (id) => {
    axios
      .put(`/api/delivery/update-status/${id}`, { status: "Delivered" }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setDeliveries((prev) =>
          prev.map((delivery) => (delivery._id === id ? { ...delivery, status: "Delivered" } : delivery))
        );
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  return (
    <div>
      <h2>Track Meal Deliveries</h2>
      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Room</th>
            <th>Meal Box</th>
            <th>Delivery Personnel</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery._id}>
              <td>{delivery.mealBoxId.patientId.name}</td>
              <td>{delivery.mealBoxId.patientId.roomNumber}</td>
              <td>
                {delivery.mealBoxId.morningMeal}, {delivery.mealBoxId.nightMeal}
              </td>
              <td>{delivery.deliveryStaffId.name}</td>
              <td>{delivery.status}</td>
              <td>
                {delivery.status !== "Delivered" && (
                  <button onClick={() => markAsDelivered(delivery._id)}>
                    Mark as Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackMealDeliveries;
