import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAnimalsStore = defineStore('animals', () => {
    const listAnimals = ref(JSON.parse(localStorage.getItem('my_animals')) || [])
    const isLoading = ref(false)

    const fetchAnimals = async () => {
    if (listAnimals.value.length > 0 && listAnimals.value.some(a => a.id.includes('cat-'))) return;
    
    isLoading.value = true
    try {
        const [catRes, dogRes] = await Promise.all([
            axios.get('https://api.thecatapi.com/v1/breeds?limit=10'),
            axios.get('https://api.thedogapi.com/v1/breeds?limit=10')
        ])

        const formatted = [
            ...catRes.data.map(d => ({
                id: 'cat-' + d.id,
                name: d.name,
                type: ['Chat'],
                description: d.description,
                image: d.image?.url || 'https://placehold.co/400x400?text=Chat'
            })),
            ...dogRes.data.map(d => ({
                id: 'dog-' + d.id,
                name: d.name,
                type: ['Chien'],
                description: d.temperament,
                image: d.image?.url || 'https://placehold.co/400x400?text=Chien'
            }))
        ]
        listAnimals.value = [...listAnimals.value, ...formatted]
    } finally {
        isLoading.value = false
    }
  }

  const addAnimal = (newAnimal) => {
    listAnimals.value.unshift({
        ...newAnimal,
        id: 'custom-' + Date.now(),
        type: [newAnimal.type],
        breed: newAnimal.breed.trim() === '' ? 'Sans race' : newAnimal.breed
    })
    localStorage.setItem('my_animals', JSON.stringify(listAnimals.value.filter(a => a.id.startsWith('custom-'))))
  }

  return { listAnimals, isLoading, fetchAnimals, addAnimal }
})
