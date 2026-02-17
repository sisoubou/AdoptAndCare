<script setup>

import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/animals">Animaux</router-link>

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
