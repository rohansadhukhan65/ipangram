import { UserModel } from "../models/Users.js";

export const allEmpFetch = async (req, res) => {
  try {
    const page = req.query.page; // Retrieves 'keyword'
    const limit = req.query.limit; // Retrieves 'keyword'
    const filterName = req.query.filterName; // Retrieves 'keyword'
    const filterLocation = req.query.filterLocation; // Retrieves 'keyword'

    console.log("Location ::",filterLocation);

    let employees = await UserModel.find({ role: "employee" });
    if (filterName === "asc") {
      employees = await UserModel.find({ role: "employee" }).sort({ name: 1 });
    }
    if (filterName === "dsc") {
      employees = await UserModel.find({ role: "employee" }).sort({ name: -1 });
    }
    if (filterLocation === "asc") {
      employees = await UserModel.find({ role: "employee" }).sort({ location: 1 });
    }
    if (filterLocation === "dsc") {
      employees = await UserModel.find({ role: "employee" }).sort({ location: -1 });
    }

    res.status(200).json({ emp: employees });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error });
  }
};
