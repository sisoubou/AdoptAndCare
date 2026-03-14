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
  <div class="max-w-7xl mx-auto p-6">
    <h1 class="text-4xl font-extrabold text-center text-gray-800 mb-10">Nos animaux à l'adoption</h1>
    
    <div class="flex flex-col md:flex-row gap-8">
      
      <aside class="w-full md:w-1/4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-fit">
        <h2 class="text-xl font-bold text-pink-500 mb-6">Filtrer la recherche</h2>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-500 mb-2">Rechercher par nom</label>
          <input 
            v-model="searchQuery" 
            placeholder="Ex: Simba..." 
            class="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-500 mb-2">Espèce</label>
          <div class="space-y-2">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" class="w-5 h-5 accent-pink-500 rounded border-gray-300" />
              <span class="text-gray-700 font-medium">Chiens</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" class="w-5 h-5 accent-pink-500 rounded border-gray-300" />
              <span class="text-gray-700 font-medium">Chats</span>
            </label>
          </div>
        </div>
      </aside>

      <main class="w-full md:w-3/4">
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <li v-for="animal in filteredList" :key="animal.id">
            <router-link :to="{ name: 'animal-detail', params: { id: animal.id } }" class="block transition hover:-translate-y-2 hover:shadow-lg rounded-2xl">
              <AnimalCard :animal="animal"></AnimalCard>
            </router-link>
          </li>
        </ul>

        <div v-if="filteredList.length === 0" class="text-center p-10 bg-white rounded-2xl border border-gray-200 shadow-sm mt-6">
          <p class="text-gray-500 text-lg">Aucun animal ne correspond à votre recherche.</p>
        </div>
      </main>

    </div>
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
        color: rgb(0, 0, 0); 
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