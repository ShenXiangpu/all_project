export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      if (username === 'admin' && password === 'admin123') {
        return {
          code: 200,
          data: { token: 'mock-token-' + Date.now() },
          message: '登录成功'
        }
      }
      return {
        code: 401,
        message: '用户名或密码错误'
      }
    }
  },
  {
    url: '/api/user/info',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          name: 'Admin',
          avatar: '',
          roles: ['admin'],
          userId: 1
        },
        message: 'success'
      }
    }
  }
]
