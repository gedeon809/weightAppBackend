import express from "express";
import { addWeight, getWeight, deleteWeight, updateWeight } from "../controllers/weightMiddleware.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();
//create weight
router.post("/addWeight", verifyToken, addWeight);
//get weight
router.get("/getWeight", verifyToken, getWeight);
//delete weight
router.delete("/:id", verifyToken, deleteWeight);
//update weight
router.put("/:id", verifyToken, updateWeight);

export default router;

