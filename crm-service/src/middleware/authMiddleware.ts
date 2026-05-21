import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { unauthorized } from '../utils/response';

// 扩展 Express Request 类型
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
      };
    }
  }
}

/**
 * 认证中间件
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers['auth-token'] as string;

  if (!token) {
    res.status(401).json(unauthorized('请先登录'));
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'crm-secret-key-2024') as any;
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json(unauthorized('Token 已过期或无效'));
  }
}
