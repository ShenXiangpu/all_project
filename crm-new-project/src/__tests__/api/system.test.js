import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from '@/utils/request'
import * as system from '@/api/system'

vi.mock('@/utils/request', () => ({
  default: vi.fn()
}))

describe('system API - dict', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('getDictList fetches all dicts', async () => {
    request.mockResolvedValue({ sys_normal_disable: [] })
    const result = await system.getDictList()
    expect(request).toHaveBeenCalledWith({ url: '/api/system/dict/list', method: 'get' })
    expect(result).toHaveProperty('sys_normal_disable')
  })

  it('getDictData fetches dict items by type', async () => {
    request.mockResolvedValue({ records: [{ label: '启用', value: '1' }], total: 1 })
    const result = await system.getDictData('sys_normal_disable')
    expect(request).toHaveBeenCalledWith({ url: '/api/system/dict/data', method: 'get', params: { dictType: 'sys_normal_disable' } })
    expect(result.records).toHaveLength(1)
  })
})

describe('system API - menu', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('getMenuList returns menu tree', async () => {
    const menu = { id: 1, name: '系统管理', type: 'CATALOG' }
    request.mockResolvedValue([menu])
    const result = await system.getMenuList()
    expect(result[0].name).toBe('系统管理')
  })

  it('getMenuDetail returns menu by id', async () => {
    request.mockResolvedValue({ id: 1, name: '系统管理' })
    const result = await system.getMenuDetail(1)
    expect(request).toHaveBeenCalledWith({ url: '/api/system/menu/detail', method: 'get', params: { id: 1 } })
    expect(result.id).toBe(1)
  })

  it('saveMenu creates a menu', async () => {
    request.mockResolvedValue(null)
    await system.saveMenu({ parentId: 1, name: '子菜单', type: 'MENU', path: 'sub' })
    expect(request).toHaveBeenCalledWith({ url: '/api/system/menu/save', method: 'post', data: { parentId: 1, name: '子菜单', type: 'MENU', path: 'sub' } })
  })

  it('updateMenu modifies a menu', async () => {
    request.mockResolvedValue(null)
    await system.updateMenu({ id: 1, name: '更新名称' })
    expect(request).toHaveBeenCalledWith({ url: '/api/system/menu/update', method: 'post', data: { id: 1, name: '更新名称' } })
  })

  it('deleteMenu removes a menu', async () => {
    request.mockResolvedValue(null)
    await system.deleteMenu(1)
    expect(request).toHaveBeenCalledWith({ url: '/api/system/menu/delete', method: 'delete', params: { id: 1 } })
  })
})

describe('system API - org', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('getOrgList returns org tree', async () => {
    request.mockResolvedValue([{ id: 1, name: '总公司', postList: [] }])
    const result = await system.getOrgList()
    expect(result[0].name).toBe('总公司')
  })

  it('saveDept creates a department', async () => {
    request.mockResolvedValue(null)
    await system.saveDept({ name: '新部门', parentId: 1 })
    expect(request).toHaveBeenCalledWith({ url: '/api/system/dept/save', method: 'post', data: { name: '新部门', parentId: 1 } })
  })

  it('updateDept modifies a department', async () => {
    request.mockResolvedValue(null)
    await system.updateDept({ id: 1, name: '更新部门' })
    expect(request).toHaveBeenCalledWith({ url: '/api/system/dept/update', method: 'post', data: { id: 1, name: '更新部门' } })
  })

  it('deleteDept removes a department', async () => {
    request.mockResolvedValue(null)
    await system.deleteDept(1)
    expect(request).toHaveBeenCalledWith({ url: '/api/system/dept/delete', method: 'delete', params: { id: 1 } })
  })

  it('savePost creates a post under a dept', async () => {
    request.mockResolvedValue(null)
    await system.savePost({ name: '工程师', deptId: 1 })
    expect(request).toHaveBeenCalledWith({ url: '/api/system/post/save', method: 'post', data: { name: '工程师', deptId: 1 } })
  })

  it('updatePost modifies a post', async () => {
    request.mockResolvedValue(null)
    await system.updatePost({ id: 1, name: '高级工程师' })
    expect(request).toHaveBeenCalledWith({ url: '/api/system/post/update', method: 'post', data: { id: 1, name: '高级工程师' } })
  })

  it('deletePost removes a post', async () => {
    request.mockResolvedValue(null)
    await system.deletePost(1)
    expect(request).toHaveBeenCalledWith({ url: '/api/system/post/delete', method: 'delete', params: { id: 1 } })
  })
})

describe('system API - role', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('getRoleList with type filter', async () => {
    request.mockResolvedValue({ records: [], total: 0 })
    await system.getRoleList({ roleType: 1 })
    expect(request).toHaveBeenCalledWith({ url: '/api/system/role/list', method: 'get', params: { roleType: 1 } })
  })

  it('saveRole creates a role', async () => {
    request.mockResolvedValue(null)
    await system.saveRole({ name: 'TEST', cnName: '测试角色' })
    expect(request).toHaveBeenCalledWith({ url: '/api/system/role/save', method: 'post', data: { name: 'TEST', cnName: '测试角色' } })
  })

  it('deleteRole removes a role', async () => {
    request.mockResolvedValue(null)
    await system.deleteRole(1)
    expect(request).toHaveBeenCalledWith({ url: '/api/system/role/delete', method: 'delete', params: { id: 1 } })
  })
})

describe('system API - user', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('getUserList with search', async () => {
    request.mockResolvedValue({ records: [], total: 0 })
    await system.getUserList({ keyword: 'admin' })
    expect(request).toHaveBeenCalledWith({ url: '/api/system/user/list', method: 'get', params: { keyword: 'admin' } })
  })

  it('saveUser creates a user', async () => {
    request.mockResolvedValue(null)
    await system.saveUser({ userName: 'newuser', nickName: '新用户' })
    expect(request).toHaveBeenCalledWith({ url: '/api/system/user/save', method: 'post', data: { userName: 'newuser', nickName: '新用户' } })
  })

  it('updateUser modifies a user', async () => {
    request.mockResolvedValue(null)
    await system.updateUser({ id: 1, nickName: '更新昵称' })
    expect(request).toHaveBeenCalledWith({ url: '/api/system/user/update', method: 'post', data: { id: 1, nickName: '更新昵称' } })
  })

  it('deleteUser removes a user', async () => {
    request.mockResolvedValue(null)
    await system.deleteUser(1)
    expect(request).toHaveBeenCalledWith({ url: '/api/system/user/delete', method: 'delete', params: { id: 1 } })
  })
})

describe('system API - permission', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('getResources returns resource tree', async () => {
    request.mockResolvedValue([{ id: 1, name: '系统管理', children: [] }])
    const result = await system.getResources()
    expect(result[0].name).toBe('系统管理')
  })

  it('getRoleMenus returns menu ids for a role', async () => {
    request.mockResolvedValue([1, 2, 3])
    const result = await system.getRoleMenus(1)
    expect(result).toEqual([1, 2, 3])
  })

  it('distributeMenu assigns menus to role', async () => {
    request.mockResolvedValue(null)
    await system.distributeMenu({ roleId: 1, menuIds: [1, 2, 3] })
    expect(request).toHaveBeenCalledWith({ url: '/api/system/role/distributeMenu', method: 'post', data: { roleId: 1, menuIds: [1, 2, 3] } })
  })
})
