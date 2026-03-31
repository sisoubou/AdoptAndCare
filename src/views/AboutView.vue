<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const breeds = ref([])
const selectedSpecies = ref('cats')
const searchQuery = ref(route.query.search || '')

const fetchBreeds = async () => {
  try {
    const url = selectedSpecies.value === 'cats' 
      ? 'https://api.thecatapi.com/v1/breeds' 
      : 'https://api.thedogapi.com/v1/breeds'
    
    const response = await axios.get(url, {
      headers: {
        'x-api-key': 'live_4KTzXfkR38ftodklW2OSwuc5BB2R7SFfE2mOXaIXm8hOOYU6Ip0T0hjqUQ61MXc9' 
      }
    })
    
    if (response.data) {
      breeds.value = response.data.map(breed => ({
        ...breed,
        imageUrl: breed.image?.url || `https://cdn2.the${selectedSpecies.value === 'cats' ? 'cat' : 'dog'}api.com/images/${breed.reference_image_id}.jpg`
      }))
    }
  } catch (error) {
    console.error("Erreur API:", error)
    breeds.value = []
  }
}

onMounted(fetchBreeds)

const filteredBreeds = computed(() => {
  return breeds.value.filter(b => 
    b.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<template>
  <div class="max-w-7xl mx-auto p-4 md:p-10">
    <div class="win-window">
      <div class="bg-[#000080] text-white p-1 flex justify-between items-center px-2 mb-4">
        <span class="font-bold text-xs uppercase font-mono">C:\SYSTEM32\ENCYCLOPEDIA_BREEDS.EXE</span>
        <div class="flex gap-1">
          <button class="win-btn-small">?</button>
          <button class="win-btn-small">X</button>
        </div>
      </div>

      <div class="p-4 bg-[#c0c0c0]">
        <div class="flex gap-2 mb-6">
          <button @click="selectedSpecies = 'cats'; fetchBreeds()" 
            class="win-button flex-1"
            :class="selectedSpecies === 'cats' ? 'bg-[var(--win-green)]' : 'bg-gray-300'">
            Felines.db
          </button>
          <button @click="selectedSpecies = 'dogs'; fetchBreeds()" 
            class="win-button flex-1"
            :class="selectedSpecies === 'dogs' ? 'bg-[var(--win-green)]' : 'bg-gray-300'">
            Canines.db
          </button>
        </div>

        <div class="mb-8">
          <label class="text-[10px] font-mono font-bold uppercase block mb-1">Search_Query_Filter</label>
          <input v-model="searchQuery" placeholder="Rechercher une race..." 
            class="win-inset w-full p-4 text-xl outline-none focus:bg-green-100" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link v-for="breed in filteredBreeds" :key="breed.id" 
            :to="{ name: 'breed-detail', params: { species: selectedSpecies, id: breed.id }}"
            class="win-window group bg-white border-2 border-black hover:translate-x-1 hover:translate-y-1 transition-transform">
            
            <div class="bg-black text-white text-[9px] p-1 font-mono flex justify-between">
              <span>REF_{{ breed.id }}</span>
              <span>[IMG]</span>
            </div>

            <div class="h-48 overflow-hidden border-b-2 border-black">
              <img :src="breed.imageUrl" class="w-full h-full object-cover transition-all" />
            </div>

            <div class="p-4 bg-white group-hover:bg-green-100">
              <h3 class="font-black text-2xl uppercase italic mb-2 tracking-tighter">{{ breed.name }}</h3>
              <p class="text-[10px] font-mono line-clamp-2 text-gray-600">{{ breed.temperament }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.win-btn-small {
    background: #c0c0c0; border: 1px solid black; color: black;
    width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; font-size: 10px;
}
</style>