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
    <div class="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h1 class="text-3xl font-extrabold text-gray-900 mb-2">Faire adopter un animal</h1>
        <p class="text-gray-500 mb-8">Remplissez ce formulaire pour publier une annonce d'adoption.</p>

        <form @submit.prevent="handleSubmit" class="space-y-6">
            
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nom de l'animal *</label>
                <input v-model="newAnimal.name" type="text" required class="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500" placeholder="Ex: Félix" />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Espèce *</label>
                <select v-model="newAnimal.type" class="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500">
                    <option value="Chat">Chat</option>
                    <option value="Chien">Chien</option>
                    <option value="Lapin">Lapin</option>
                    <option value="Autre">Autre</option>
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Lien d'une photo (URL)</label>
                <input v-model="newAnimal.image" type="url" class="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500" placeholder="https://..." />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea v-model="newAnimal.description" required rows="4" class="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500" placeholder="Racontez son histoire et son caractère..."></textarea>
            </div>

            <button type="submit" class="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl transition-colors">
                Publier l'annonce
            </button>
        </form>
    </div>
  </div>
</template>