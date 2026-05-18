# crm-new-project Login Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a Vue 3 + Vite project `crm-new-project` with a login page using Naive UI and mock data.

**Architecture:** Single-page app with Pinia state management, Vue Router 4 hash-mode routing, Axios HTTP layer, and vite-plugin-mock for API simulation. Login authenticates against hardcoded mock credentials, stores token in localStorage, and redirects to home.

**Tech Stack:** Vue 3, Vite, Naive UI, Pinia, Vue Router 4, Axios, vite-plugin-mock + mockjs, crypto-js

---

## File Structure

```
crm-new-project/            (already exists with docs/)
├── index.html
├── package.json
├── vite.config.js
├── mock/
│   └── user.js
└── src/
    ├── main.js
    ├── App.vue
    ├── api/
    │   └── user.js
    ├── router/
    │   └── index.js
    ├── store/
    │   └── user.js
    ├── utils/
    │   └── request.js
    └── views/
        └── login/
            └── index.vue
```

---

### Task 1: Scaffold project files (package.json, vite.config.js, index.html)

**Files:**
- Create: `crm-new-project/package.json`
- Create: `crm-new-project/vite.config.js`
- Create: `crm-new-project/index.html`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "crm-new-project",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.3.0",
    "pinia": "^2.1.0",
    "naive-ui": "^2.38.0",
    "axios": "^1.6.0",
    "crypto-js": "^4.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.4.0",
    "vite-plugin-mock": "^2.9.6",
    "mockjs": "^1.1.0"
  }
}
```

- [ ] **Step 2: Create vite.config.js**

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'mock',
      enable: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000
  }
})
```

- [ ] **Step 3: Create index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CRM 管理系统</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

- [ ] **Step 4: Create directory structure**

Run: `mkdir -p crm-new-project/src/{api,router,store,utils,views/login} crm-new-project/mock`

- [ ] **Step 5: Commit**

```bash
git add crm-new-project/package.json crm-new-project/vite.config.js crm-new-project/index.html
git commit -m "chore: scaffold project with Vite + Vue 3"
```

---

### Task 2: Create Axios request utility

**Files:**
- Create: `crm-new-project/src/utils/request.js`

- [ ] **Step 1: Create request.js**

The interceptor unwraps the mock response envelope `{ code, data, message }`. On success (code=200), it returns the inner `data` field directly, so callers get the unwrapped payload (e.g., `{ token: 'xxx' }`).

```js
import axios from 'axios'
import { useUserStore } from '@/store/user'

const service = axios.create({
  baseURL: '/',
  timeout: 15000
})

service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers['Auth-token'] = userStore.token
    }
    return config
  },
  (error) => Promise.reject(error)
)

service.interceptors.response.use(
  (res) => {
    const { code, data, message } = res.data
    if (code === 200) {
      return data
    }
    return Promise.reject(new Error(message || '请求失败'))
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
```

- [ ] **Step 2: Commit**

```bash
git add crm-new-project/src/utils/request.js
git commit -m "feat: add axios request module with interceptors"
```

---

### Task 3: Create mock API

**Files:**
- Create: `crm-new-project/mock/user.js`

- [ ] **Step 1: Create mock/user.js**

```js
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
```

- [ ] **Step 2: Commit**

```bash
git add crm-new-project/mock/user.js
git commit -m "feat: add mock login and user info APIs"
```

---

### Task 4: Create API layer

**Files:**
- Create: `crm-new-project/src/api/user.js`

- [ ] **Step 1: Create api/user.js**

```js
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/user/info',
    method: 'get'
  })
}
```

- [ ] **Step 2: Commit**

```bash
git add crm-new-project/src/api/user.js
git commit -m "feat: add user API layer"
```

---

### Task 5: Create Pinia user store

**Files:**
- Create: `crm-new-project/src/store/user.js`

- [ ] **Step 1: Create store/user.js**

```js
import { defineStore } from 'pinia'
import { login as loginApi, getInfo as getInfoApi } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('crm_token') || '',
    name: '',
    avatar: '',
    roles: [],
    userId: null
  }),
  actions: {
    async login(loginForm) {
      const data = await loginApi(loginForm)
      // data = { token: 'xxx' } (unwrapped by interceptor)
      this.token = data.token
      localStorage.setItem('crm_token', data.token)
    },
    async getInfo() {
      const data = await getInfoApi()
      this.name = data.name
      this.avatar = data.avatar
      this.roles = data.roles
      this.userId = data.userId
      return data
    },
    logout() {
      this.token = ''
      this.name = ''
      this.avatar = ''
      this.roles = []
      this.userId = null
      localStorage.removeItem('crm_token')
    }
  }
})
```

