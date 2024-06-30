<template>
  <div flex justify-center items-center class="h100%">
    <van-button type="primary" @click="login">{{ t('loginBtn') }}</van-button>
  </div>
</template>
<script setup>
const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()
const login = () => {
  userStore.login({
    name: '管理员',
    token: 'admin-token'
  })
  router.push('/')
}
</script>
