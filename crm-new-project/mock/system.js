const dictData = {
  sys_normal_disable: [
    { label: '启用', value: '1' },
    { label: '停用', value: '0' }
  ],
  sys_user_sex: [
    { label: '男', value: '0' },
    { label: '女', value: '1' }
  ],
  sys_show_hide: [
    { label: '显示', value: '1' },
    { label: '隐藏', value: '0' }
  ],
  sys_menu_type: [
    { label: '目录', value: 'CATALOG' },
    { label: '菜单', value: 'MENU' },
    { label: '按钮', value: 'BUTTON' }
  ]
}

let menuIdCounter = 20
const menuData = [
  { id: 1, parentId: 0, name: '系统管理', type: 'CATALOG', path: '/system', icon: 'settings-outline', perm: '', sort: 1, visible: 1, children: [
    { id: 2, parentId: 1, name: '字典管理', type: 'MENU', path: 'dict', component: 'system/dict/index', icon: '', perm: 'system:dict:list', sort: 1, visible: 1, children: [
      { id: 7, parentId: 2, name: '新增字典', type: 'BUTTON', path: '', perm: 'system:dict:add', sort: 1, visible: 1 },
      { id: 8, parentId: 2, name: '删除字典', type: 'BUTTON', path: '', perm: 'system:dict:delete', sort: 2, visible: 1 }
    ]},
    { id: 3, parentId: 1, name: '菜单管理', type: 'MENU', path: 'menu', component: 'system/menu/index', icon: '', perm: 'system:menu:list', sort: 2, visible: 1, children: [
      { id: 9, parentId: 3, name: '新增菜单', type: 'BUTTON', path: '', perm: 'system:menu:add', sort: 1, visible: 1 },
      { id: 10, parentId: 3, name: '修改菜单', type: 'BUTTON', path: '', perm: 'system:menu:edit', sort: 2, visible: 1 },
      { id: 11, parentId: 3, name: '删除菜单', type: 'BUTTON', path: '', perm: 'system:menu:delete', sort: 3, visible: 1 }
    ]},
    { id: 4, parentId: 1, name: '组织管理', type: 'MENU', path: 'org', component: 'system/org/index', icon: '', perm: 'system:org:list', sort: 3, visible: 1 },
    { id: 5, parentId: 1, name: '角色管理', type: 'MENU', path: 'role', component: 'system/role/index', icon: '', perm: 'system:role:list', sort: 4, visible: 1, children: [
      { id: 12, parentId: 5, name: '新增角色', type: 'BUTTON', path: '', perm: 'system:role:add', sort: 1, visible: 1 }
    ]},
    { id: 6, parentId: 1, name: '用户管理', type: 'MENU', path: 'user', component: 'system/user/index', icon: '', perm: 'system:user:list', sort: 5, visible: 1, children: [
      { id: 13, parentId: 6, name: '新增用户', type: 'BUTTON', path: '', perm: 'system:user:add', sort: 1, visible: 1 },
      { id: 14, parentId: 6, name: '修改用户', type: 'BUTTON', path: '', perm: 'system:user:edit', sort: 2, visible: 1 },
      { id: 15, parentId: 6, name: '删除用户', type: 'BUTTON', path: '', perm: 'system:user:delete', sort: 3, visible: 1 }
    ]}
  ]}
]

let deptIdCounter = 10
let postIdCounter = 20
const orgData = [
  { id: 1, name: '总公司', parentId: 0, sort: 1, postList: [
    { id: 1, postName: '总经理', deptId: 1 },
    { id: 2, postName: '副总经理', deptId: 1 }
  ]},
  { id: 2, name: '技术部', parentId: 1, sort: 2, postList: [
    { id: 3, postName: '技术经理', deptId: 2 },
    { id: 4, postName: '前端工程师', deptId: 2 },
    { id: 5, postName: '后端工程师', deptId: 2 }
  ]},
  { id: 3, name: '市场部', parentId: 1, sort: 3, postList: [
    { id: 6, postName: '市场经理', deptId: 3 },
    { id: 7, postName: '市场专员', deptId: 3 }
  ]}
]

let roleIdCounter = 10
const roleData = [
  { id: 1, name: 'ROOT', cnName: '超级管理员', type: 1, status: 1, remark: '最高权限角色' },
  { id: 2, name: 'ADMIN', cnName: '系统管理员', type: 1, status: 1, remark: '系统管理' },
  { id: 3, name: 'USER', cnName: '普通用户', type: 1, status: 1, remark: '普通用户' },
  { id: 4, name: 'EXTERNAL', cnName: '外部用户', type: 2, status: 1, remark: '外部用户角色' }
]

