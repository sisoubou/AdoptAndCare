<script setup>

import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/animals">Animaux</router-link>
    <router-link to="/add-animal">Faire adopter un animal</router-link>
    <router-link to="/about">À propos</router-link>
    <router-view/>
  </nav>
</template>


<style scoped>
nav {
  padding: 20px;
  text-align: center;
}
nav a {
  margin: 0 10px;
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}
</style>
