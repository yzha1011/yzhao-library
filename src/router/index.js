import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView'
import AboutView from '../views/AboutView'
import LoginView from '@/views/LoginView'
import RedirectionView from '@/views/RedirectionView.vue'
import { auth } from '../utils/Auth'

const {isAuthenticated} = auth()

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/redirect',
    name: 'Redirection',
    component: RedirectionView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'About' && isAuthenticated.value !== true) {
    // alert("you need login first");
    next({ name: "Redirection" }); 
  } else {
    next(); 
  }
});

export default router
