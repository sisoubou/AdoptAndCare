<template>
  <div class="animal-card" :class="typeClass">
    <img :src="animal.image" :alt="animal.name" class="animal-image" />
    <h2 class="animal-name">{{ animal.name }}</h2>

    <h3 class="animal-type">
      {{ displayTypes }}
    </h3>

    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

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

<style scoped>
.animal-card {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 320px;
  padding: 18px 16px 16px;
  border-radius: 18px;
  text-align: center;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.animal-name {
  margin: 6px 0 10px;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: capitalize;
  color: #1f2937;
}

.animal-type {
    color: #6b7280;
    font-size: 0.9rem;
    margin-bottom: 10px;
}
</style>