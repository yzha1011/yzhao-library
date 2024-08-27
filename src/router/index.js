import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView'
import AboutView from '../views/AboutView'
import LoginView from '@/views/LoginView'
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   // Perform logic before every route change
//   if (to.name == 'About') {
//     if (isAuthenticated.value === true) {
//       next({name: "About"})
//     } else {
//       alert("you need to login first")
//       next({name: "Login"})
//     }
//   } else {
//     next();
//   }
// });
router.beforeEach((to, from, next) => {
  if (to.name === 'About' && isAuthenticated.value !== true) {
    alert("you need login first");
    next({ name: "Login" }); 
  } else {
    next(); 
  }
});

export default router
