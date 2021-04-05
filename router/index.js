import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '../views/Start.vue'
import Boot from '../views/Boot.vue'
import Running from '../views/Running.vue'
import Pad from '../views/Pad.vue'
import Padboot from '../views/Padboot.vue'
import Mobile from '../views/Mobile.vue'
import Mobileboot from '../views/Mobileboot'
import Startmobile from '../views/Startmobile'
import Startpad from '../views/Startpad'
import Restart from '../views/Restart'
import Turnoff from '../views/Turnoff'
import Padturnoff from '../views/Padturnoff'
import Mobileturnoff from '../views/Mobileturnoff'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Start',
    component: Start
  },
  {
    path: '/running',
    name: 'Running',
    component: Running
  },
  {
    path: '/boot',
    name: 'Boot',
    component: Boot
  },
  {
    path: '/pad',
    name: 'Pad',
    component: Pad
  },
  {
    path: '/padboot',
    name: 'Padboot',
    component: Padboot
  },
  {
    path: '/mobile',
    name: 'Mobile',
    component: Mobile
  },
  {
    path: '/mobileboot',
    name: 'Mobileboot',
    component: Mobileboot
  },  
  {
    path: '/startmobile',
    name: 'Startmobile',
    component: Startmobile
  },
  {
    path: '/startpad',
    name: 'Startpad',
    component: Startpad
  },
  {
    path: '/restart',
    name: 'Restart',
    component: Restart
  },
  {
    path: '/turnoff',
    name: 'Turnoff',
    component: Turnoff
  }, 
  {
    path: '/padturnoff',
    name: 'Padturnoff',
    component: Padturnoff
  },
  {
    path: '/mobileturnoff',
    name: 'Mobileturnoff',
    component: Mobileturnoff
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
