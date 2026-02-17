import { createRouter, createWebHistory } from 'vue-router'
import AnimalDetailView from '@/views/AnimalDetailView.vue'
import AnimalsView from '@/views/AnimalsView.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
    {path: '/', name: 'home', component: HomeView},
    {path: '/animals', name: 'animals', component: AnimalsView},
    {path: '/animals/:id', name: 'animal-detail', component: AnimalDetailView},
    {path: '/:pathMatch(.*)*', name: 'not-found', component: { template: '<p>Page non trouvé !<p>'}},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router