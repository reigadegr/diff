import { createRouter, createWebHistory } from 'vue-router'
import NProgress from "@/utils/progress";
import routes from "./routes";
import { useTitle } from '@vueuse/core'
import { getToken } from '@/utils/auth'
import { pageDefaultTitle } from '@/settings';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
})

const whiteList = ['/login', '/register', '/404', '/403'];

router.beforeEach((to, from, next) => {
  NProgress.start();
  useTitle(to.meta.title || pageDefaultTitle)
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      next();
    }
  } else if (whiteList.includes(to.path)) {
    next();
  } else {
    next('/login');
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router
