import React, { useEffect, useState } from "react";
import { Apihelper } from "../../services/ApiHelpers";

const DepartmentEditModal = ({ isOpen, onClose, data }) => {
  const [formData, setFormData] = useState({
    id : "",
    name: "" ,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Apihelper.post(
        "/api/edit-department",
        formData
      ); // Adjust API endpoint as needed
      console.log("Department edited:", response);
      // Optionally, handle success feedback or redirect
      setFormData({ name: "" });
      onClose()
    } catch (error) {
      console.error("Error creating department:", error);
      // Handle error feedback
    }
  };


  useEffect(()=>{
    
    setFormData({
        id : data._id,
        name : data.name
    })
  },[data,isOpen])


  
  // Conditional rendering of the modal based on isOpen prop
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto border-[2px] border-gray-900">
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-4">
            <form
              onSubmit={handleSubmit}
              className="max-w-sm mx-auto mt-6 bg-white p-6 rounded-lg shadow-md"
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Submit
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DepartmentEditModal;
