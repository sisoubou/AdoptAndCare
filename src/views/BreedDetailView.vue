<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const breed = ref(null)
const isLoading = ref(true)
const species = route.params.species 

onMounted(async () => {
  isLoading.value = true
  
  try {
    const url = species === 'cats' 
      ? 'https://api.thecatapi.com/v1/breeds' 
      : 'https://api.thedogapi.com/v1/breeds'
      
    const response = await axios.get(url, {
      headers: {
        'x-api-key': 'live_4KTzXfkR38ftodklW2OSwuc5BB2R7SFfE2mOXaIXm8hOOYU6Ip0T0hjqUQ61MXc9'
      }
    })
    
    const fullBreed = response.data.find(b => b.id.toString() === route.params.id.toString())
    
    if (fullBreed) {
      breed.value = {
        ...fullBreed,
        imageUrl: fullBreed.image?.url || `https://cdn2.the${species === 'cats' ? 'cat' : 'dog'}api.com/images/${fullBreed.reference_image_id}.jpg`
      }
    } else {
      breed.value = { 
        name: route.params.id?.length > 10 ? "Race personnalisée" : "Race inconnue", 
        description: "Cette race n'est pas dans l'encyclopédie officielle.",
        imageUrl: 'https://placehold.co/400x400?text=Indisponible',
        temperament: 'Inconnu'
      }
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la race :", error)
  } finally {
    isLoading.value = false
  }
})

const goBack = () => {
    router.back()
}
</script>

<template>
  <div v-if="breed" class="max-w-7xl mx-auto my-10 px-4">
    <div class="win98-window">
        <div class="win98-title-bar">
            <span class="font-bold truncate">C:\WIKI\{{ breed.name?.toUpperCase() }}.HTM</span>
            <div class="flex gap-1">
                <button @click="goBack" class="win98-btn-tool">?</button>
                <button @click="goBack" class="win98-btn-tool">X</button>
            </div>
        </div>

        <div class="p-6 flex flex-col md:flex-row gap-8 bg-[#c0c0c0]">
            <div class="md:w-1/2 bg-[var(--win-face)] p-4 border-inset flex justify-center">
                <img :src="breed.imageUrl" 
                     :alt="breed.name" 
                     class="w-auto h-auto max-h-96 border-2 border-black shadow-[4px_4px_0px_#000]"
                     @error="(e) => e.target.src = 'https://placehold.co/400x400?text=Image+Indisponible'" />
            </div>

            <div class="md:w-1/2 flex flex-col gap-4">
                <h1 class="text-5xl font-black italic uppercase text-black mb-2 tracking-tighter" style="text-shadow: 3px 3px 0px #808080;">
                    {{ breed.name }}
                </h1>

                <div class="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#000] max-w-md">
                    <h3 class="font-black uppercase mb-3 text-lg border-b-2 border-black pb-1">>> SPECIFICATIONS.TXT</h3>
                    <div class="font-mono text-sm space-y-2 font-bold">
                        
                        <p><span class="text-gray-600">Origin_Location_:</span> {{ breed.origin || 'Unknown' }}</p>
                        <p><span class="text-gray-600">Life_Span_:</span> {{ breed.life_span || 'Unknown' }}</p>
                        <p v-if="breed.weight?.metric"><span class="text-gray-600">Weight_Metric_:</span> {{ breed.weight.metric }} kg</p>
                        
                        <template v-if="species === 'dogs'">
                            <p v-if="breed.height?.metric"><span class="text-gray-600">Height_Metric_:</span> {{ breed.height.metric }} cm</p>
                            <p v-if="breed.breed_group"><span class="text-gray-600">Breed_Group_:</span> {{ breed.breed_group }}</p>
                            <p v-if="breed.bred_for"><span class="text-gray-600">Bred_For_:</span> {{ breed.bred_for }}</p>
                        </template>

                        <template v-if="species === 'cats'">
                            <p v-if="breed.indoor !== undefined"><span class="text-gray-600">Indoor_Friendly_:</span> {{ breed.indoor ? 'Yes' : 'No' }}</p>
                            <p v-if="breed.affection_level"><span class="text-gray-600">Affection_Level_:</span> {{ breed.affection_level }}/5</p>
                            <p v-if="breed.intelligence"><span class="text-gray-600">Intelligence_Level_:</span> {{ breed.intelligence }}/5</p>
                            <p v-if="breed.energy_level"><span class="text-gray-600">Energy_Level_:</span> {{ breed.energy_level }}/5</p>
                            <p v-if="breed.dog_friendly"><span class="text-gray-600">Dog_Friendly_:</span> {{ breed.dog_friendly }}/5</p>
                            <p v-if="breed.child_friendly"><span class="text-gray-600">Child_Friendly_:</span> {{ breed.child_friendly }}/5</p>
                            <p v-if="breed.hypoallergenic !== undefined"><span class="text-gray-600">Hypoallergenic_:</span> {{ breed.hypoallergenic ? 'Yes' : 'No' }}</p>
                        </template>

                    </div>
                </div>

                <div v-if="breed.temperament" class="bg-pink-300 border-2 border-black p-4 font-black uppercase text-xs shadow-[4px_4px_0px_#000]">
                    Tempérament: {{ breed.temperament }}
                </div>
            </div>
        </div>
        
        <div class="p-6 bg-[#c0c0c0] border-t-2 border-black">
            <div class="bg-white border-inset p-4 font-mono text-sm font-bold leading-relaxed">
                {{ breed.description || breed.bred_for || breed.temperament || 'Aucune description détaillée n\'est disponible pour cette race.' }}
            </div>
            
            <button @click="goBack" class="mt-6 w-full y2k-btn-blue">
                <-- RETOUR AU WIKI
            </button>
        </div>
    </div>
  </div>

  <div v-else-if="isLoading" class="text-center py-20 font-black text-2xl uppercase italic animate-pulse text-pink-500">
    Connexion au serveur Wiki...
  </div>
  <div v-else class="text-center py-20 font-black text-2xl uppercase">
    Race non trouvée !
  </div>
</template>

<style scoped>
.win98-window {
    border: 3px solid black;
    background: #c0c0c0;
    box-shadow: 8px 8px 0px 0px #000;
}

.win98-title-bar {
    background: linear-gradient(90deg, #000080, #1084d0);
    color: white;
    padding: 4px 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid black;
}

.win98-btn-tool {
    background: #c0c0c0;
    border: 1px solid black;
    border-color: #ffffff #808080 #808080 #ffffff;
    color: black;
    font-weight: bold;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    cursor: pointer;
}
.win98-btn-tool:active {
    border-color: #808080 #ffffff #ffffff #808080;
}

.border-inset {
    border: 3px solid;
    border-color: #808080 #ffffff #ffffff #808080;
    background-color: #fff;
}

.y2k-btn-blue {
    background: #000080;
    color: white;
    font-weight: 900;
    padding: 12px;
    text-transform: uppercase;
    font-size: 1rem;
    border: 2px solid black;
    border-color: #ffffff #808080 #808080 #ffffff;
    cursor: pointer;
    transition: all 0.1s;
}
.y2k-btn-blue:hover {
    background: #1084d0;
}
.y2k-btn-blue:active {
    border-color: #808080 #ffffff #ffffff #808080;
    transform: translate(1px, 1px);
}
</style>