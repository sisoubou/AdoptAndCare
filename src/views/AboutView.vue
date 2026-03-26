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
    <h1 class="text-6xl font-black text-center mb-12 uppercase italic tracking-tighter"
        style="-webkit-text-stroke: 2px black; text-shadow: 8px 8px 0px #4ade80;">
        Encyclopédie.txt
    </h1>
    
    <div class="flex justify-center gap-6 mb-16">
        <button 
            @click="changeSpecies('cats')" 
            :class="selectedSpecies === 'cats' ? 'bg-[#ccff00] translate-x-1 translate-y-1 shadow-none' : 'bg-white hover:bg-[#ccff00]'" 
            class="neo-brutalism px-10 py-4 font-black uppercase italic text-xl transition-all">
            🐱 Chats (Acid)
        </button>
        <button 
            @click="changeSpecies('dogs')" 
            :class="selectedSpecies === 'dogs' ? 'bg-[#0033ff] text-white translate-x-1 translate-y-1 shadow-none' : 'bg-white hover:bg-[#0033ff] hover:text-white'" 
            class="neo-brutalism px-10 py-4 font-black uppercase italic text-xl transition-all">
            🐶 Chiens (Electric)
        </button>
    </div>

    <div v-if="isLoading" class="text-center py-20">
        <div class="inline-block border-2 border-black p-4 bg-white font-mono animate-pulse">
            LOADING_DATA... [|||||||||---]
        </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div v-for="(breed, index) in breeds" :key="breed.id" 
             class="sticker-card bg-white p-4 border-2 border-black shadow-[8px_8px_0px_#000] hover:rotate-2 transition-transform"
             :style="{ transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)` }">
            
            <div class="relative mb-4 border-2 border-black overflow-hidden group">
                <img v-if="breed.image?.url" :src="breed.image.url" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div v-else class="w-full h-64 bg-gray-200 flex items-center justify-center font-black">NO_IMG.JPG</div>
                <div class="absolute bottom-2 left-2 bg-yellow-300 border-2 border-black px-2 py-1 text-[10px] font-black uppercase">
                    {{ breed.origin || 'Web' }}
                </div>
            </div>
            
            <h2 class="text-2xl font-black uppercase leading-none mb-2">{{ breed.name }}</h2>
            
            <p class="text-xs font-bold text-gray-700 mb-4 line-clamp-3 font-mono">
                {{ breed.description || 'Information classée confidentielle pour cette espèce.' }}
            </p>
            
            <div class="flex flex-wrap gap-2 pt-4 border-t-2 border-dotted border-black">
                <span v-for="temp in (breed.temperament ? breed.temperament.split(',') : []).slice(0, 2)" :key="temp" 
                      class="bg-black text-white text-[10px] px-2 py-1 uppercase font-bold">
                    #{{ temp.trim() }}
                </span>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.sticker-card {
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s;
}

.sticker-card:hover {
    z-index: 20;
    box-shadow: 12px 12px 0px #ff1493;
}
</style>