<script setup>

import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted } from 'vue';
import { useAnimalsStore } from '@/stores/animals.store';

const route = useRoute()
const router = useRouter()
const animalStore = useAnimalsStore()

const animal = computed(() =>{
    return animalStore.listAnimals.find(a => a.id == route.params.id)
})

const goBack = () => {
    router.push('/animals')
}

onMounted(async () => {
    if (animalStore.listAnimals.length === 0){
        await animalStore.fetchAnimals()
    }
})
</script>

<template>
  <div v-if="animal" class="detail-container">
    <button @click="goBack" class="back-btn">← Retour</button>
    
    <div class="content-wrapper">
        <div class="image-section">
            <img :src="animal.image" :alt="animal.name" />
        </div>

        <div class="info-section">
            <h1>{{ animal.name }}</h1>
            <span class="badge">{{ animal.type[0] }}</span>
            <p class="description">{{ animal.description }}</p>
            <button class="adopt-btn">Adopter ce chat</button>
        </div>
    </div>
  </div>

  <div v-else class="loading">
    <p>Chargement...</p>
    <button @click="goBack" class="back-btn">Retour</button>
  </div>
</template>

<style scoped>
.detail-container { 
    max-width: 900px; 
    margin: 40px auto; 
    padding: 20px; 
    color: white; 
}
.content-wrapper { 
    display: flex; 
    gap: 40px; 
    background: #27272a; 
    padding: 30px; 
    border-radius: 20px; 
}
.image-section img { 
    width: 400px; 
    height: 400px; 
    object-fit: cover; 
    border-radius: 15px; 
}
.info-section h1 { 
    font-size: 3rem; 
    color: #fbbf24; 
    margin-bottom: 10px; 
}
.description { 
    font-size: 1.1rem; 
    line-height: 1.6; 
    margin: 20px 0; 
    color: #d1d5db; 
}
.back-btn { 
    background: none; 
    border: 1px solid white; 
    color: white; 
    padding: 8px 16px; 
    border-radius: 8px; 
    cursor: pointer; 
    margin-bottom: 20px;
}
.back-btn:hover { 
    background: white; 
    color: black; 
}
.adopt-btn { 
    background: #fbbf24; 
    border: none; 
    padding: 10px 20px; 
    font-weight: bold; 
    border-radius: 8px; 
    cursor: pointer; 
    font-size: 1.1rem; 
}
.badge { 
    background: #4f46e5; 
    padding: 5px 10px; 
    border-radius: 15px; 
    font-size: 0.8rem; 
    text-transform: uppercase; 
}
</style>