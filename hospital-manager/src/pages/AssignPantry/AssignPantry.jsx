import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/context";

const AssignPantry = () => {
  const [selectedPantry, setSelectedPantry] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const {
    backend_url,
    aToken,
    getAllPatients,
    getPantryDetails,
    patients,
    pantry,
  } = useContext(AdminContext);

  useEffect(() => {
    // Fetch patients and pantry staff data from context
    getAllPatients();
    getPantryDetails();
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!selectedPantry || !selectedPatient) {
      toast.error("Please select both a pantry and a patient.");
      return;
    }

    try {
      const formData = {
        pantryStaffId: selectedPantry,
        patientId: selectedPatient,
      };

      // Send the assignment request to the backend
      const { data } = await axios.post(
        `${backend_url}/api/assigned-pantry`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error assigning pantry staff to patient.");
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="m-5 w-full">
        <p className="mb-5 text-lg font-medium">Assign Pantry to Patient</p>
        <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl">
          <div className="flex flex-col gap-4 text-gray-600">
            <div className="flex-1 flex flex-col gap-1">
              <p>Select Pantry</p>
              <select
                onChange={(event) => setSelectedPantry(event.target.value)}
                value={selectedPantry}
                className="border rounded px-3 py-2"
                required
              >
                <option value="">Select a pantry</option>
                {pantry.map((pantryItem) => (
                  <option key={pantryItem._id} value={pantryItem._id}>
                    {pantryItem.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Select Patient</p>
              <select
                onChange={(event) => setSelectedPatient(event.target.value)}
                value={selectedPatient}
                className="border rounded px-3 py-2"
                required
              >
                <option value="">Select a patient</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.name} ({patient.age} years old)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
        >
          Assign Pantry
        </button>
      </form>
    </div>
  );
};

export default AssignPantry;