- [ ] **Step 2: Commit**

```bash
git add crm-new-project/src/store/user.js
git commit -m "feat: add Pinia user store with login/logout actions"
```

---

### Task 6: Create router with route guard

**Files:**
- Create: `crm-new-project/src/router/index.js`

- [ ] **Step 1: Create router/index.js**

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: { template: '<h1 style="text-align:center;margin-top:100px">欢迎进入系统</h1>' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('crm_token')
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
```

- [ ] **Step 2: Commit**

```bash
git add crm-new-project/src/router/index.js
git commit -m "feat: add router with login guard"
```

---

### Task 7: Create login page

**Files:**
- Create: `crm-new-project/src/views/login/index.vue`

- [ ] **Step 1: Create views/login/index.vue**

```vue
<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">CRM 管理系统</h2>
      <n-form
        ref="formRef"
        :model="loginForm"
        :rules="rules"
        label-placement="top"
        size="large"
      >
        <n-form-item label="用户名" path="username">
          <n-input
            v-model:value="loginForm.username"
            placeholder="请输入用户名"
            :maxlength="20"
          />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="loginForm.password"
            type="password"
            show-password-on="click"
            placeholder="请输入密码"
            :maxlength="20"
            @keyup.enter="handleLogin"
          />
        </n-form-item>
        <n-form-item>
          <n-checkbox v-model:checked="remember">记住密码</n-checkbox>
        </n-form-item>
        <n-form-item>
          <n-button
            type="primary"
            block
            :loading="loading"
            @click="handleLogin"
          >
            登 录
          </n-button>
        </n-form-item>
      </n-form>
      <div class="login-tip">测试账号: admin / admin123</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import CryptoJS from 'crypto-js'
import { useUserStore } from '@/store/user'

const router = useRouter()
const message = useMessage()
const userStore = useUserStore()

const formRef = ref(null)
const loading = ref(false)
const remember = ref(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

const SECRET_KEY = 'crm_secret_key_2024'

function encrypt(text) {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString()
}

function decrypt(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}

onMounted(() => {
  const saved = localStorage.getItem('crm_remember')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      loginForm.username = parsed.username
      loginForm.password = decrypt(parsed.password)
      remember.value = true
    } catch {
      localStorage.removeItem('crm_remember')
    }
  }
})

async function handleLogin() {
  try {
    await formRef.value?.validate()
  } catch {
    return
  }

  loading.value = true
  try {
    await userStore.login({
      username: loginForm.username,
      password: loginForm.password
    })

    if (remember.value) {
      localStorage.setItem('crm_remember', JSON.stringify({
        username: loginForm.username,
        password: encrypt(loginForm.password)
      }))
    } else {
      localStorage.removeItem('crm_remember')
    }

    message.success('登录成功')
    router.push('/')
  } catch (err) {
    message.error(err?.message || '登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  width: 400px;
  padding: 40px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.login-title {
  text-align: center;
  margin-bottom: 32px;
  color: #333;
  font-size: 24px;
}

.login-tip {
  text-align: center;
  color: #999;
  font-size: 12px;
  margin-top: 16px;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add crm-new-project/src/views/login/index.vue
git commit -m "feat: add login page with Naive UI"
```

---

### Task 8: Create App.vue and main.js entry

**Files:**
- Create: `crm-new-project/src/App.vue`
- Create: `crm-new-project/src/main.js`

- [ ] **Step 1: Create App.vue**

```vue
<template>
  <n-message-provider>
    <router-view />
  </n-message-provider>
</template>

<script setup>
import { NMessageProvider } from 'naive-ui'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  width: 100%;
}
</style>
```

- [ ] **Step 2: Create main.js**

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)

app.mount('#app')
```

- [ ] **Step 3: Commit**

```bash
git add crm-new-project/src/App.vue crm-new-project/src/main.js
git commit -m "feat: add App.vue and main.js entry"
```

---

### Task 9: Install dependencies and verify

- [ ] **Step 1: Install npm dependencies**

Run: `cd crm-new-project && npm install`
Expected: all packages install without errors

- [ ] **Step 2: Start dev server and verify**

Run: `cd crm-new-project && npx vite --port 3000`
Expected: dev server starts, open browser to http://localhost:3000, login page renders with Naive UI styling

- [ ] **Step 3: Test login flow**

1. Enter wrong credentials → verify error message appears
2. Enter `admin` / `admin123` → verify redirect to home page
3. Verify token is stored in localStorage

- [ ] **Step 4: Final commit**

```bash
git add crm-new-project/
git commit -m "feat: complete login implementation with mock data"
```
