import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  currentGame: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' }, // Reference to Game schema
}, {
  timestamps: true,
});

const User = mongoose.model('User', UserSchema);
export default User;
