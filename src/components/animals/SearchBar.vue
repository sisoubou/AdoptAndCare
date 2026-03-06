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
        <input v-model="localSearchQuery" type="text" placeholder="Rechercher un chat par son nom" class="search-input">
    </div>
</template>

<style scoped>
.search-container {
  text-align: center;
  margin-bottom: 30px;
}
.search-input {
  padding: 12px 20px;
  width: 100%;
  max-width: 400px;
  border-radius: 25px;
  border: 1px solid #4f46e5;
  background-color: #27272a;
  color: white;
  font-size: 1rem;
  outline: none;
  transition: box-shadow 0.3s ease;
}
.search-input:focus {
  box-shadow: 0 0 10px rgba(79, 70, 229, 0.5);
}
</style>