<script setup>

import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
  <nav class="sticky top-4 z-50 max-w-2xl mx-auto bg-black p-2 rounded-full border-2 border-white shadow-[0_0_15px_rgba(255,20,147,0.5)] flex justify-around items-center">
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link to="/animals" class="nav-link">Animaux</router-link>
    <router-link to="/add-animal" class="nav-link">Adopter+</router-link>
    <router-link to="/about" class="nav-link">Wiki</router-link>
  </nav>
  <router-view/>
</template>

<style scoped>
.nav-link {
  color: #fff;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.8rem;
  padding: 8px 12px;
  border-radius: 999px;
  transition: background 0.3s;
}
.router-link-active {
  background: #ff1493; /* Rose fluo */
  color: #fff;
  text-shadow: 2px 2px #000;
}
</style>