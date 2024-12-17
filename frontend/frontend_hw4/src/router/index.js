import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddPost from '../views/AddPost.vue'
import SignUp from '@/views/SignUp.vue'
import LoginPage from '../views/LoginPage.vue';
import ContactUs from '@/views/ContactUs.vue';
import auth from '@/auth';
import UpdatePostView from "../views/UpdatePostView"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: async(to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
          next('/login')
      } else {
          next();
      }
  }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignUp
  },
  {
    path: '/add-post',
    name: 'AddPost',
    component: AddPost,
    beforeEnter: async(to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
          next('/login')
      } else {
          next();
      }
  }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  { path: '/contact', 
    name: 'contact', 
    component: ContactUs },
  {
    path: "/UpdatePostView/:id",
    name: "UpdatePostView",
    component: UpdatePostView,
    beforeEnter: async(to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
          next('/login')
      } else {
          next();
      }
    }
  }

]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router