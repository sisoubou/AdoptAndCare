<script setup>

import { ref, watch } from 'vue'

const emit = defineEmits(['search'])
const localSearchQuery = ref('')

watch(localSearchQuery, (newValue) => {
    emit('search', newValue)
})
</script>

<template>
    <div class="search-container">
        <label class="block text-xs font-black uppercase mb-1 text-left">Rechercher.exe</label>
        <input 
            v-model="localSearchQuery" 
            type="text" 
            placeholder="Taper un nom..." 
            class="search-input neo-brutalism bg-white w-full p-3 outline-none font-bold"
        >
    </div>
</template>

<style scoped>
.search-container {
  margin-bottom: 20px;
}
.search-input:focus {
  background-color: #ccff00;
}
</style>