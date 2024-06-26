import React, { useContext, useEffect, useState } from "react";
import AuthWrapper from "../components/AuthWrapper";
import { Apihelper } from "../../services/ApiHelpers";
import { AppContext } from "../Context";
import { useNavigate } from "react-router-dom";
import DepartmentEditModal from "../components/DepartmentEditModal";

const DepartmentCrud = () => {
  const navigate = useNavigate();
  const [DeptDatamodalOpen, setDeptDataModalOpen] = useState(false);
  const [departmentEdit, setDepartmentEdit] = useState({});
  const { authData } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
  });

  const [departments, setDepartments] = useState([]);

  const modalDeptDataViewhandler = () => setDeptDataModalOpen((p) => !p);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Apihelper.post(
        "/api/create-departments",
        formData
      ); // Adjust API endpoint as needed
      console.log("Department created:", response.data);
      // Optionally, handle success feedback or redirect
      setFormData({ name: "" });
    } catch (error) {
      console.error("Error creating department:", error);
      // Handle error feedback
    }
  };

  const getDepartments = async () => {
    try {
      const response = await Apihelper.get("/api/get-all-departments");
      const { data } = await response.json();
      setDepartments(data);
    } catch (error) {
      console.log(error);
    }
  };
  const closeModal = () => {
    setDeptDataModalOpen(false);
    getDepartments()
  };

  const departmentDelete = async (id) => {
    try {
      const response = await Apihelper.post("/api/delete-department", {
        id: id,
      });
      const data = await response.json();
      console.log(data);
      await getDepartments();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authData.role !== "manager") {
      navigate("/dashboard");
    }
  }, [authData]);

  useEffect(() => {
    getDepartments();
  }, [departments]);

  return (
    <AuthWrapper>
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

      <div className="p-5 flex flex-col justify-center items-center my-10">
        <p className="font-semibold text-lg border-b mb-5 pb-2">
          Department Names
        </p>
        {departments.map((item, key) => (
          <div key={item._id}>
            <span className="flex gap-x-5 my-2">
             <span className="font-semibold text-xl" > {key + 1} .{item.name}</span>
              <button
              className="px-5 bg-yellow-500 text-white rounded-md"
                onClick={() => {
                  modalDeptDataViewhandler();
                  setDepartmentEdit(item);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  departmentDelete(item._id);
                }}
                className="px-5 bg-red-500 text-white rounded-md"
                type="button"
              >
                Delete
              </button>
              
            </span>
          </div>
        ))}

        <DepartmentEditModal
          isOpen={DeptDatamodalOpen}
          onClose={closeModal}
          data={departmentEdit}
        />
      </div>
    </AuthWrapper>
  );
};

export default DepartmentCrud;
