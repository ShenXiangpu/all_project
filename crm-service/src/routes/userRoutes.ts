import { Router } from 'express';
import { login, getUserInfo } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// 用户登录
router.post('/login', login);

// 获取用户信息（需要认证）
router.get('/info', authMiddleware, getUserInfo);

export default router;
