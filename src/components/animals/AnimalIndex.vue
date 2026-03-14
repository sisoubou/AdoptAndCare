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
    <div class="max-w-7xl mx-auto p-6">
        <h1 class="text-4xl font-extrabold text-center text-gray-900 mb-10">Nos pensionnaires</h1>
        
        <div class="flex flex-col md:flex-row gap-8">
            <aside class="w-full md:w-1/4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-fit">
                <h2 class="text-xl font-bold text-pink-500 mb-6">Filtres</h2>
                <SearchBar @search="handleSearch" />
            </aside>

            <main class="w-full md:w-3/4">
                <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <li v-for="animal in filteredList" :key="animal.id">
                        <router-link :to="{ name: 'animal-detail', params: { id: animal.id }}" class="card-link">
                            <AnimalCard :animal="animal"></AnimalCard>
                        </router-link>
                    </li>
                </ul>
            </main>
        </div>
    </div>
</template>