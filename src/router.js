import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'
import search from './components/search'
import musicList from './components/musicList'
import musicPlayer from './components/musicPlayer'
import songSheetDetail from './components/songSheetDetail'
import login from './views/login'
import rank from './views/rank'
import localfun from './views/localfun'
import sheetground from './views/sheetground'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/localFun',
      name: 'localFun',
      component: localfun
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/musicList/:keyword',
      name: 'musicList',
      component: musicList
    },
    {
      path: '/musicPlayer/:id',
      name: 'musicPlayer',
      component: musicPlayer,
      props: true
    },
    {
      path: '/songSheet/:id',
      name: 'songSheet',
      component: songSheetDetail,
      props: true
    },
    {
      path: '/sheetground',
      name: 'sheetground',
      component: sheetground
    }
  ]
})
