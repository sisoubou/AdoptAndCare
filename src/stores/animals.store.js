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

  const fetchAnimals = async () => {
    isLoading.value = true
    errorMessage.value = null

    try {
        const response = await apiCat.get('/breeds?limit=20')

        let formattedAnimals = response.data.map((data) => {
            return {
            id: data.id,
            name: data.name,
            type: [data.origin], 
            description: data.description,
            image: data.image ? data.image.url : 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg'
            }
        })

        formattedAnimals.unshift(
            { id: 'cat1', name: 'Simba', type: ['Lion'], description: 'Roi de la jungle, aime dormir.', image: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg' },
            { id: 'cat2', name: 'Nala', type: ['Lionne'], description: 'Très joueuse et protectrice.', image: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg' }
        )

        listAnimals.value = formattedAnimals

    } catch (error) {
        console.error('Erreur lors du chargement des Animaux', error)
        errorMessage.value = "Impossible de récupérer les animaux pour le moment, réessayez plus tard"
    } finally {
        isLoading.value = false
    }
}


return { listAnimals, isLoading, errorMessage, totalAnimals, fetchAnimals }
})
