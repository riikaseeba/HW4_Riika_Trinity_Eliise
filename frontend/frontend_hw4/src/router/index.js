import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddPost from '../views/AddPost.vue'
import SignUp from '@/views/SignUp.vue'
import LoginPage from '../views/LoginPage.vue';
import ContactUs from '@/views/ContactUs.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/AddPost',
    name: 'AddPost',
    component: AddPost
  },
  {
    path: '/signup',
    name: 'sugnup',
    component: SignUp
  },
  {
    path: '/AddPost',
    name: 'AddPost',
    // route level code-splitting
    // this generates a separate chunk (AddPost.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "AddPost" */ '../views/AddPost.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  { path: '/contact', 
    name: 'contact', 
    component: ContactUs },

]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router