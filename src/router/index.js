import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView'
import AboutView from '../views/AboutView'
import LoginView from '@/views/LoginView'
import RedirectionView from '@/views/RedirectionView.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import AdminView from '@/views/AdminView.vue'
import AddBookView from '@/views/AddBookView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
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
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },{
    path: '/Admin',
    name: 'Admin',
    component: AdminView
  },{
    path: '/AddBook',
    name: 'AddBook',
    component: AddBookView
  }, {
    path: "/GetBookCount",
    name: "GetBookCount",
    component: GetBookCountView
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
