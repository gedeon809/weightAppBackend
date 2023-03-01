import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: String,
},
{ timestamps: true }
);

export default mongoose.model('User', userSchema);
