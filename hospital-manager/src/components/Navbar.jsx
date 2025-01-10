import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/context.jsx";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    if (aToken) {
      localStorage.removeItem("aToken"); // Remove the token from localStorage
      setAToken(null); // Clear the token from context
    }
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border bg-white">
      <div className="flex items-center gap-2 text-xs">
        <h1 className="text-primary font-sans font-black text-3xl cursor-pointer">
          Hospital Food Manager
        </h1>
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-500">
          Admin
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
