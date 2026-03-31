<script setup>
import { useAnimalsStore } from '@/stores/animals.store'
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from "vue-router"
import axios from 'axios'

const router = useRouter()
const animalStore = useAnimalsStore()

const previewImage = ref(null)
const catBreeds = ref([])
const dogBreeds = ref([])
const customBreed = ref('')

const newAnimal = ref({ 
    name: '', 
    type: 'Chat', 
    breed: '', 
    description: '', 
    image: '' 
})

onMounted(async () => {
    const API_CONFIG = {
        headers: {
            'x-api-key': 'live_4KTzXfkR38ftodklW2OSwuc5BB2R7SFfE2mOXaIXm8hOOYU6Ip0T0hjqUQ61MXc9'
        }
    }

    try {
        const [catRes, dogRes] = await Promise.all([
            axios.get('https://api.thecatapi.com/v1/breeds', API_CONFIG),
            axios.get('https://api.thedogapi.com/v1/breeds', API_CONFIG)
        ])
        catBreeds.value = catRes.data
        dogBreeds.value = dogRes.data
    } catch (e) {
        console.error("Erreur lors du chargement des races:", e)
    }
})

const currentBreedsList = computed(() => {
    if (newAnimal.value.type === 'Chat') return catBreeds.value
    if (newAnimal.value.type === 'Chien') return dogBreeds.value
    return []
})

watch(() => newAnimal.value.type, () => {
    newAnimal.value.breed = ''
    customBreed.value = ''
})

const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            newAnimal.value.image = e.target.result
            previewImage.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const selectedBreedObject = ref({ name: '', id: '' })

const handleSubmit = () => {
  let finalBreedName = selectedBreedObject.value.name
  let finalBreedId = selectedBreedObject.value.id

  if (finalBreedId === 'custom') {
    finalBreedName = customBreed.value
    finalBreedId = 'custom-' + Date.now()
  }

  animalStore.addAnimal({
      ...newAnimal.value,
      breed: finalBreedName,
      breedId: finalBreedId
  })
  router.push('/animals')
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 mt-10">
    <div class="neo-brutalism bg-purple-400 p-8">
        <h1 class="text-4xl font-black uppercase mb-6">Nouveau Compagnon 🐾</h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
                <input v-model="newAnimal.name" placeholder="Nom" required class="neo-brutalism p-3" />
                <select v-model="newAnimal.type" class="neo-brutalism p-3 font-bold">
                    <option value="Chat">Chat 🐱</option>
                    <option value="Chien">Chien 🐶</option>
                    <option value="Autre">Autre ✨</option>
                </select>
            </div>

            <div v-if="newAnimal.type !== 'Autre'" class="flex flex-col gap-1">
                <label class="font-black uppercase text-xs">Race (Base de données API)</label>
                <select v-model="selectedBreedObject" class="neo-brutalism p-3 bg-white font-bold">
                <option value="">-- Choisir une race --</option>
                <option :value="{ name: 'Sans race', id: 'none' }">Sans race / Croisé</option>
                <option v-for="breed in currentBreedsList" :key="breed.id" :value="{ name: breed.name, id: breed.id }">
                    {{ breed.name }}
                </option>
                <option :value="{ name: 'custom', id: 'custom' }">Autre (Saisie manuelle...)</option>
            </select>>

                <input 
                    v-if="newAnimal.breed === 'custom'"
                    v-model="customBreed" 
                    placeholder="Tapez le nom de la race..." 
                    class="neo-brutalism p-3 mt-2 bg-yellow-100 font-bold" 
                />
            </div>

            <div class="flex flex-col gap-2">
                <label class="font-black uppercase text-xs">Photo (Fichier local)</label>
                <input type="file" @change="handleFileUpload" accept="image/*" class="neo-brutalism p-2 bg-white" />
                <img v-if="previewImage" :src="previewImage" class="w-32 h-32 object-cover border-2 border-black mt-2" />
            </div>

            <textarea v-model="newAnimal.description" placeholder="Description..." required class="neo-brutalism w-full p-3 h-32"></textarea>

            <button type="submit" class="w-full bg-black text-white font-black py-4 hover:bg-green-400 hover:text-black transition-all">
                PUBLIER L'ANNONCE
            </button>
        </form>
    </div>
  </div>
</template>
