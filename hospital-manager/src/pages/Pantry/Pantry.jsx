import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/context";

const Pantry = () => {
  const { pantry, getPantryDetails, loading } = useContext(AdminContext);

  // Fetch pantry details on component mount
  useEffect(() => {
    getPantryDetails();
  }, [getPantryDetails]);

  // Render loading state
  if (loading) {
    return (
      <div className="text-center text-lg font-medium">
        Loading pantry details...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Pantry Staff Details
      </h2>

      {/* Display pantry staff in a table */}
      {pantry && pantry.length === 0 ? (
        <div className="text-center text-gray-500">No pantry staff found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 text-left font-semibold text-gray-700">
                  Name
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-700">
                  Contact Info
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-700">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {pantry.map((staff) => (
                <tr key={staff._id} className="border-t hover:bg-gray-100">
                  <td className="py-3 px-6 text-gray-800">
                    {staff.name || "N/A"}
                  </td>
                  <td className="py-3 px-6 text-gray-800">
                    {staff.contactInfo || "N/A"}
                  </td>
                  <td className="py-3 px-6 text-gray-800">
                    {staff.role || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Pantry;
