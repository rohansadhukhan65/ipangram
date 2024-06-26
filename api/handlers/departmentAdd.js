import { DepartmentModel } from "../models/Department.js";

export const departmentAdd = async (req, res) => {
  try {
    const { name } = req.body;
    // Create a new department instance
    const newDepartment = new DepartmentModel({
      name,
    });

    // Save the department to the database
    await newDepartment.save();
    res.status(200).json({});
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error });
  }
};

export const GetAllDepartments = async (req, res) => {
  try {
    const data = await DepartmentModel.find({});

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error });
  }
};

export const DeleteDepartMents = async (req, res) => {
  try {
    const { id } = req.body;

    const data = await DepartmentModel.findByIdAndDelete(id);

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error });
  }
};

export const departmentEdit = async (req, res) => {
  try {
    const { id, name } = req.body;
    const EditDept = await DepartmentModel.findOne({ _id: id });
    if (EditDept) {
      EditDept.name = name;
    }
    EditDept.save();

    res.status(200).json({});
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error });
  }
};
