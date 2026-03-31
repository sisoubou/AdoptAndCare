<template>
  <div class="win-window group h-100%">
    <div class="bg-gray-600 text-white p-1 text-[11px] flex justify-between items-center px-2">
      <span class="truncate font-mono">FILE: {{ animal.name.toUpperCase() }}.IMG</span>
      <span class="cursor-help">?</span>
    </div>
    
    <div class="p-2 flex flex-col h-full bg-[var(--win-face)]">
      <div class="win-inset overflow-hidden mb-3">
        <div v-if="imageLoadError || !animal.image" class="w-full h-40 bg-gray-300 flex items-center justify-center">
          <span class="text-center text-sm font-bold text-gray-600">Image indisponible</span>
        </div>
        <img v-else :src="animal.image" @error="onImageError" class="w-full h-40 object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all" />
      </div>

      <div class="flex flex-col flex-1">
        <h2 class="text-xl font-bold uppercase tracking-tight text-black">{{ animal.name }}</h2>
        
        <div class="flex gap-2 mt-2 mb-4">
          <span class="win-inset px-2 py-0.5 text-[9px] font-bold bg-white text-gray-700 italic">
            {{ animal.type }}
          </span>
          <span class="win-inset px-2 py-0.5 text-[9px] font-bold bg-white text-gray-700">
            {{ animal.breed }}
          </span>
        </div>

        <button @click.stop.prevent="animalStore.toggleFavorite(animal.id)" 
                class="win-button w-full mt-auto text-xs">
          {{ animalStore.isFavorite(animal.id) ? '★ Favori' : '☆ Favori' }}
        </button>
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
import { computed, ref } from 'vue'
import { useAnimalsStore } from '@/stores/animals.store'

const animalStore = useAnimalsStore()
const imageLoadError = ref(false)

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

const onImageError = () => {
  imageLoadError.value = true
}
</script>