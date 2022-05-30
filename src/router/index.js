import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,

  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '/topicbank',
        name: 'topicbank',
        component: () => import('../views/TopicbankView.vue')
      },
      {
        path: '/htmlbank',
        name: 'htmlbank',
        component: () => import('../views/HtmlbankView.vue')
      },
      {
        path: '/jsbank',
        name: 'jsbank',
        component: () => import('../views/JsbankView.vue')
      },
      {
        path: '/personaldata',
        name: 'personaldata',
        component: () => import('../views/PersonaldataView.vue'),
      },
      {
        path: '/calendar',
        name: 'calendar',
        component: () => import('../views/CalendarView.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
      },
      {
        path: '/createtask',
        name: 'createtask',
        component: () => import('../views/CreatetaskView.vue'),
      },
      {
        path: '/userinfo',
        name: 'userinfo',
        component: () => import('../views/UserInfoView.vue'),
      },
      {
        path: '/tasklist',
        name: 'tasklist',
        component: () => import('../views/TasklistView.vue'),
      },
      {
        path: '/jurisdiction',
        name: 'jurisdiction',
        component: () => import('../views/JurisdictionView.vue'),
      },
      {
        path: '/newrole',
        name: 'newrole',
        component: () => import('../views/NewroleView.vue'),
      },
      {
        path: '/userdetails',
        name: 'userdetails',
        component: () => import('../views/UserdetailsView.vue'),
      },
      {
        path: '/taskdetails',
        name: 'taskdetails',
        component: () => import('../views/TaskdetailsView.vue'),
      },
      {
        path: '/rolegroup',
        name: 'rolegroup',
        component: () => import('../views/RoleGroupView.vue'),
      },
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
