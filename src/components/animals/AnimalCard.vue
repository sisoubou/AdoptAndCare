<template>
  <div class="animal-card neo-brutalism bg-yellow-300 relative">
    <button @click.prevent="useAnimalsStore.toggleFavorite(animal.id)" class="absolute top-2 right-2 z-10 bg-white border-2 border-black p-1 hover:bg-pink-200 transition-colors">
      {{ animalStore.isFavorite(animal.id) ? '★' : '☆' }}
    </button>
    <div class="p-2">
        <img :src="animal.image" :alt="animal.name" class="w-full h-48 object-cover border-2 border-black rounded-lg" @error="(e) => e.target.src = 'https://placefold.co/400x400,text=Image+Indisponible'"/>
    </div>
    <div class="p-4 bg-white border-t-2 border-black">
        <h2 class="text-2xl font-black italic uppercase italic">{{ animal.name }}</h2>
        <div class="flex flex-wrap gap-1 mt-2">
            <span v-for="t in animal.type" :key="t" class="text-[10px] bg-cyan-300 border border-black px-2 py-0.5 font-bold uppercase">
                {{ t }}
            </span>
        </div>
    </div>
  </div>
</template>

<style scoped>
.animal-card {
  border: 3px solid #000;
  box-shadow: 6px 6px 0px 0px #000;
  border-radius: 0px;
  overflow: hidden;
}
</style>

<script setup>
import { computed } from 'vue'
import { useAnimalsStore } from '@/stores/animals.store'

const animalStore = useAnimalsStore()

const props = defineProps({
  animal: {
    type: Object,
    required: true,
  },
})

const displayTypes = computed(() => {
  return props.animal.type ? props.animal.type.join(', ') : 'Inconnu'
})

const typeClass = computed(() => {
    return 'default-type'
})
</script>