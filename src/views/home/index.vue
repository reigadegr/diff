<script setup>
import { t, locale } from "@/locales";
const list = ref([
  "home.details.vue3",
  "home.details.javascript",
  "home.details.vant",
  "home.details.unocss",
  "home.details.pinia",
  "home.details.darkmode",
  "home.details.i18n",
  "home.details.router",
  "home.details.autoImport",
  "home.details.icon",
  "home.details.rem",
  "home.details.axios",
  "home.details.mock",
  "home.details.loading",
  "home.details.vconsole",
  "home.details.gzip"
])
</script>

<template>
  <div class="home-page p2">
    <img block w14 mx-auto mb2 alt="Vue logo" src="~@/assets/logo/logo_melomini.png" />
    <div pl-1 border-l-3px border-solid class="color-[--van-text-color] border-#41b883">
      <a flex items-center href="https://github.com/yulimchen/vue3-h5-template" target="_blank">
        <svg-icon text-20px mr-8px name="github" />
        <h3 font-bold text-18px my-4px>vue3-h5-template</h3>
        <svg-icon text-12px ml-5px name="link" />
      </a>
    </div>
    <div text-14px py-2px px-10px rounded-4px mt-14px class="bg-[--color-block-background] ">
      <p my-14px leading-24px class="color-[--van-text-color]">
        🌱 {{ t('home.description') }}
      </p>
    </div>
    <div mt-14px>
      <van-cell v-for="(item, idx) in list" :key="idx" :title="t(item)" />
    </div>
  </div>
</template>
