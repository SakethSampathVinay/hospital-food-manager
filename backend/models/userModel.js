import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  // Ensures email is unique
    lowercase: true, // Convert email to lowercase
    trim: true,  // Remove extra spaces
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['hospital_manager', 'hospital_pantry', 'hospital_delivery'],
    required: true, // Role is required
  },
});

const User = mongoose.model('User', UserSchema);
export default User;