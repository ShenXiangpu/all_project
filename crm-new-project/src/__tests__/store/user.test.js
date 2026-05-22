import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/store/user'

vi.mock('@/api/user', () => ({
  login: vi.fn(),
  getInfo: vi.fn()
}))

const { login, getInfo } = await import('@/api/user')

describe('user store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('login saves token', async () => {
    login.mockResolvedValue({ token: 'mock-token-123' })

    const store = useUserStore()
    await store.login({ username: 'admin', password: 'admin123' })

    expect(login).toHaveBeenCalledWith({ username: 'admin', password: 'admin123' })
    expect(store.token).toBe('mock-token-123')
    expect(localStorage.getItem('crm_token')).toBe('mock-token-123')
  })

  it('getInfo populates user data', async () => {
    getInfo.mockResolvedValue({ name: 'Admin', avatar: '', roles: ['admin'], userId: 1 })

    const store = useUserStore()
    const data = await store.getInfo()

    expect(store.name).toBe('Admin')
    expect(store.roles).toEqual(['admin'])
    expect(store.userId).toBe(1)
    expect(data).toEqual({ name: 'Admin', avatar: '', roles: ['admin'], userId: 1 })
  })

  it('logout clears all state', async () => {
    localStorage.setItem('crm_token', 'mock-token')
    const store = useUserStore()
    store.$patch({ token: 'mock-token', name: 'Admin', roles: ['admin'], userId: 1 })

    store.logout()

    expect(store.token).toBe('')
    expect(store.name).toBe('')
    expect(store.roles).toEqual([])
    expect(store.userId).toBeNull()
    expect(localStorage.getItem('crm_token')).toBeNull()
  })

  it('initial state reads token from localStorage', () => {
    localStorage.setItem('crm_token', 'saved-token')
    const store = useUserStore()
    expect(store.token).toBe('saved-token')
  })
})
