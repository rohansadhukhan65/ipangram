import React, { useCallback, useEffect, useState } from "react";
import { Apihelper } from "../../services/ApiHelpers";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ position }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location:"",
    role: position,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    formData.role = position;
    setFormData(formData);
  }, [position]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    },
    [formData]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let errors = {};
      let isValid = true;

      if (!formData.name.trim()) {
        errors.name = "Name is required";
        isValid = false;
      }

      if (!formData.email.trim()) {
        errors.email = "Email is required";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Email address is invalid";
        isValid = false;
      }

      if (!formData.password.trim()) {
        errors.password = "Password is required";
        isValid = false;
      }

      if (!formData.location.trim()) {
        errors.location = "Location is required";
        isValid = false;
      }

      if (!position) {
        return alert("Please choose your role !");
      }

      const data = await Apihelper.post("/api/register", formData);
      if (data.status === 500) {
        const Resdata = await data.json();
        if (Resdata.hasOwnProperty("emailExist")) {
          return alert("Email is Alrady Exist !");
        }
      }
      alert("User created successfully");
      // setFormData({
      //   name: "",
      //   email: "",
      //   password: "",
      //   role: position,
      // })
      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-6 bg-white p-6 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          required
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Email:
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          required
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Password:
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          required
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          required
        />
        {errors.location && (
          <p className="text-red-500 text-xs mt-1">{errors.location}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium  bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
      >
        Submit
      </button>
    </form>
  );
};

export default SignupForm;
