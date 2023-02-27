import mongoose from "mongoose";
const WeightSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  weight: {
    type: Number,
    required: true,
  },
}
);

export default mongoose.model("Weight", WeightSchema);
