import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from '@/utils/request'
import { login, getInfo } from '@/api/user'

vi.mock('@/utils/request', () => ({
  default: vi.fn()
}))

describe('user API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('login sends correct post request', async () => {
    request.mockResolvedValue({ token: 'mock-token' })

    const result = await login({ username: 'admin', password: 'admin123' })
    expect(request).toHaveBeenCalledWith({
      url: '/api/user/login',
      method: 'post',
      data: { username: 'admin', password: 'admin123' }
    })
    expect(result).toEqual({ token: 'mock-token' })
  })

  it('login propagates error on failure', async () => {
    request.mockRejectedValue(new Error('用户名或密码错误'))
    await expect(login({ username: 'admin', password: 'wrong' })).rejects.toThrow('用户名或密码错误')
  })

  it('getInfo returns user data', async () => {
    request.mockResolvedValue({ name: 'Admin', roles: ['admin'], userId: 1 })

    const result = await getInfo()
    expect(request).toHaveBeenCalledWith({ url: '/api/user/info', method: 'get' })
    expect(result).toEqual({ name: 'Admin', roles: ['admin'], userId: 1 })
  })
})
