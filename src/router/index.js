import { createRouter, createWebHistory } from 'vue-router'
import Authentication from '@/services/auth'

const routes = [
  {
    path: '/',
    redirect: "/dashboard",
    meta: {},
  },
  {
    path: "/dashboard",
    meta: {
      requiresAuth: true,
      layout: "ui",
    },
    component: () => import("@/views/DashBoard.vue"),
  },
  {
    path: "/device",
    meta: {
      requiresAuth: true,
      layout: "ui",
    },
    component: () => import("@/views/DeviceConfiguration.vue"),
  },
  {
    path: "/database",
    meta: {
      requiresAuth: true,
      layout: "ui",
    },
    component: () => import("@/views/DatabaseConfiguration.vue"),
  },
  {
    path: "/account",
    meta: {
      requiresAuth: true,
      layout: "ui",
    },
    component: () => import("@/views/MyAccount.vue"),
  },
  {
    path: "/configuration",
    meta: {
      requiresAuth: true,
      layout: "ui",
    },
    component: () => import("@/views/PageConfiguration.vue"),
  },
  {
    path: "/help",
    meta: {
      requiresAuth: true,
      layout: "ui",
    },
    component: () => import("@/views/HelpMenu.vue"),
  },
  {
    path: '/login',
    meta: {
      layout: "auth",
    },
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: '/signup',
    meta: {
      layout: "auth",
    },
    component: () => import("@/views/SignUpPage.vue"),
  },
  {
    path: '/resetpassword',
    meta: {
      layout: "auth",
    },
    component: () => import("@/views/SendPasswordResetEmail.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  const authenticated = Authentication.isAuthenticated()

  if (requiresAuth && !authenticated) {
    next('/login')
  }
  else next()
})

export default router
