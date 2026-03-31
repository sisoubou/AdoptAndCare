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
  <div class="max-w-7xl mx-auto p-6">
    <div class="flex justify-center gap-6 mb-10">
      <button @click="selectedSpecies = 'cats'; fetchBreeds()" 
        class="neo-brutalism px-10 py-4 font-black text-xl italic"
        :class="selectedSpecies === 'cats' ? 'bg-yellow-400 -translate-y-1' : 'bg-white'">
        CHATS
      </button>
      <button @click="selectedSpecies = 'dogs'; fetchBreeds()" 
        class="neo-brutalism px-10 py-4 font-black text-xl italic"
        :class="selectedSpecies === 'dogs' ? 'bg-yellow-400 -translate-y-1' : 'bg-white'">
        CHIENS
      </button>
    </div>

    <div class="relative mb-12">
      <input v-model="searchQuery" placeholder="Rechercher une race dans la base de données..." 
        class="neo-brutalism w-full p-6 text-2xl bg-white outline-none focus:bg-cyan-100" />
      <span class="absolute right-6 top-6 text-2xl">敵</span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      <router-link v-for="breed in filteredBreeds" :key="breed.id" 
        :to="{ name: 'breed-detail', params: { species: selectedSpecies, id: breed.id }}"
        class="neo-brutalism bg-white group overflow-hidden">
        
        <div class="relative h-64 overflow-hidden border-b-3 border-black">
          <img :src="breed.imageUrl" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
          <div class="absolute top-4 left-4 bg-black text-white text-[10px] px-2 py-1 font-black uppercase">
            ID: {{ breed.id }}
          </div>
        </div>

        <div class="p-6 bg-white group-hover:bg-pink-100 transition-colors">
          <h3 class="font-black text-3xl uppercase italic mb-3 tracking-tighter">{{ breed.name }}</h3>
          <p class="text-sm font-bold font-mono line-clamp-3 text-gray-700 leading-tight">
            {{ breed.temperament }}
          </p>
          <div class="mt-6 flex justify-between items-center border-t-2 border-black pt-4">
            <span class="text-xs font-black underline">VOIR FICHE.EXE</span>
            <span class="text-xl">棲</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>