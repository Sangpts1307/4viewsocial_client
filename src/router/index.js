import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/homepage',
      name: 'homepage',
      component: HomePage,
    },
    {
      path: '/sidebar',
      name: 'sidebar',
      component: SidebarComponent
    }
    
  ],
})

export default router
