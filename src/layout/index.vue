<script setup>
import tabbar from "@/components/tabbar/index.vue";
import NavBar from "@/components/nav-bar/index.vue";
import { useDark } from '@vueuse/core'

const isDark = useDark();

</script>

<template>
  <div class="app-wrapper">
    <van-config-provider flex flex-col class="page h100%" :theme="isDark ? 'dark' : 'light'">
      <nav-bar />
      <div flex-1 overflow-y-auto overflow-x-hidden>
        <router-view v-slot="{ Component, route }">
          <!-- 路由缓存 -->
          <keep-alive>
            <component :is="Component" v-if="route?.meta?.isKeepAlive || route?.meta?.isRouterKeepAlive"
              :key="route?.meta?.isRouterKeepAlive ? route?.fullPath : route?.name" />
          </keep-alive>
          <component :is="Component" v-if="(!route?.meta?.isKeepAlive) && (!route?.meta?.isRouterKeepAlive)"
            :key="route.name" />
        </router-view>
      </div>
      <tabbar />
    </van-config-provider>
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
