import mongoose from 'mongoose'

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});


export const DepartmentModel= mongoose.model('Department', departmentSchema);
