import express from 'express';
import { signin, signup,googleAuth } from '../controllers/authMiddleware.js';
import { verifyToken } from '../verifyToken.js';


const router = express.Router();
// create user
router.post('/signup', signup);
// sign in
router.post('/signin', signin);
//google auth
router.post("/google", googleAuth)

export default router;