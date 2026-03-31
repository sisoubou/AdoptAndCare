<template>
  <header class="fixed top-0 left-0 right-0 h-10 bg-[#c0c0c0] border-b-2 border-black z-[100] flex items-center px-2 shadow-[0_2px_0_0_#000]">
    <div class="flex items-center w-full gap-4">
      <div class="flex items-center gap-2 pr-4 border-r-2 border-gray-400">
        <span class="text-xl">🐾</span>
        <span class="font-black italic text-sm tracking-tighter uppercase">Cyber_Refuge</span>
      </div>

      <nav class="flex gap-1 h-full items-center">
        <router-link to="/" class="menu-item">Accueil</router-link>
        <router-link to="/animals" class="menu-item">Explorer_Animaux</router-link>
        <router-link to="/add-animal" class="menu-item">Ajouter_Nouveau</router-link>
        <router-link to="/about" class="menu-item">Wiki</router-link>
      </nav>

      <div class="ml-auto flex items-center gap-4">
        <div class="win-inset px-2 py-0.5 text-[10px] font-mono hidden md:block">
          STATUS: ONLINE
        </div>
        <div class="win-inset px-2 py-0.5 text-[10px] font-mono bg-white">
          {{ currentTime }}
        </div>
      </div>
    </div>
  </header>

  <main class="pt-14 pb-10 min-h-screen bg-[#d3d3d3]">
    <router-view />
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

let timer
onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.menu-item {
  padding: 2px 12px;
  font-size: 13px;
  font-weight: bold;
  text-decoration: none;
  color: black;
  border: 1px solid transparent;
}

.menu-item:hover {
  background: #000080;
  color: white;
}

.router-link-active {
  background: #fff;
  border: 1px solid black;
  box-shadow: inset 2px 2px 0px #000;
}

.win-inset {
  border: 2px solid;
  border-color: #808080 #ffffff #ffffff #808080;
}
</style>