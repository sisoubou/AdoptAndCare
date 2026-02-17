<script setup>
import AnimalCard from './AnimalCard.vue'
import { ref, computed, onMounted } from 'vue'
import { useAnimalsStore } from '@/stores/animals.store'

const animalStore = useAnimalsStore()
const searchQuery = ref('')

onMounted(async () => {
  if (animalStore.listAnimals.length === 0) {
    await animalStore.fetchAnimals()
  }
})

const filteredList = computed(() => {
  return animalStore.listAnimals.filter(animal => {
    return animal.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})
</script>

<template>
  <div class="container">
    <h1>Animaux</h1>
    
    <div class="search-box">
        <input v-model="searchQuery" placeholder="Rechercher un chat..." />
    </div>

    <ul>
        <li v-for="animal in filteredList" :key="animal.id">
            <router-link :to="{ name: 'animal-detail', params: { id: animal.id }}" class="card-link">
                <AnimalCard :animal="animal"></AnimalCard>
            </router-link>
        </li>
    </ul>
  </div>
</template>

<style scoped>
    .container {
        padding: 20px;
    }
    .card-link { 
        text-decoration: none; 
        display: block; }
    h1 {
        text-align: center;
        color: rgb(255, 255, 255); 
        font-size: 3rem;
        margin-top: 1rem;
    }
    .search-box {
        text-align: center;
        margin-bottom: 20px;
    }
    input {
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }
    ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 50px;
        padding: 10px;
    }
</style>