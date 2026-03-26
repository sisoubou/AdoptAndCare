<script setup>
import { useAnimalsStore } from '@/stores/animals.store'
import { ref } from 'vue'
import { useRouter } from "vue-router"

const router = useRouter()
const animalStore = useAnimalsStore()

const newAnimal = ref({
  name: '',
  type: '',
  breed: '',
  age: null,
  description: '',
  imageUrl: ''
})

const handleSubmit = () => {
  animalStore.addAnimal(newAnimal.value)
  router.push('/animals')
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 mt-10">
    <div class="neo-brutalism bg-purple-400 p-8">
        <h1 class="text-5xl font-black text-black uppercase mb-2 tracking-tighter">Nouveau Meilleur Ami 🐾</h1>
        <p class="font-bold text-black border-b-2 border-black pb-4 mb-8 italic">Partage une annonce d'adoption</p>

        <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col">
                    <label class="font-black uppercase text-sm mb-1">Nom du pet</label>
                    <input v-model="newAnimal.name" type="text" required class="neo-brutalism p-3 focus:bg-yellow-200 outline-none" placeholder="Félix, Rex..." />
                </div>

                <div class="flex flex-col">
                    <label class="font-black uppercase text-sm mb-1">Espèce</label>
                    <select v-model="newAnimal.type" class="neo-brutalism p-3 bg-white font-bold outline-none">
                        <option value="Chat">Chat 🐱</option>
                        <option value="Chien">Chien 🐶</option>
                        <option value="Lapin">Lapin 🐰</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>
            </div>

            <div class="flex flex-col">
                <label class="font-black uppercase text-sm mb-1">URL de la photo</label>
                <input v-model="newAnimal.image" type="url" class="neo-brutalism p-3 outline-none" placeholder="https://..." />
            </div>

            <div class="flex flex-col">
                <label class="font-black uppercase text-sm mb-1">Bio / Caractère</label>
                <textarea v-model="newAnimal.description" required rows="4" class="neo-brutalism p-3 outline-none" placeholder="Il est super chill..."></textarea>
            </div>

            <button type="submit" class="w-full bg-black text-white font-black py-5 text-2xl uppercase tracking-widest hover:bg-green-400 hover:text-black transition-colors shadow-[6px_6px_0px_#fff] active:translate-y-1">
                PUBLIER L'ANNONCE
            </button>
        </form>
    </div>
  </div>
</template>