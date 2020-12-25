import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/elemeter',
    children: [
      {
        path: '/elemeter',
        name: 'elemeter',
        component: () => import('../views/document/EleMeter.vue'),
      },
      {
        path: '/eleuser',
        name: 'eleuser',
        component: () => import('../views/document/Eleuser.vue'),
      },
      {
        path: '/comuser',
        name: 'comuser',
        component: () => import('../views/document/ComUser.vue'),
      },
    ],
  },
  {
    path: '/test',
    name: 'Test',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Test.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
