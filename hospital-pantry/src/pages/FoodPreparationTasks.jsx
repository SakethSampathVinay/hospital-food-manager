import React, { useState, useEffect } from "react";
import axios from "axios";

const FoodPreparationTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("/api/diet-charts/meal-tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setTasks(response.data.tasks))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const updateStatus = (id, status) => {
    axios
      .put(`/api/diet-charts/meal-tasks/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setTasks((prev) =>
          prev.map((task) => (task._id === id ? { ...task, preparationStatus: status } : task))
        );
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  return (
    <div>
      <h2>Food Preparation Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Room</th>
            <th>Meal</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.patientId.name}</td>
              <td>{task.patientId.roomNumber}</td>
              <td>
                {task.morningMeal}, {task.afternoonMeal}, {task.eveningMeal}, {task.nightMeal}
              </td>
              <td>{task.preparationStatus}</td>
              <td>
                <button onClick={() => updateStatus(task._id, "In Progress")}>
                  In Progress
                </button>
                <button onClick={() => updateStatus(task._id, "Completed")}>
                  Completed
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodPreparationTasks;
