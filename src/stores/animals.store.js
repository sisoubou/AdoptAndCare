import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAnimalsStore = defineStore('animals', () => {
  const listAnimals = ref([])
  const isLoading = ref(false);
  const errorMessage = ref(null)

  const totalAnimals = computed(() => listAnimals.value.length)

  const apiCat = axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
    timeout: 5000,
    headers: { 
        'x-api-key': 'live_6DD1Fuov5nKpVJVtCnNmmBkXypIMR0tBDqSdD7LVxCafxvYGhksI96HTQJscGcX4'
    }
  })

  const apiDog = axios.create({
    baseURL: 'https://api.thedogapi.com/v1',
    timeout: 5000,
    headers: {
        'x-api-key': 'live_4KTzXfkR38ftodklW2OSwuc5BB2R7SFfE2mOXaIXm8hOOYU6Ip0T0hjqUQ61MXc9'
    }
  })

  const fetchAnimals = async () => {
    isLoading.value = true
    errorMessage.value = null

    try {
        const [catResponse, dogResponse] = await Promise.all([
            apiCat.get('/breeds?limit=12'),
            apiDog.get('/breeds?limit=12')
        ])

        let formattedCats = catResponse.data.map((data) => {
            return {
                id: 'cat-' + data.id,
                name: data.name,
                type: ['Chat', data.origin].filter(Boolean),
                description: data.description,
                image: data.image?.url || 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg'
            }
        })

        let formattedDogs = dogResponse.data.map((data) => {
            return {
                id: 'dog-' + data.id,
                name: data.name,
                type: ['Chien', data.breed_group || 'Inconnu'].filter(Boolean),
                description: data.temperament ? `Caractère : ${data.temperament}` : 'Un super chien très affectueux !',
                image: data.image?.url || 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg' 
            }
        })

        let combinedAnimals = [...formattedCats, ...formattedDogs]

        combinedAnimals.sort(() => Math.random() - 0.5)

        listAnimals.value = combinedAnimals

    } catch (error) {
        console.error('Erreur lors du chargement des Animaux', error)
        errorMessage.value = "Impossible de récupérer les animaux pour le moment, réessayez plus tard"
    } finally {
        isLoading.value = false
    }
  }

const addAnimal = (newAnimal) => {
    const animalWithId = {
        ...newAnimal,
        id: 'custom-' + Date.now(),
        type: [newAnimal.type],
        image: newAnimal.image || 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg'
    }
    listAnimals.value.unshift(animalWithId)
    }


return { listAnimals, isLoading, errorMessage, totalAnimals, fetchAnimals, addAnimal }
})
