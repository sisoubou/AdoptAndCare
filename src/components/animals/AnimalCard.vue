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
.animal-type {
    color: #bbb;
    font-size: 0.9rem;
    margin-bottom: 10px;
}

.animal-card {
  position: relative;
  overflow: hidden;
  width: 240px;
  min-height: 320px;
  padding: 18px 16px 16px;
  border-radius: 18px;
  text-align: center;
  font-weight: 700;
  background: linear-gradient(180deg, rgba(28, 28, 32, 0.95), rgba(18, 18, 22, 0.95));
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.04);
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease;
}


.animal-image {
  width: 140px;
  height: 140px;
  margin: 6px auto 8px;
  object-fit: contain;
  border-radius: 8px;
}

.animal-name {
  margin: 6px 0 10px;
  font-size: 1.35rem;
  letter-spacing: 0.4px;
  text-transform: capitalize;
  color: #ffffff;
}
</style>