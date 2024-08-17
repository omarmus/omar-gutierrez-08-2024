import { createWebHistory, createRouter } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import TeamPage from '../pages/TeamPage.vue'
import TeamPokePage from '../pages/TeamPokePage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/team', component: TeamPage },
  { path: '/team/:id', component: TeamPokePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
