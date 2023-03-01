import express from "express";
import { save_weight, get_weight_history, delete_weight, update_weight } from "../controllers/weightMiddleware.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();
//create weight
router.post("/save_weight", save_weight);
//get weight
router.get("/get_weight_history", get_weight_history);
//delete weight
router.delete("/:id", delete_weight);
//update weight
router.put("/:id", update_weight);

export default router;

