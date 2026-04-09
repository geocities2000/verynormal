import {createWebHistory, createRouter} from 'vue-router'
import Home from './pages/Home.vue'
import Apps from './pages/Apps.vue'

import Timer from './components/Timer.vue'
import Zen from './components/Zen.vue'

const routes = [
    { path: '/', component: Home},
    { path: '/a', component: Apps, 
      children: [
        {
          path: 'timer',
          component: Timer,
        },
        {
          path: 'zen',
          component: Zen,
        }
      ]
    }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})