let userIdCounter = 10
const userData = [
  { id: 1, userName: 'admin', nickName: '管理员', deptName: '技术部', phone: '13800000001', email: 'admin@crm.com', status: 1, roleName: '超级管理员', createTime: '2024-01-01 00:00:00' },
  { id: 2, userName: 'zhangsan', nickName: '张三', deptName: '技术部', phone: '13800000002', email: 'zhangsan@crm.com', status: 1, roleName: '普通用户', createTime: '2024-01-02 00:00:00' },
  { id: 3, userName: 'lisi', nickName: '李四', deptName: '市场部', phone: '13800000003', email: 'lisi@crm.com', status: 1, roleName: '普通用户', createTime: '2024-01-03 00:00:00' }
]

// Permission / resource list
const resourceData = [
  { id: 1, name: '系统管理', perm: '', type: 'CATALOG', children: [
    { id: 2, name: '字典管理', perm: 'system:dict:list', type: 'MENU', children: [
      { id: 7, name: '新增字典', perm: 'system:dict:add', type: 'BUTTON' },
      { id: 8, name: '删除字典', perm: 'system:dict:delete', type: 'BUTTON' }
    ]},
    { id: 3, name: '菜单管理', perm: 'system:menu:list', type: 'MENU' },
    { id: 4, name: '组织管理', perm: 'system:org:list', type: 'MENU' },
    { id: 5, name: '角色管理', perm: 'system:role:list', type: 'MENU' },
    { id: 6, name: '用户管理', perm: 'system:user:list', type: 'MENU' }
  ]}
]

