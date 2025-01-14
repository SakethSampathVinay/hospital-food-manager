import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/context";
import { toast } from "react-toastify";
import axios from "axios";

const AddPatient = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [diseases, setDiseases] = useState("");
  const [allergies, setAllergies] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [bedNo, setBedNo] = useState("");
  const [floorNo, setFloorNo] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const { backend_url, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("age", Number(age));
      formData.append("gender", gender);
      formData.append("diseases", diseases);
      formData.append("allergies", allergies);
      formData.append("roomNumber", Number(roomNo)); // Updated to match backend
      formData.append("bedNumber", Number(bedNo)); // Updated to match backend
      formData.append("floorNumber", Number(floorNo)); // Updated to match backend
      formData.append("contactInfo", contactInfo);
      formData.append("emergencyContact", emergencyContact); // Updated to match backend

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const { data } = await axios.post(
        `${backend_url}/api/add-patients`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setName("");
        setAge("");
        setGender("Male");
        setDiseases("");
        setAllergies("");
        setRoomNo("");
        setBedNo("");
        setFloorNo("");
        setContactInfo("");
        setEmergencyContact("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="m-5 w-full">
        <p className="mb-5 text-lg font-medium">Add Patient</p>
        <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl">
          <div className="flex flex-col gap-4 text-gray-600">
            <div className="flex-1 flex flex-col gap-1">
              <p>Patient Name</p>
              <input
                onChange={(event) => setName(event.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                className="border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Patient Age</p>
              <input
                onChange={(event) => setAge(event.target.value)}
                value={age}
                type="number"
                placeholder="Age"
                className="border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Patient Gender</p>
              <select
                onChange={(event) => setGender(event.target.value)}
                value={gender}
                className="border rounded px-3 py-2"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Patient Diseases</p>
              <input
                onChange={(event) => setDiseases(event.target.value)}
                value={diseases}
                type="text"
                placeholder="Diseases"
                className="border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Patient Allergies</p>
              <input
                onChange={(event) => setAllergies(event.target.value)}
                value={allergies}
                type="text"
                placeholder="Allergies"
                className="border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Room Number</p>
              <input
                onChange={(event) => setRoomNo(event.target.value)}
                value={roomNo}
                type="number"
                placeholder="Room Number"
                className="border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Bed Number</p>
              <input
                onChange={(event) => setBedNo(event.target.value)}
                value={bedNo}
                type="number"
                placeholder="Bed Number"
                className="border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Floor Number</p>
              <input
                onChange={(event) => setFloorNo(event.target.value)}
                value={floorNo}
                type="number"
                placeholder="Floor Number"
                className="border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Contact Information</p>
              <input
                onChange={(event) => setContactInfo(event.target.value)}
                value={contactInfo}
                type="text"
                placeholder="Contact Information"
                className="border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Emergency Information</p>
              <input
                onChange={(event) => setEmergencyContact(event.target.value)}
                value={emergencyContact}
                type="text"
                placeholder="Emergency Information"
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
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
