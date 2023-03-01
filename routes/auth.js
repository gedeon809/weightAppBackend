import express from 'express';
import { login, sign_up,googleAuth } from '../controllers/authMiddleware.js';
import { verifyToken } from '../verifyToken.js';


const router = express.Router();
// create user
router.post('/sign_up', sign_up);
// sign in
router.post('/login', login);
//google auth
router.post("/google", googleAuth)

export default router;