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
        <header class="mb-12 text-center">
            <h1 class="text-6xl font-black uppercase italic tracking-tighter inline-block bg-black text-white px-4 py-2 shadow-[8px_8px_0px_#4ade80]">
                Le Refuge 2.0
            </h1>
        </header>
        
        <div class="flex flex-col md:flex-row gap-10">
            <aside class="w-full md:w-1/4">
                <div class="win98-window bg-[#c0c0c0] p-1 border-2 border-black shadow-[4px_4px_0px_#000]">
                    <div class="bg-[#000080] text-white px-2 py-1 font-bold text-xs flex justify-between uppercase">
                        <span>Filtres</span>
                        <span>? X</span>
                    </div>
                    <div class="p-4">
                        <SearchBar @search="handleSearch" />
                        <div class="mt-4 p-2 border-2 border-black border-inset bg-white text-xs font-mono">
                            Total_Items: {{ filteredList.length }}
                        </div>
                    </div>
                </div>
            </aside>

            <main class="w-full md:w-3/4">
                <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <li v-for="animal in filteredList" :key="animal.id">
                        <router-link :to="{ name: 'animal-detail', params: { id: animal.id }}">
                            <AnimalCard :animal="animal"></AnimalCard>
                        </router-link>
                    </li>
                </ul>
            </main>
        </div>
    </div>
</template>