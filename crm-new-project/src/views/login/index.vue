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

</style>
