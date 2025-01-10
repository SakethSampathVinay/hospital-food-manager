import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <ul>
        <NavLink
          to={"/dashboard"}
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
              isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
            }`
          }
        >
          <p className="font-semibold text-1.5xl">Dashboard</p>
        </NavLink>
        <NavLink
          to={"/patients"}
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
              isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
            }`
          }
        >
          <p className="font-semibold text-1.5xl">Patients</p>
        </NavLink>
        <NavLink
          to={"/diet-charts"}
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
              isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
            }`
          }
        >
          <p className="font-semibold text-1.5xl">Diet Charts</p>
        </NavLink>
        <NavLink
          to={"/delivery-tracking"}
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
              isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
            }`
          }
        >
          <p className="font-semibold text-1.5xl">Delivery Tracking</p>
        </NavLink>
        <NavLink
          to={"/pantry-details"}
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
              isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
            }`
          }
        >
          <p className="font-semibold text-1.5xl">Pantry Details</p>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
