import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/app/home'
  },
  {
    path: '/app/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/app/home'
      },
      {
        path: 'home',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'groups',
        component: () => import('@/views/GroupPage.vue')
      },
      {
        path: 'feeds',
        component: () => import('@/views/FeedPage.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/SettingPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
