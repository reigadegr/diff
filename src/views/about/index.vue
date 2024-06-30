<template>
  <div flex justify-center items-center class="h100%"> <van-button type="primary" @click="logout">{{ t('logoutBtn')
      }}</van-button>
  </div>
</template>
<script setup name="about">
const userStore = useUserStore()
const { t } = useI18n()
const router = useRouter()
const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>
