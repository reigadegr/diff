<script setup>
const router = useRouter()
const { t } = useI18n()
const goHome = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <div flex justify-center items-center class="h100%">
    <div flex flex-col items-center>
      <div mb-2>404</div>
      <van-button type="primary" @click="goHome">{{ t('backHomeBtn') }}</van-button>
    </div>


  </div>
</template>
