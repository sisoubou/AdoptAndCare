<template>
    <div class="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 class="text-7xl font-black text-white uppercase tracking-tighter mb-6" 
            style="-webkit-text-stroke: 3px black; text-shadow: 6px 6px 0px #ff1493;">
            Adopte moi !
        </h1>
        
        <router-link to="/animals" 
            class="neo-brutalism inline-block bg-green-400 text-black font-black py-4 px-10 rounded-none text-2xl uppercase italic">
            Trouve ton meilleur ami 🐾
        </router-link>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 p-10">
        <div v-for="animal in animalStore.listAnimals.slice(0, 3)" :key="animal.id">
            <router-link :to="{ name: 'animal-detail', params: { id: animal.id }}">
                <AnimalCard :animal="animal" />
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAnimalsStore } from '@/stores/animals.store';

const animalStore = useAnimalsStore();

onMounted(async () => {
  if (animalStore.listAnimals.length === 0) {
    await animalStore.fetchAnimals();
  }
});
</script>

<style></style>