import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnimalsStore = defineStore('animals', () => {
    const listAnimals = ref(JSON.parse(localStorage.getItem('my_animals')) || [])
    const favoriteAnimals = ref(JSON.parse(localStorage.getItem('my_favorites')) || [])

    const addAnimal = (newAnimal) => {
        listAnimals.value.unshift({
            ...newAnimal,
            id: 'custom-' + Date.now(),
            type: newAnimal.type,
            breed: newAnimal.breed.trim() === '' ? 'Sans race' : newAnimal.breed
        })
        localStorage.setItem('my_animals', JSON.stringify(listAnimals.value))
    }

    const removeAnimal = (id) => {
        listAnimals.value = listAnimals.value.filter(a => a.id !== id)
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

    return { listAnimals, addAnimal, removeAnimal, toggleFavorite, isFavorite }
})