import Weight from "../models/Weight.js";
import { createError } from "../error.js";
// create a new Weight
export const addWeight = async (req, res, next) => {
  const newWeight = new Weight({ userId: req.user.id, ...req.body });
  try {
    const savedWeight = await newWeight.save();
    res.status(200).json(savedWeight);
  } catch (err) {
    next(err);
  }
};
// update a weight by ID
export const updateWeight = async (req, res, next) => {
  try {
    const weight = await Weight.findById(req.params.id);
    if (!weight) return next(createError(404, "Weight not found!"));
    if (req.user.id === weight.userId) {
      const updatedWeight = await Weight.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedWeight);
    } else {
      return next(createError(403, "You can update only your Weight!"));
    }
  } catch (err) {
    next(err);
  }
};
// delete a weight by its ID
export const deleteWeight = async (req, res, next) => {
  try {
    const weight = await Weight.findById(req.params.id);
    if (!weight) return next(createError(404, "Weight not found!"));
    if (req.user.id === weight.userId) {
      await Weight.findByIdAndDelete(req.params.id);
      res.status(200).json("The Weight has been deleted.");
    } else {
      return next(createError(403, "You can delete only your Weight!"));
    }
  } catch (err) {
    next(err);
  }
};
// Get the weights
export const getWeight = async (req, res, next) => {
  try {
    const weights = await Weight.find();
    res.status(200).json(weights);
  } catch (err) {
    next(err);
  }
};