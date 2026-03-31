import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAnimalsStore = defineStore('animals', () => {
    const listAnimals = ref(JSON.parse(localStorage.getItem('my_animals')) || [])
    const favoriteAnimals = ref(JSON.parse(localStorage.getItem('my_favorites')) || [])
    const isLoading = ref(false)

    const fetchAnimals = async () => {
    if (listAnimals.value.some(a => a.id.startsWith('cat-') || a.id.startsWith('dog-'))) return;
    
    isLoading.value = true
    try {
        const [catRes, dogRes] = await Promise.all([
            axios.get('https://api.thecatapi.com/v1/breeds'),
            axios.get('https://api.thedogapi.com/v1/breeds')
        ])

        const formatted = [
            ...catRes.data.map(d => ({
                id: 'cat-' + d.id,
                name: d.name,
                type: 'Chat',
                description: d.description,
                image: d.image?.url || 'https://placehold.co/400x400?text=Chat',
                breed: d.name,
                breedId: d.id,
                age: Math.floor(Math.random() * 15) + 1,
                gender: Math.random() > 0.5 ? 'Mâle' : 'Femelle'
            })),
            ...dogRes.data.map(d => {
                // For dogs, try multiple image sources
                const imageUrl = d.image?.url || d.reference_image_id || null
                return {
                    id: 'dog-' + d.id,
                    name: d.name,
                    type: 'Chien',
                    description: d.temperament || 'Race de chien',
                    image: imageUrl ? (imageUrl.startsWith('http') ? imageUrl : `https://cdn2.thedogapi.com/images/${imageUrl}.jpg`) : 'https://placehold.co/400x400?text=Chien',
                    breed: d.name,
                    breedId: d.id,
                    age: Math.floor(Math.random() * 15) + 1,
                    gender: Math.random() > 0.5 ? 'Mâle' : 'Femelle'
                }
            })
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
        type: newAnimal.type,
        breed: newAnimal.breed.trim() === '' ? 'Sans race' : newAnimal.breed
    })
    localStorage.setItem('my_animals', JSON.stringify(listAnimals.value.filter(a => a.id.startsWith('custom-'))))
  }

  const removeAnimal = (id) => {
    listAnimals.value = listAnimals.value.filter(a => a.id !== id)
    const customAnimals = listAnimals.value.filter(a => a.id.startsWith('custom-'))
    localStorage.setItem('my_animals', JSON.stringify(customAnimals))
  }

  const toggleFavorite = (id) => {
    const index = favoriteAnimals.value.indexOf(id)
    if (index > -1) {
        favoriteAnimals.value.splice(index, 1)
    } else {
        favoriteAnimals.value.push(id)
    }
    localStorage.setItem('my_favorites', JSON.stringify(favoriteAnimals.value))
  }

  const isFavorite = (id) => favoriteAnimals.value.includes(id)

  return { listAnimals, isLoading, fetchAnimals, addAnimal, removeAnimal, toggleFavorite, isFavorite }
})
