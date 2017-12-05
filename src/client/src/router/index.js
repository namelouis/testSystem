import Vue from 'vue'
import Router from 'vue-router'
const login = resolve => require(['../login.vue'],resolve)
const index = resolve => require(['../index.vue'],resolve)
const upLoadTest = resolve => require(['../upLoadTest.vue'], resolve)
const selectTest = resolve => require(['../selectTest.vue'],resolve)
const doTest = resolve => require(['../doTest.vue'],resolve)
const myTest = resolve => require(['../myTest.vue'], resolve)

// import login from '../login.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component:login,
      meta:{
        keepAlive:true
      }
    },
    {
      path:'/index',
      name:'index',
      component:index,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/upLoadTest',
      name: 'upLoadTest',
      component: upLoadTest,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/selectTest',
      name: 'selectTest',
      component: selectTest,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/doTest',
      name: 'doTest',
      component: doTest,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/myTest',
      name: 'myTest',
      component: myTest,
      meta: {
        keepAlive: true
      }
    },
  ]
})
