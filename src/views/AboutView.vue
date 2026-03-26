<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const breeds = ref([])
const selectedSpecies = ref('cats')
const isLoading = ref(false)

const fetchBreeds = async () => {
    isLoading.value = true
    breeds.value = []
    
    try {
        const baseUrl = selectedSpecies.value === 'cats' 
            ? 'https://api.thecatapi.com/v1/breeds' 
            : 'https://api.thedogapi.com/v1/breeds'
        
        const response = await axios.get(baseUrl, {
            params: { limit: 12 }
        })
        
        breeds.value = response.data
    } catch (error) {
        console.error("Erreur lors de la récupération des races :", error)
    } finally {
        isLoading.value = false
    }
}

const changeSpecies = (species) => {
    selectedSpecies.value = species
    fetchBreeds()
}

onMounted(() => {
    fetchBreeds()
})
</script>

<template>
  <div class="max-w-7xl mx-auto p-6 mt-6">
    <h1 class="text-4xl font-extrabold text-center text-gray-900 mb-10">Encyclopédie des Races</h1>
    
    <div class="flex justify-center gap-6 mb-10">
        <button 
            @click="changeSpecies('cats')" 
            :class="selectedSpecies === 'cats' ? 'bg-pink-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'" 
            class="px-8 py-3 rounded-full font-bold transition">
            🐱 Voir les Chats
        </button>
        <button 
            @click="changeSpecies('dogs')" 
            :class="selectedSpecies === 'dogs' ? 'bg-pink-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'" 
            class="px-8 py-3 rounded-full font-bold transition">
            🐶 Voir les Chiens
        </button>
    </div>

    <div v-if="isLoading" class="text-center text-gray-500 text-xl py-10">
        Chargement des informations en cours...
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="breed in breeds" :key="breed.id" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:-translate-y-1 hover:shadow-lg transition">
            <img v-if="breed.image?.url" :src="breed.image.url" class="w-full h-56 object-cover rounded-xl mb-4" />
            <div v-else class="w-full h-56 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-400">Pas de photo</div>
            
            <h2 class="text-2xl font-bold text-gray-800 mb-1">{{ breed.name }}</h2>
            <p class="text-sm font-semibold text-pink-500 mb-3">📍 Origine : {{ breed.origin || 'Inconnue' }}</p>
            
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                {{ breed.description ? breed.description : 'Aucune description disponible pour cette race, mais elle est très mignonne !' }}
            </p>
            
            <div class="flex flex-wrap gap-2 mt-4 border-t pt-4 border-gray-100">
                <span v-for="temp in (breed.temperament ? breed.temperament.split(',') : []).slice(0, 3)" :key="temp" class="bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-xs font-medium border border-pink-100">
                    {{ temp.trim() }}
                </span>
            </div>
        </div>
    </div>
  </div>
</template>