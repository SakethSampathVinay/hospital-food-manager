import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../../context/context";
import { toast } from "react-toastify";
import axios from "axios";

const AddDietChart = () => {
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [morningMeal, setMorningMeal] = useState("");
  const [afternoonMeal, setAfternoonMeal] = useState("");
  const [eveningMeal, setEveningMeal] = useState("");
  const [nightMeal, setNightMeal] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const { backend_url, aToken } = useContext(AdminContext);

  // Fetch patients on component mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data } = await axios.get(`${backend_url}/api/patients`, {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        });
        setPatients(data.patients); // Assuming the API returns a list of patients
      } catch (error) {
        toast.error("Failed to fetch patients");
        console.error(error);
      }
    };

    fetchPatients();
  }, [backend_url, aToken]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("patientId", patientId); // Using patientId from selected patient
      formData.append("morningMeal", morningMeal);
      formData.append("afternoonMeal", afternoonMeal);
      formData.append("eveningMeal", eveningMeal);
      formData.append("nightMeal", nightMeal);
      formData.append("specialInstructions", specialInstructions);

      const { data } = await axios.post(
        `${backend_url}/api/add-diet-chart`, // Assuming the API endpoint is like this
        formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (data.message) {
        toast.success(data.message);
        setPatientId(""); // Clear patient ID after success
        setMorningMeal("");
        setAfternoonMeal("");
        setEveningMeal("");
        setNightMeal("");
        setSpecialInstructions("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to add diet chart");
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="m-5 w-full">
        <p className="mb-5 text-lg font-medium">Add Diet Chart</p>
        <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl">
          <div className="flex flex-col gap-4 text-gray-600">
            {/* Patient Selector Dropdown */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Patient</p>
              <select
                value={patientId}
                onChange={(event) => setPatientId(event.target.value)}
                className="border rounded px-3 py-2"
                required
              >
                <option value="">Select a Patient</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Morning Meal</p>
              <input
                onChange={(event) => setMorningMeal(event.target.value)}
                value={morningMeal}
                type="text"
                placeholder="Morning Meal"
                className="border rounded px-3 py-2"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Afternoon Meal</p>
              <input
                onChange={(event) => setAfternoonMeal(event.target.value)}
                value={afternoonMeal}
                type="text"
                placeholder="Afternoon Meal"
                className="border rounded px-3 py-2"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Evening Meal</p>
              <input
                onChange={(event) => setEveningMeal(event.target.value)}
                value={eveningMeal}
                type="text"
                placeholder="Evening Meal"
                className="border rounded px-3 py-2"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Night Meal</p>
              <input
                onChange={(event) => setNightMeal(event.target.value)}
                value={nightMeal}
                type="text"
                placeholder="Night Meal"
                className="border rounded px-3 py-2"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Special Instructions</p>
              <textarea
                onChange={(event) => setSpecialInstructions(event.target.value)}
                value={specialInstructions}
                placeholder="Special Instructions"
                className="border rounded px-3 py-2"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
        >
          Add Diet Chart
        </button>
      </form>
    </div>
  );
};

export default AddDietChart;
