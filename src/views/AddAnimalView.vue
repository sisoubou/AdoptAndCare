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
    image: '',
    age: '',
    gender: ''
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
  let finalBreedName = ""
  let finalBreedId = ""

  if (selectedBreedObject.value.id === 'custom') {
    finalBreedName = customBreed.value || 'Race Inconnue'
    finalBreedId = 'custom-' + Date.now()
  } else if (selectedBreedObject.value.id === 'none') {
    finalBreedName = 'Sans race'
    finalBreedId = 'none'
  } else {
    finalBreedName = selectedBreedObject.value.name
    finalBreedId = selectedBreedObject.value.id
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
    <h1 class="page-title mb-6">
        Nouveau Compagnon
    </h1>
    
    <div class="win-window bg-[var(--win-face)] p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6 p-4">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-black uppercase mb-1">Nom de l'animal</label>
                    <input v-model="newAnimal.name" placeholder="Felix" required class="win-inset p-3" />
                </div>
                <div>
                    <label class="block text-xs font-black uppercase mb-1">Type</label>
                    <select v-model="newAnimal.type" class="win-inset p-3 font-bold">
                        <option value="Chat">Chat 🐱</option>
                        <option value="Chien">Chien 🐶</option>
                        <option value="Autre">Autre ✨</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-black uppercase mb-1">Âge (ans)</label>
                    <input v-model.number="newAnimal.age" type="number" min="0" placeholder="2" required class="win-inset p-3" />
                </div>
                <div>
                    <label class="block text-xs font-black uppercase mb-1">Genre</label>
                    <select v-model="newAnimal.gender" class="win-inset p-3 font-bold">
                        <option value="Mâle">Mâle ♂️</option>
                        <option value="Femelle">Femelle ♀️</option>
                    </select>
                </div>
            </div>

            <div v-if="newAnimal.type !== 'Autre'" class="flex flex-col gap-1">
                <label class="block text-xs font-black uppercase mb-1">Race</label>
                <select v-model="selectedBreedObject" class="win-inset p-2 cursor-pointer">
                    <option :value="{ name: '', id: '' }">-- Sélectionner --</option>
                    <option :value="{ name: 'Sans race', id: 'none' }">Croisé / Inconnu</option>
                    <option v-for="breed in currentBreedsList" :key="breed.id" :value="{ name: breed.name, id: breed.id }">
                        {{ breed.name }}
                    </option>
                    <option :value="{ name: 'custom', id: 'custom' }">Saisie Manuelle...</option>
                </select>

                <input 
                    v-if="selectedBreedObject.id === 'custom'"
                    v-model="customBreed" 
                    placeholder="Entrez la race manuellement..." 
                    class="win-inset p-2 mt-2" 
                />
            </div>

            <div class="flex flex-col gap-2">
                <label class="block text-xs font-black uppercase">Photo</label>
                <input type="file" @change="handleFileUpload" accept="image/*" class="win-inset p-2 bg-gray-200" />
                <img v-if="previewImage" :src="previewImage" class="w-32 h-32 object-cover border-2 border-black mt-2" />
            </div>

            <div class="flex flex-col gap-2">
                <label class="block text-xs font-black uppercase">Description</label>
                <textarea v-model="newAnimal.description" placeholder="Décrivez l'animal..." required class="win-inset w-full p-3 h-32"></textarea>
            </div>

            <button type="submit" class="win-button w-full py-4 font-black text-center bg-gray-300 text-black hover:bg-gray-200">
                PUBLIER L'ANNONCE
            </button>
        </form>
    </div>
  </div>
</template>
