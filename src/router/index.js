import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import ITcompanies from '../views/IT-companies.vue'
import ITspecialists from '../views/IT-specialists.vue'
import Vacancies from '../views/Vacancies.vue'
// import store from '../store/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/vacancies',
      name: 'Vacancies',
      component: Vacancies,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/vacancies',
      name: 'IT-specialists',
      component: ITspecialists,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/it-companies',
      name: 'IT-companies',
      component: ITcompanies,
      meta: {
        authRequired: true
      }
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.authRequired)) {
//     if (!store.state.user) {
//       next({
//         path: '/login',
//         query: { redirect: '/profile' }
//       })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router
