import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['employee', 'manager'],
    required: true
  },
  department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  }
}, {
  timestamps: true
});

export const UserModel = mongoose.model('users', userSchema);
