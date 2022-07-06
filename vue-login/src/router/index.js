import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/Login.vue'
import HomeView from '../views/Home.vue'
import AdminView from '../views/Admin.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'login' },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView
  }
]

const router = new VueRouter({
  routes
})
// //   next() 放行 next('/login') 强制跳转
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//       // 获取token
//   const token = window.sessionStorage.getItem('logon')
//   console.log(token);
//   // if (!token) return next('/login')
//   // next()
// })

export default router
