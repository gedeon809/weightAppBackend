import express from 'express';
import { signin, signup,googleAuth } from '../controllers/authMiddleware.js';
import { verifyToken } from '../verifyToken.js';


const router = express.Router();
// create user
router.post('/signup',verifyToken, signup);
// sign in
router.post('/signin',verifyToken, signin);
//google auth
router.post("/google", googleAuth)

export default router;