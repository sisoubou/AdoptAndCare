<template>
    <div class="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 class="page-title mb-6">
            Adopte moi !
        </h1>
        
        <router-link to="/animals" 
            class="win-button inline-block bg-gray-300 text-black font-black py-8 px-20 text-3xl uppercase italic hover:bg-gray-200">
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