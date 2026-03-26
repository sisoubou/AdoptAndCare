import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {path: '/', name: 'home', component: () => import('@/views/HomeView.vue')},
    {path: '/animals', name: 'animals', component: () => import('@/views/AnimalsView.vue')},
    {path: '/animals/:id', name: 'animal-detail', component: () => import('@/views/AnimalDetailView.vue'), children: [
        {path:'', name:'animal-info', component: () => import('@/components/animals/AnimalInfo.vue')},
        {path:'contact', name:'animal-contact', component: () => import('@/components/animals/AnimalContact.vue')},
    ]},
    {path: '/add-animal', name: 'add-animal', component: () => import('@/views/AddAnimalView.vue')},
    {path: '/about', name: 'about', component: () => import('@/views/AboutView.vue')},
    {path: '/:pathMatch(.*)*', name: 'not-found', component: { template: '<p>Page non trouvé !<p>'}},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router