export default [
  // ============ Dict ============
  {
    url: '/api/system/dict/list',
    method: 'get',
    response: () => ({ code: 200, data: dictData, message: 'success' })
  },
  {
    url: '/api/system/dict/data',
    method: 'get',
    response: ({ query }) => {
      const items = dictData[query.dictType] || []
      return { code: 200, data: { records: items, total: items.length }, message: 'success' }
    }
  },

  // ============ Menu ============
  {
    url: '/api/system/menu/list',
    method: 'get',
    response: ({ query }) => {
      let list = menuData
      if (query && query.keyword) {
        list = JSON.parse(JSON.stringify(menuData))
        // simple filter
      }
      return { code: 200, data: list, message: 'success' }
    }
  },
  {
    url: '/api/system/menu/detail',
    method: 'get',
    response: ({ query }) => {
      function findMenu(list, id) {
        for (const item of list) {
          if (item.id === Number(id)) return item
          if (item.children) {
            const found = findMenu(item.children, id)
            if (found) return found
          }
        }
        return null
      }
      const menu = findMenu(menuData, query.id)
      return { code: 200, data: menu || {}, message: 'success' }
    }
  },
  {
    url: '/api/system/menu/save',
    method: 'post',
    response: ({ body }) => {
      menuIdCounter++
      const newMenu = { ...body, id: menuIdCounter, children: [] }
      function addToParent(list) {
        for (const item of list) {
          if (item.id === Number(body.parentId)) {
            item.children = item.children || []
            item.children.push(newMenu)
            return true
          }
          if (item.children && addToParent(item.children)) return true
        }
        return false
      }
      if (!addToParent(menuData)) {
        menuData.push(newMenu)
      }
      return { code: 200, data: null, message: '新增成功' }
    }
  },
  {
    url: '/api/system/menu/update',
    method: 'post',
    response: ({ body }) => {
      function updateMenu(list) {
        for (const item of list) {
          if (item.id === Number(body.id)) {
            Object.assign(item, body)
            return true
          }
          if (item.children && updateMenu(item.children)) return true
        }
        return false
      }
      updateMenu(menuData)
      return { code: 200, data: null, message: '修改成功' }
    }
  },
  {
    url: '/api/system/menu/delete',
    method: 'delete',
    response: ({ query }) => {
      function removeMenu(list) {
        for (let i = list.length - 1; i >= 0; i--) {
          if (list[i].id === Number(query.id)) {
            list.splice(i, 1)
            return true
          }
          if (list[i].children && removeMenu(list[i].children)) return true
        }
        return false
      }
      removeMenu(menuData)
      return { code: 200, data: null, message: '删除成功' }
    }
  },

  // ============ Org ============
  {
    url: '/api/system/org/list',
    method: 'get',
    response: () => ({ code: 200, data: orgData, message: 'success' })
  },
  {
    url: '/api/system/dept/save',
    method: 'post',
    response: ({ body }) => {
      deptIdCounter++
      orgData.push({ id: deptIdCounter, ...body, postList: [] })
      return { code: 200, data: null, message: '新增成功' }
    }
  },
  {
    url: '/api/system/dept/update',
    method: 'post',
    response: ({ body }) => {
      const dept = orgData.find(d => d.id === Number(body.id))
      if (dept) Object.assign(dept, body)
      return { code: 200, data: null, message: '修改成功' }
    }
  },
  {
    url: '/api/system/dept/delete',
    method: 'delete',
    response: ({ query }) => {
      const idx = orgData.findIndex(d => d.id === Number(query.id))
      if (idx > -1) orgData.splice(idx, 1)
      return { code: 200, data: null, message: '删除成功' }
    }
  },
  {
    url: '/api/system/post/save',
    method: 'post',
    response: ({ body }) => {
      postIdCounter++
      const dept = orgData.find(d => d.id === Number(body.deptId))
      if (dept) {
        dept.postList = dept.postList || []
        dept.postList.push({ id: postIdCounter, postName: body.name, deptId: Number(body.deptId) })
      }
      return { code: 200, data: null, message: '新增成功' }
    }
  },
  {
    url: '/api/system/post/update',
    method: 'post',
    response: ({ body }) => {
      for (const dept of orgData) {
        const post = dept.postList.find(p => p.id === Number(body.id))
        if (post) { post.postName = body.name; break }
      }
      return { code: 200, data: null, message: '修改成功' }
    }
  },
  {
    url: '/api/system/post/delete',
    method: 'delete',
    response: ({ query }) => {
      for (const dept of orgData) {
        const idx = dept.postList.findIndex(p => p.id === Number(query.id))
        if (idx > -1) { dept.postList.splice(idx, 1); break }
      }
      return { code: 200, data: null, message: '删除成功' }
    }
  },

  // ============ Role ============
  {
    url: '/api/system/role/list',
    method: 'get',
    response: ({ query }) => {
      let list = roleData
      if (query && query.roleType) {
        list = roleData.filter(r => r.type === Number(query.roleType))
      }
      return { code: 200, data: { records: list, total: list.length }, message: 'success' }
    }
  },
  {
    url: '/api/system/role/save',
    method: 'post',
    response: ({ body }) => {
      roleIdCounter++
      roleData.push({ id: roleIdCounter, ...body, status: 1 })
      return { code: 200, data: null, message: '新增成功' }
    }
  },
  {
    url: '/api/system/role/update',
    method: 'post',
    response: ({ body }) => {
      const role = roleData.find(r => r.id === Number(body.id))
      if (role) Object.assign(role, body)
      return { code: 200, data: null, message: '修改成功' }
    }
  },
  {
    url: '/api/system/role/delete',
    method: 'delete',
    response: ({ query }) => {
      const idx = roleData.findIndex(r => r.id === Number(query.id))
      if (idx > -1) roleData.splice(idx, 1)
      return { code: 200, data: null, message: '删除成功' }
    }
  },

  // ============ User ============
  {
    url: '/api/system/user/list',
    method: 'get',
    response: ({ query }) => {
      let list = [...userData]
      if (query && query.keyword) {
        list = list.filter(u => u.userName.includes(query.keyword) || u.nickName.includes(query.keyword))
      }
      return { code: 200, data: { records: list, total: list.length }, message: 'success' }
    }
  },
  {
    url: '/api/system/user/save',
    method: 'post',
    response: ({ body }) => {
      userIdCounter++
      userData.push({ id: userIdCounter, ...body, createTime: new Date().toISOString().slice(0, 19).replace('T', ' ') })
      return { code: 200, data: null, message: '新增成功' }
    }
  },
  {
    url: '/api/system/user/update',
    method: 'post',
    response: ({ body }) => {
      const user = userData.find(u => u.id === Number(body.id))
      if (user) Object.assign(user, body)
      return { code: 200, data: null, message: '修改成功' }
    }
  },
  {
    url: '/api/system/user/delete',
    method: 'delete',
    response: ({ query }) => {
      const idx = userData.findIndex(u => u.id === Number(query.id))
      if (idx > -1) userData.splice(idx, 1)
      return { code: 200, data: null, message: '删除成功' }
    }
  },

  // ============ Permission / Resources ============
  {
    url: '/api/system/resources',
    method: 'get',
    response: () => ({ code: 200, data: resourceData, message: 'success' })
  },
  {
    url: '/api/system/role/menus',
    method: 'get',
    response: ({ query }) => {
      const role = roleData.find(r => r.id === Number(query.roleId))
      const menuIds = role ? [1, 2, 3, 6] : []
      return { code: 200, data: menuIds, message: 'success' }
    }
  },
  {
    url: '/api/system/role/distributeMenu',
    method: 'post',
    response: () => ({ code: 200, data: null, message: '分配成功' })
  }
]
