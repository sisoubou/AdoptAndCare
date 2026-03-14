<script setup>
import AnimalCard from './AnimalCard.vue'
import SearchBar from './SearchBar.vue'
import { ref, computed, onMounted } from 'vue'
import { useAnimalsStore } from '@/stores/animals.store'

const animalStore = useAnimalsStore()
const searchQuery = ref('')

onMounted(async () => {
  if (animalStore.listAnimals.length === 0) {
    await animalStore.fetchAnimals()
  }
})

const handleSearch = (query) => {
    searchQuery.value = query
}

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
        display: block; 
    }
    h1 {
        text-align: center;
        color: rgb(0, 0, 0); 
        font-size: 3rem;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }
    .subtitle {
        text-align: center;
        color: #fbbf24;
        font-weight: bold;
        margin-bottom: 30px;
    }
    .error-box {
        background-color: #ef4444;
        color: white;
        padding: 15px;
        border-radius: 10px;
        text-align: center;
        margin: 20px auto;
        max-width: 500px;
    }
    .loading-box, .no-results {
        text-align: center;
        font-size: 1.2rem;
        color: #9ca3af;
        margin-top: 50px;
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