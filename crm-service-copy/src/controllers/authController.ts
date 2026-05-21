import { type Request, type Response } from 'express';
import { findUserByUsername } from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { success, fail, unauthorized } from '../utils/response.js';
/**
 * 用户登录
 * POST /api/user/login
 */
export async function login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    //参数校验
    if (!username || !password) {
        res.status(400).json({
            code: 400,
            message: '用户名或密码不能为空'
        });
        return;
    }
    try {
        // 查询用户
        const user = await findUserByUsername(username);
        if (!user) {
            res.status(401).json({ code: 401, message: '用户不存在' });
            return;

        }
        // 3. 验证密码 (核心用法)
        // bcrypt.compare(明文密码, 数据库中的哈希密码)
        // 返回 Promise<boolean>
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ code: 401, message: '密码错误' });
            return;
        }
        // 4. 生成 Token (假设你有 JWT_SECRET)
        const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
        const token = jwt.sign(
            { id: user.id, username: user.user_name },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // 5. 返回成功结果
        res.json({
            code: 200,
            message: '登录成功',
            data: {
                token,
                user: {
                    id: user.id,
                    username: user.user_name
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: '服务器错误'
        });
    }
}