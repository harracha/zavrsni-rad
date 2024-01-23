// LoginPage.js
import React, { useState } from "react";
import landingImage from "../resources/eletehnika.webp"; // Replace with the actual path to your image
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentFlag, setStudentFlag] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleStudentStatus = () => {
    setStudentFlag(!studentFlag);
  };
  const handleLogin = async () => {
    // const loginData = { email: email, password: password };
    // const userType = studentFlag ? "student" : "teacher";
    // await fetch(`${process.env.REACT_APP_BE_URL}/auth/${userType}/login`, {
    //   method: "POST",
    //   body: JSON.stringify(loginData),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then(async (response) => {
    //     if (response.ok) {
    //       alert(`Hello user`);
    //       navigate("/dashboard");
    //     } else {
    //       response.json().then((data) => {
    //         alert(data.error);
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  return (
    // <div className="flex h-[100%] items-center justify-center bg-gray-100">
    //   <div className="bg-white p-8 w-[30%] h -[40%] rounded shadow-md">
    //     <h2 className="text-2xl font-semibold mb-6">Login</h2>
    <div
      className="h-[100%] flex items-center justify-center"
      style={{
        backgroundImage: `url(${landingImage})`, // Replace with your image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <div
        className="bg-gray-800 bg-opacity-90 p-8 rounded shadow-md text-white z-10"
        style={{ width: "300px" }}
      >
        <h2 className="text-2xl font-semibold mb-6">Login</h2>

        {/* User Type Checkbox */}
        <div className="mb-4">
          {/* <label className="block text-gray-700">User Type</label> */}
          <div className="mt-2">
            {/* <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-blue-500"
              />
              <span className="ml-2">Professor/Assistant</span> */}
            {/* </label> */}
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-blue-500"
                onClick={() => handleStudentStatus()}
              />
              <span className="ml-2">Student</span>
            </label>
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-4 flex-auto items-center">
          <label className="block text-white mr-2 text-center">Email</label>
          <input
            type="email"
            className="form-input text-black mt-1 block w-full rounded-sm border-gray-300"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-white text-center">Password</label>
          <input
            type="password"
            className="form-input text-black mt-1 block w-full rounded-sm border-gray-300"
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={() => {
            handleLogin();
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
};
export default LoginPage;
