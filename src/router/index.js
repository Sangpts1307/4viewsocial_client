import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/components/auth/Login.vue'
import Signup from '@/components/auth/Signup.vue'
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
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Signup,

    },
    {
      path: '/sidebar',
      name: 'sidebar',
      component: SidebarComponent
    }
    
  ],
})

export default router
