import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/context";
import { toast } from "react-toastify";
import axios from "axios";

const AddPantryStaff = () => {
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [role, setRole] = useState("Pantry Worker");

  const { backend_url, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("contactInfo", contactInfo);
      formData.append("role", role);

      const { data } = await axios.post(
        `${backend_url}/api/add-pantry-staff`,
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
        setContactInfo("");
        setRole("Pantry Worker");
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
        <p className="mb-5 text-lg font-medium">Add Pantry Staff</p>
        <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl">
          <div className="flex flex-col gap-4 text-gray-600">
            <div className="flex-1 flex flex-col gap-1">
              <p>Staff Name</p>
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
              <p>Role</p>
              <select
                onChange={(event) => setRole(event.target.value)}
                value={role}
                className="border rounded px-3 py-2"
              >
                <option value="Pantry Worker">Pantry Worker</option>
                <option value="Chef">Chef</option>
                <option value="Supervisor">Supervisor</option>
              </select>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
        >
          Add Pantry Staff
        </button>
      </form>
    </div>
  );
};

export default AddPantryStaff;
