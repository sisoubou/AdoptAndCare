<script setup>
import AnimalCard from './AnimalCard.vue'
import SearchBar from './SearchBar.vue'
import { ref, computed, onMounted } from 'vue'
import { useAnimalsStore } from '@/stores/animals.store'

const animalStore = useAnimalsStore()
const searchQuery = ref('')
const selectedType = ref('all')
const showFavorites = ref(false)

onMounted(async () => {
  if (animalStore.listAnimals.length === 0) {
    await animalStore.fetchAnimals()
  }
})

const handleSearch = (query) => {
    searchQuery.value = query
}

const availableTypes = computed(() => {
    const types = animalStore.listAnimals
      .map(a => Array.isArray(a.type) ? a.type[0] : a.type)
      .filter(type => type)
    return ['all', ...new Set(types)]
})

const filteredList = computed(() => {
  return animalStore.listAnimals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = selectedType.value === 'all' || animal.type === selectedType.value
    const matchesFavorite = !showFavorites.value || animalStore.isFavorite(animal.id)
    return matchesSearch && matchesType && matchesFavorite
  })
})

</script>

<template>
    <div class="max-w-7xl mx-auto p-6">
        <header class="mb-12 text-center">
            <h1 class="page-title mb-6">
                Le Refuge 2.0
            </h1>
        </header>
        
        <div class="flex flex-col md:flex-row gap-10">
            <aside class="w-full md:w-1/4">
                <div class="win-window sticky top-20">
                    <div class="bg-[#000080] text-white px-2 py-1 font-bold text-[10px] flex justify-between items-center uppercase">
                        <span>Control_Panel.cpl</span>
                        <span>X</span>
                    </div>
                    <div class="p-4 flex flex-col gap-6">
                        <div>
                            <label class="text-[10px] font-mono font-black uppercase mb-1 block">Find_Name</label>
                            <input @input="(e) => handleSearch(e.target.value)" 
                                class="win-inset w-full p-2 text-sm" placeholder="Taper..." />
                        </div>

                        <div>
                            <label class="text-[10px] font-mono font-black uppercase mb-1 block">Filter_Type</label>
                            <select v-model="selectedType" class="win-inset w-full p-2 text-sm cursor-pointer">
                                <option v-for="type in availableTypes" :key="type" :value="type">
                                    {{ type.toUpperCase() }}
                                </option>
                            </select>
                        </div>

                        <label class="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" v-model="showFavorites" class="hidden" />
                            <div class="w-5 h-5 win-inset flex items-center justify-center text-xs" :class="{'bg-[var(--win-blue)] text-white': showFavorites}">
                                {{ showFavorites ? 'X' : '' }}
                            </div>
                            <span class="text-[10px] font-black uppercase">Favorites_Only</span>
                        </label>

                        <div class="win-inset bg-black text-[var(--win-green)] p-2 font-mono text-[10px]">
                            >> MEMORY_COUNT: {{ filteredList.length }} ITEMS_LOADED
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