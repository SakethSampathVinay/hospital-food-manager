import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/context";
import { toast } from "react-toastify";

const DeliveryTracking = () => {
  const { delivery, getDelivery } = useContext(AdminContext);

  useEffect(() => {
    getDelivery();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Food Deliveries
      </h2>

      {/* Displaying a message if no delivery data is available */}
      {delivery.length === 0 ? (
        <p className="text-center text-gray-600">No deliveries found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-6 py-3 text-left font-medium">Meal Box</th>
                <th className="px-6 py-3 text-left font-medium">Patient ID</th>
                <th className="px-6 py-3 text-left font-medium">
                  Delivery Staff
                </th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Notes</th>
                <th className="px-6 py-3 text-left font-medium">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {delivery.map((item) => (
                <tr key={item._id} className="border-b border-gray-200">
                  <td className="px-6 py-4">{`${item.mealBoxId.morningMeal} / ${item.mealBoxId.afternoonMeal} / ${item.mealBoxId.eveningMeal} / ${item.mealBoxId.nightMeal}`}</td>
                  <td className="px-6 py-4">{item.mealBoxId.patientId}</td>
                  <td className="px-6 py-4">{`${item.deliveryStaffId.name} - ${item.deliveryStaffId.contactInfo}`}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4">{item.deliveryNotes}</td>
                  <td className="px-6 py-4">
                    {new Date(item.timestamp).toLocaleString()}
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

export default DeliveryTracking;
