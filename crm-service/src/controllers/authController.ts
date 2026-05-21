import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { success, fail, unauthorized } from '../utils/response';
import { findUserByUsername, findUserById, getUserRoles } from '../models/userModel';

/**
 * 用户登录
 * POST /api/user/login
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;

    // 参数校验
    if (!username || !password) {
      res.status(400).json(fail(400, '用户名和密码不能为空'));
      return;
    }

    // 查询用户
    const user = await findUserByUsername(username);
    if (!user) {
      res.status(401).json(fail(401, '用户不存在或已被禁用'));
      return;
    }

    // 验证密码（这里简化处理，直接比较，实际应该用 bcrypt）
    // 如果数据库有加密密码则使用 bcrypt.compare
    const isPasswordValid = user.password
      ? await bcrypt.compare(password, user.password)
      : password === 'admin123'; // Mock 数据默认密码

    if (!isPasswordValid) {
      res.status(401).json(fail(401, '用户名或密码错误'));
      return;
    }

    // 生成 Token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'crm-secret-key-2024',
      { expiresIn: '24h' }
    );

    // 返回数据
    res.json(success({
      token,
      userInfo: {
        id: user.id,
        userName: user.user_name,
        nickName: user.nick_name,
        email: user.email,
        phone: user.phone
      }
    }, '登录成功'));
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json(fail(500, '服务器内部错误'));
  }
}

/**
 * 获取当前用户信息
 * GET /api/user/info
 */
export async function getUserInfo(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json(unauthorized());
      return;
    }

    const user = await findUserById(userId);
    if (!user) {
      res.status(404).json(fail(404, '用户不存在'));
      return;
    }

    // 获取用户角色
    const roles = await getUserRoles(userId);

    res.json(success({
      name: user.nick_name,
      avatar: '',
      roles: roles.length > 0 ? roles : ['user'],
      userId: user.id
    }, 'success'));
  } catch (error) {
    console.error('Get user info error:', error);
    res.status(500).json(fail(500, '服务器内部错误'));
  }
}
