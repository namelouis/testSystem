import Vue from 'vue'
import Router from 'vue-router'
const login = resolve => require(['../login.vue'],resolve)
const index = resolve => require(['../index.vue'],resolve)
const upLoadTest = resolve => require(['../upLoadTest.vue'], resolve)
const selectTest = resolve => require(['../selectTest.vue'],resolve)
const doTest = resolve => require(['../doTest.vue'],resolve)
const myTest = resolve => require(['../myTest.vue'], resolve)
const updateTest = resolve =>require(['../updateTest.vue'],resolve)
const judgeTestList = resolve => require(['../judgeTestList.vue'], resolve)
const judgeTest = resolve => require(['../judgeTest.vue'], resolve)
const setUser = resolve => require(['../setUser.vue'], resolve)

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
    {
      path: '/updateTest',
      name: 'updateTest',
      component: updateTest,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/judgeTestList',
      name: 'judgeTestList',
      component: judgeTestList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/judgeTest',
      name: 'judgeTest',
      component: judgeTest,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/setUser',
      name: 'setUser',
      component: setUser,
      meta: {
        keepAlive: true
      }
    },
  ]
})
