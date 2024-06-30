import Layout from "@/layout/index.vue";

const routes = [
  {
    path: '/',
    name: 'root',
    component: Layout,
    children: [
      {
        path: "/",
        name: "home",
        component: () => import('../views/home/index.vue'),
        meta: {
          title: "首页",
          isKeepAlive: true
        }
      },
      {
        path: "tools",
        name: "tools",
        component: () => import('../views/tools/index.vue'),
        meta: {
          title: "请求工具",
          isKeepAlive: true
        }
      },
      {
        path: "about",
        name: "about",
        component: () => import('../views/about/index.vue'),
        meta: {
          title: "关于",
          isKeepAlive: true
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: () => import('../layout/404.vue')
  },
]
export default routes;
