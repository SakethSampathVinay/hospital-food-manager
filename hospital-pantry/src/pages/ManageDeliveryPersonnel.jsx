import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageDeliveryPersonnel = () => {
  const [personnel, setPersonnel] = useState([]);
  const [form, setForm] = useState({ name: "", contactInfo: "", otherDetails: "" });

  useEffect(() => {
    axios
      .get("/api/delivery/personnel", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setPersonnel(response.data.personnel))
      .catch((error) => console.error("Error fetching personnel:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/delivery/add-personnel", form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setPersonnel((prev) => [...prev, response.data.personnel]);
        setForm({ name: "", contactInfo: "", otherDetails: "" });
      })
      .catch((error) => console.error("Error adding personnel:", error));
  };

  return (
    <div>
      <h2>Manage Delivery Personnel</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={form.contactInfo}
          onChange={(e) => setForm({ ...form, contactInfo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Other Details"
          value={form.otherDetails}
          onChange={(e) => setForm({ ...form, otherDetails: e.target.value })}
        />
        <button type="submit">Add Personnel</button>
      </form>
      <ul>
        {personnel.map((person) => (
          <li key={person._id}>
            {person.name} - {person.contactInfo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageDeliveryPersonnel;
