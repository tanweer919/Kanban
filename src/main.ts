import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './assets/styles/app.css'
import KanbanBoard from './components/KanbanBoard.vue'
import HomeComponent from './components/HomeComponent.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {path: '/', component: HomeComponent},
  { path: '/board', component: KanbanBoard },
  // { path: '/about', component: About },
]


const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})


createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')
