<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const breeds = ref([])
const selectedSpecies = ref('cats')
const searchQuery = ref(route.query.search || '')

const fetchBreeds = async () => {
  breeds.value = []
  const url = selectedSpecies.value === 'cats' 
    ? 'https://api.thecatapi.com/v1/breeds' 
    : 'https://api.thedogapi.com/v1/breeds'
    
  try {
    const response = await axios.get(url)
    breeds.data = response.data
    breeds.value = response.data.map(breed => ({
      ...breed,
      imageUrl: breed.image?.url || `https://cdn2.the${selectedSpecies.value === 'cats' ? 'cat' : 'dog'}api.com/images/${breed.reference_image_id}.jpg`
    }))
  } catch (error) {
    console.error("Erreur API:", error)
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
  <div class="p-6">
    <div class="flex gap-4 mb-8">
      <button @click="selectedSpecies = 'cats'; fetchBreeds()" :class="selectedSpecies === 'cats' ? 'bg-yellow-400' : 'bg-white'" class="neo-brutalism px-6 py-2 font-black">CHATS</button>
      <button @click="selectedSpecies = 'dogs'; fetchBreeds()" :class="selectedSpecies === 'dogs' ? 'bg-yellow-400' : 'bg-white'" class="neo-brutalism px-6 py-2 font-black">CHIENS</button>
    </div>

    <input v-model="searchQuery" placeholder="Rechercher une race..." class="neo-brutalism w-full p-4 mb-8 text-xl" />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="breed in filteredBreeds" :key="breed.id" class="neo-brutalism bg-white p-4">
        <img :src="breed.imageUrl" @error="(e) => e.target.src = 'https://placehold.co/400?text=No+Image'" class="w-full h-48 object-cover border-2 border-black mb-4" />
        <h3 class="font-black text-2xl uppercase">{{ breed.name }}</h3>
        <p class="text-sm mt-2">{{ breed.temperament || breed.description }}</p>
      </div>
    </div>
  </div>
</template>