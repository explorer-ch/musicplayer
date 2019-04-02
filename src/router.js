import Vue from 'vue'
import Router from 'vue-router'
import home from './components/home'
import search from './components/search'
import musicList from './components/musicList'
import musicPlayer from './components/musicPlayer'
import songSheetDetail from './components/songSheetDetail'
import login from './views/login'
import rank from './views/rank'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/login',
      name: 'login',
      component: login
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
    }
  ]
})
