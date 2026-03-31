<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAnimalsStore } from '@/stores/animals.store'

const route = useRoute()
const animalStore = useAnimalsStore()

const animal = computed(() => {
  return animalStore.listAnimals.find(a => a.id.toString() === route.params.id.toString())
})
</script>

<template>
    <div v-if="animal" class="animal-info-card win-window p-4">
        <h2 class="font-black uppercase mb-4 text-xl text-black border-b-2 border-black pb-2 flex items-center gap-2 bg-gray-300 px-2 py-1 -mx-2 -mt-2">
            Détails de {{ animal.name }}
        </h2>
        <div class="space-y-2">
            <div class="flex items-center gap-2">
                <span class="font-bold text-black">Type:</span>
                <span class="win-inset px-2 py-1 text-sm bg-white">{{ animal.type }}</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="font-bold text-black">Race:</span>
                <span class="win-inset px-2 py-1 text-sm bg-white">{{ animal.breed }}</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="font-bold text-black">Âge:</span>
                <span class="win-inset px-2 py-1 text-sm bg-white">{{ animal.age }} ans</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="font-bold text-black">Genre:</span>
                <span class="win-inset px-2 py-1 text-sm bg-white">{{ animal.gender }}</span>
            </div>
        </div>
        <div class="mt-4">
            <h3 class="font-bold text-lg text-black mb-2">Description:</h3>
            <div class="win-inset p-3 bg-white">
                <p class="text-black leading-relaxed">{{ animal.description }}</p>
            </div>
        </div>
    </div>
</template>