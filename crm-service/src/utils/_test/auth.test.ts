// src/utils/_test/auth.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { login } from '../../controllers/authController'
import type { Request, Response } from 'express'

// ---- 辅助函数：Mock Request / Response ----
const createMockRequest = (body: Record<string, any> = {}) => {
  return {
    body,
    params: {},
    query: {},
    get: vi.fn(),
    header: vi.fn(),
    accepts: vi.fn(),
    ip: '127.0.0.1',
    protocol: 'http',
    secure: false,
  } as unknown as Request
}

const createMockResponse = () => {
  const res: Partial<Response> = {}
  res.status = vi.fn().mockReturnThis()
  res.json = vi.fn().mockReturnThis()
  return res as Response
}

// ---- Mock 外部依赖：避免真实数据库/JWT 调用 ----
vi.mock('../../models/userModel', () => ({
  findUserByUsername: vi.fn(),
  findUserById: vi.fn(),
  getUserRoles: vi.fn(),
}))

vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('$hashed$'),
    compare: vi.fn().mockResolvedValue(true),
  },
}))

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn().mockReturnValue('mock-jwt-token'),
  },
}))

describe('authController - login', () => {
  let req: Request
  let res: Response

  beforeEach(() => {
    vi.clearAllMocks()
    req = createMockRequest()
    res = createMockResponse()
  })

  // ---- 参数校验 ----
  it('缺少用户名时返回 400', async () => {
    req.body = { username: '', password: '123456' }

    await login(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      code: 400,
      data: null,
      message: '用户名和密码不能为空',
    })
  })

  it('缺少密码时返回 400', async () => {
    req.body = { username: 'admin', password: '' }

    await login(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      code: 400,
      data: null,
      message: '用户名和密码不能为空',
    })
  })

  it('用户名和密码都为空时返回 400', async () => {
    req.body = { username: '', password: '' }

    await login(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      code: 400,
      data: null,
      message: '用户名和密码不能为空',
    })
  })

  // ---- 用户验证 ----
  it('用户不存在时返回 401', async () => {
    req.body = { username: 'nobody', password: '123456' }
    const { findUserByUsername } = await import('../../models/userModel')
    vi.mocked(findUserByUsername).mockResolvedValue(null)

    await login(req, res)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      code: 401,
      data: null,
      message: '用户不存在或已被禁用',
    })
  })

  // ---- 成功登录 ----
  it('登录成功返回 token 和用户信息', async () => {
    req.body = { username: 'admin', password: 'correct' }
    const { findUserByUsername } = await import('../../models/userModel')
    vi.mocked(findUserByUsername).mockResolvedValue({
      id: 1,
      user_name: 'admin',
      nick_name: '管理员',
      email: 'admin@example.com',
      phone: '13800000000',
      dept_id: 1,
      status: '1',
      password: 'hashed_password',
    })

    await login(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 200,
        message: '登录成功',
        data: expect.objectContaining({
          token: 'mock-jwt-token',
          userInfo: expect.objectContaining({
            id: 1,
            userName: 'admin',
            nickName: '管理员',
          }),
        }),
      })
    )
  })
})
