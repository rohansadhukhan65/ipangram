import bcrypt from "bcryptjs";
import { UserModel } from "../models/Users.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role , location } = req.body;
 
    // Check if userEmail exists
    const userEmail = await UserModel.findOne({ email });
    if (userEmail) {
      return res.status(500).json({ emailExist: 'Invalid credentials' });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
      location
    });

    await user.save();
    console.log(user);
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Server error" });
  }
};
