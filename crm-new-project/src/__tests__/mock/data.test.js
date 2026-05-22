import { describe, it, expect, beforeAll } from 'vitest'
import mockSystem from '../../../mock/system.js'

describe('mock data integrity', () => {
  let routes

  beforeAll(() => {
    routes = mockSystem
  })

  describe('dict endpoints', () => {
    let dictList, dictData
    beforeAll(() => {
      dictList = routes.find(r => r.url === '/api/system/dict/list')
      dictData = routes.find(r => r.url === '/api/system/dict/data')
    })

    it('dict list returns all dict types', () => {
      const res = dictList.response()
      expect(res.code).toBe(200)
      expect(res.data).toHaveProperty('sys_normal_disable')
      expect(res.data).toHaveProperty('sys_user_sex')
      expect(res.data).toHaveProperty('sys_show_hide')
      expect(res.data).toHaveProperty('sys_menu_type')
    })

    it('dict data returns items for valid type', () => {
      const res = dictData.response({ query: { dictType: 'sys_normal_disable' } })
      expect(res.data.records).toEqual([
        { label: '启用', value: '1' },
        { label: '停用', value: '0' }
      ])
    })

    it('dict data returns empty for unknown type', () => {
      const res = dictData.response({ query: { dictType: 'unknown' } })
      expect(res.data.records).toEqual([])
      expect(res.data.total).toBe(0)
    })
  })

  describe('menu endpoints', () => {
    let menuList, menuDetail, menuSave, menuDelete
    beforeAll(() => {
      menuList = routes.find(r => r.url === '/api/system/menu/list')
      menuDetail = routes.find(r => r.url === '/api/system/menu/detail')
      menuSave = routes.find(r => r.url === '/api/system/menu/save')
      menuDelete = routes.find(r => r.url === '/api/system/menu/delete')
    })

    it('menu list returns tree with root node', () => {
      const res = menuList.response({ query: {} })
      expect(res.code).toBe(200)
      expect(res.data[0].name).toBe('系统管理')
      expect(res.data[0].children).toHaveLength(5)
    })

    it('menu detail returns a menu by id', () => {
      const res = menuDetail.response({ query: { id: 1 } })
      expect(res.data.name).toBe('系统管理')
    })

    it('menu detail returns empty for unknown id', () => {
      const res = menuDetail.response({ query: { id: 999 } })
      expect(res.data).toEqual({})
    })

    it('menu save adds a new menu', () => {
      menuSave.response({ body: { parentId: 1, name: '测试菜单', type: 'MENU', path: 'test' } })
      const res = menuList.response({ query: {} }).data
      const parent = res[0]
      const added = parent.children.find(c => c.name === '测试菜单')
      expect(added).toBeDefined()
      expect(added.type).toBe('MENU')
    })

    it('menu delete removes a menu', () => {
      menuDelete.response({ query: { id: 2 } })
      const res = menuList.response({ query: {} }).data
      const parent = res[0]
      expect(parent.children.find(c => c.id === 2)).toBeUndefined()
    })
  })

  describe('org endpoints', () => {
    let orgList
    beforeAll(() => { orgList = routes.find(r => r.url === '/api/system/org/list') })

    it('org list returns tree with depts and posts', () => {
      const res = orgList.response()
      expect(res.data[0].name).toBe('总公司')
      expect(res.data[0].postList).toHaveLength(2)
      expect(res.data[1].name).toBe('技术部')
      expect(res.data[1].postList).toHaveLength(3)
    })
  })

  describe('role endpoints', () => {
    let roleList
    beforeAll(() => { roleList = routes.find(r => r.url === '/api/system/role/list') })

    it('role list returns all roles by default', () => {
      const res = roleList.response({ query: {} })
      expect(res.data.total).toBe(4)
    })

    it('role list filters by type', () => {
      const res = roleList.response({ query: { roleType: 2 } })
      expect(res.data.records).toHaveLength(1)
      expect(res.data.records[0].name).toBe('EXTERNAL')
    })
  })

  describe('user endpoints', () => {
    let userList
    beforeAll(() => { userList = routes.find(r => r.url === '/api/system/user/list') })

    it('user list returns all users', () => {
      const res = userList.response({ query: {} })
      expect(res.data.total).toBe(3)
    })

    it('user list filters by keyword', () => {
      const res = userList.response({ query: { keyword: 'admin' } })
      expect(res.data.records).toHaveLength(1)
      expect(res.data.records[0].userName).toBe('admin')
    })
  })

  describe('permission endpoints', () => {
    let resources, roleMenus
    beforeAll(() => {
      resources = routes.find(r => r.url === '/api/system/resources')
      roleMenus = routes.find(r => r.url === '/api/system/role/menus')
    })

    it('resources returns resource tree', () => {
      const res = resources.response()
      expect(res.data[0].name).toBe('系统管理')
      expect(res.data[0].children).toHaveLength(5)
    })

    it('role/menus returns menu ids', () => {
      const res = roleMenus.response({ query: { roleId: 1 } })
      expect(res.data).toEqual([1, 2, 3, 6])
    })
  })
})
