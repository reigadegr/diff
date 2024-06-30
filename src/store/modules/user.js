import { defineStore } from 'pinia'
import { setToken, removeToken } from '@/utils/auth'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    name: null,
    token: null,
  })
  const isLogin = computed(() => !!user.value.token)
  const login = (data) => {
    user.value.name = data.name
    user.value.token = data.token
    setToken(data.token)
  }
  const logout = () => {
    user.value.name = null
    user.value.token = null
    removeToken()
  }
  return { user, isLogin, login, logout }
}, {
  persist: true,//持久化
})
