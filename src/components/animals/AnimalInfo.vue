<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAnimalsStore } from '@/stores/animals.store'

const route = useRoute()
const animalStore = useAnimalsStore()

const animal = computed(() => {
  return animalStore.listAnimals.find(a => a.id === route.params.id.toString())
})
</script>

<template>
    <div v-if="animal" class="bg-[#ccff00] p-4 border-2 border-black shadow-[4px_4px_0px_#000]">
        <h2 class="font-black uppercase mb-3 text-xl border-b-2 border-black pb-1">>> SYSTEM_INFO.TXT</h2>
        <p class="font-mono text-sm leading-relaxed font-bold">{{ animal.description }}</p>
    </div>
</template>