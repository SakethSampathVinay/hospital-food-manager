import React, { useContext, useState } from "react";
import { AdminContext } from "../context/context";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState(""); // Initialize state with an empty string
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backend_url } = useContext(AdminContext);

  const onSubmitForm = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const { data } = await axios.post(`${backend_url}/api/login`, {
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem("aToken", data.token);
        setAToken(data.token);
        toast.success("Login successful!");
        console.log("Token:", data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred while logging in.");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitForm} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-2xl font-semibold m-auto">
            <span className="text-primary">{state}</span> Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="email"
              placeholder="Please Enter your Email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              required
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="password"
              placeholder="Please Enter your Password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white w-full py-2 rounded-md text-base"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
