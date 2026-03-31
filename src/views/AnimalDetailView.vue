<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted } from 'vue';
import { useAnimalsStore } from '@/stores/animals.store';

const route = useRoute()
const router = useRouter()
const animalStore = useAnimalsStore()

const animal = computed(() =>{
    return animalStore.listAnimals.find(a => a.id.toString() === route.params.id.toString())
})

const goBack = () => {
    router.push('/animals')
}

const deleteAnimal = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet animal ?")) {
        animalStore.removeAnimal(animal.value.id)
        router.push('/animals')
    }
}

onMounted(async () => {
    if (animalStore.listAnimals.length === 0){
        await animalStore.fetchAnimals()
    }
})
</script>

<template>
  <div v-if="animal" class="max-w-5xl mx-auto my-10 px-4">
    <div class="win98-window">
        <div class="win98-title-bar">
            <span class="font-bold truncate">C:\ANIMAUX\{{ animal.name.toUpperCase() }}.EXE</span>
            <div class="flex gap-1">
                <button @click="goBack" class="win98-btn-tool">_</button>
                <button @click="goBack" class="win98-btn-tool">X</button>
            </div>
        </div>

        <div class="p-6 flex flex-col md:flex-row gap-8 bg-[#c0c0c0]">
            <div class="md:w-1/2 bg-purple-500 p-4 border-inset">
                <img :src="animal.image" :alt="animal.name" class="w-full h-[400px] object-cover border-2 border-black shadow-[4px_4px_0px_#000]" @error="(e) => e.target.src = 'https://placehold.co/400x400?text=Image+Indisponible'"/>
            </div>

            <div class="md:w-1/2 flex flex-col">
                <h1 class="text-5xl font-black italic uppercase tracking-tighter text-black mb-4" style="text-shadow: 3px 3px 0px #ff1493;">
                    {{ animal.name }}
                </h1>

                <div class="flex mt-4">
                    <router-link :to="{ name: 'animal-info', params: { id: animal.id }}" 
                        class="tab-folder" :class="{ 'active-tab': route.name === 'animal-info' }">
                        📁 Infos
                    </router-link>
                    <router-link :to="{ name: 'animal-contact', params: { id: animal.id }}" 
                        class="tab-folder" :class="{ 'active-tab': route.name === 'animal-contact' }">
                        📁 Contact
                    </router-link>
                </div>

                <div class="bg-white border-2 border-black p-6 min-h-[150px] shadow-[4px_4px_0px_#000]">
                    <router-view></router-view>
                </div>

                <div class="mt-auto pt-6 flex flex-col gap-4">
                    <span class="inline-block bg-cyan-300 border-2 border-black px-4 py-1 font-bold uppercase w-fit">
                        Type: {{ animal.type[0] }}
                    </span>
                    <router-link 
                    v-if="animal.breed && animal.breed !== 'Sans race'" 
                    :to="{ 
                        name: 'breed-detail', 
                        params: { 
                        species: animal.type[0].toLowerCase().includes('chat') ? 'cats' : 'dogs', 
                        id: animal.breedId
                        } 
                    }" 
                    class="inline-block bg-pink-300 border-2 border-black px-4 py-1 font-bold uppercase w-fit"
                    >
                    {{ animal.breed }}
                    </router-link>
                    <button class="adopt-btn-y2k">
                        ADOPTER MAINTENANT !
                    </button>
                    <button @click="deleteAnimal" class="adopt-btn-y2k bg-red-600 shadow-[5px_5px_0px_#8b0000] hover:shadow-[7px_7px_0px_#8b0000] active:shadow-[2px_2px_0px_#8b0000]">
                        SUPPRIMER ANIMAL
                    </button>
                </div>
            </div>
        </div>
    </div>
  </div>

  <div v-else class="text-center py-20 font-black text-2xl uppercase italic">
    Chargement...
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
    color: black;
    font-weight: bold;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
}

.border-inset {
    border: 3px solid;
    border-color: #808080 #ffffff #ffffff #808080;
}

.tab-folder {
    background: #a0a0a0;
    border: 2px solid black;
    border-bottom: none;
    padding: 8px 20px;
    font-weight: 800;
    text-transform: uppercase;
    font-size: 0.8rem;
    margin-right: 4px;
    transform: translateY(2px);
    transition: all 0.1s;
}

.active-tab {
    background: #ffffff;
    transform: translateY(0px);
    padding-bottom: 10px;
    z-index: 10;
}

.adopt-btn-y2k {
    background: black;
    color: white;
    font-weight: 900;
    padding: 15px;
    text-transform: uppercase;
    font-size: 1.2rem;
    border: none;
    cursor: pointer;
    box-shadow: 5px 5px 0px #ff1493;
    transition: transform 0.1s;
}

.adopt-btn-y2k:hover {
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px 0px #ff1493;
}

.adopt-btn-y2k:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #ff1493;
}
</style>