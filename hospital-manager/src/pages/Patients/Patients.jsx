import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/context";

const Patients = () => {
  const { aToken, patients, getAllPatients } = useContext(AdminContext);

  // Fetch patients when the component is mounted or aToken is updated
  useEffect(() => {
    getAllPatients();
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Patients Details</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-auto">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_1fr_2fr_2fr_1fr_1fr_1fr_1fr_1fr] grid-flow-col py-3 px-6 bg-gray-100 text-gray-700 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Gender</p>
          <p>Diseases</p>
          <p>Allergies</p>
          <p>Room No</p>
          <p>Bed No</p>
          <p>Floor No</p>
          <p>Contact Info</p>
          <p>Emergency No</p>
        </div>

        {/* Table Content */}
        <div className="overflow-y-auto max-h-[70vh]">
          {patients && patients.length > 0 ? (
            patients.map((patient, index) => (
              <div
                key={patient._id}
                className="grid grid-cols-[0.5fr_3fr_1fr_1fr_2fr_2fr_1fr_1fr_1fr_1fr_1fr] py-3 px-6 border-b hover:bg-gray-50"
              >
                <p>{index + 1}</p>
                <p>{patient.name}</p>
                <p>{patient.age}</p>
                <p>{patient.gender}</p>
                <p>{patient.diseases}</p>
                <p>{patient.allergies}</p>
                <p>{patient.roomNumber}</p>
                <p>{patient.bedNumber}</p>
                <p>{patient.floorNumber}</p>
                <p>{patient.contactInfo}</p>
                <p>{patient.emergencyContact}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              Loading patients...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Patients;
