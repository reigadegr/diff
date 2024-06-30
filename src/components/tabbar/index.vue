<template>
  <van-tabbar v-model="active" :placeholder="true" :route="true" fixed>
    <van-tabbar-item v-for="(item, index) in tabbarData" :key="index" :icon="item.icon" :to="item.to">
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
const { t } = useI18n();
const active = ref(0);
const tabbarData = reactive([
  {
    icon: "wap-home-o",
    title: computed(() => t("home.tabbar.home")),
    to: {
      name: "home"
    }
  },
  {
    icon: "records-o",
    title: computed(() => t("home.tabbar.tools")),
    to: {
      name: "tools"
    }
  },
  {
    icon: "user-o",
    title: computed(() => t("home.tabbar.about")),
    to: {
      name: "about"
    }
  }
]);
</script>
