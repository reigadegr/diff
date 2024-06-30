<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { setLocale, locale } from '@/locales'
const userStore = useUserStore()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const toggleLocale = () => {
  setLocale(locale.value == 'en' ? 'zh-cn' : 'en')
}
</script>

<template>
  <van-nav-bar fixed placeholder >
    <template #right>
      <span>{{userStore.user.name}}</span>
      <svg-icon @click="toggleLocale()" class="text-[18px] m-1" name="i18n" />
      <svg-icon @click="toggleDark()" class="text-[18px]" :name="isDark ? 'light' : 'dark'" />
    </template>
  </van-nav-bar>
</template>

<style scoped></style>
