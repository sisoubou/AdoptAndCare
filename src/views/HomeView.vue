<template>
    <div class="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 class="text-5xl font-extrabold text-gray-900 mb-6">Bienvenue sur notre site</h1>
        <p class="text-xl text-gray-600 mb-10 max-w-2x1 mx-auto">Découvrez nos animaux à adopter</p>

        <router-link to="/animals" class="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full transition-transform hover:scale-105 shadow-md">
            Voir nos {{ animalStore.listAnimals.length }} animaux
        </router-link>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left">
        <div v-for="animal in animalStore.listAnimals.slice(0, 6)" :key="animal.id" class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 class="text-xl font-bold mb-2">{{ animal.name }}</h2>
            <p class="text-gray-600 mb-4">{{ animal.type ? animal.type.join(', ') : 'Inconnu' }}</p>
            <router-link :to="{ name: 'animal-detail', params: { id: animal.id }}" class="text-pink-500 hover:text-pink-600 font-semibold">
                Voir les détails
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