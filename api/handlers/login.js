import { UserModel } from "../models/Users.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { constants } from "../../constants.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
   
  try {
    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    console.log()
    // Validate password
    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(payload, constants.jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token , role : user.role, email : user.email });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
