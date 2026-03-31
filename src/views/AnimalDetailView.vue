<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue';
import { useAnimalsStore } from '@/stores/animals.store';
import axios from 'axios';

const route = useRoute()
const router = useRouter()
const animalStore = useAnimalsStore()

const animal = computed(() =>{
    return animalStore.listAnimals.find(a => a.id.toString() === route.params.id.toString())
})

const contactForm = ref({
    name: '',
    email: '',
    message: ''
})

const contactSuccess = ref('')
const contactError = ref('')

const goBack = () => {
    router.push('/animals')
}

const deleteAnimal = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet animal ?")) {
        animalStore.removeAnimal(animal.value.id)
        router.push('/animals')
    }
}

const adoptAnimal = () => {
    alert(`Demande d'adoption envoyée pour ${animal.value.name} ! Nous vous contacterons bientôt.`)
}

const handleContactSubmit = async () => {
    try {
        await axios.post('https://jsonplaceholder.typicode.com/posts',{
            name: contactForm.value.name,
            email: contactForm.value.email,
            message: contactForm.value.message,
            animalId: animal.value.id,
            animalName: animal.value.name
        })
        contactSuccess.value = 'Votre demande d\'adoption a été envoyée avec succès !'
        contactError.value = ''
        contactForm.value = { name: '', email: '', message: '' }
    } catch (error) {
        contactError.value = 'Une erreur est survenue. Veuillez réessayer.'
        contactSuccess.value = ''
    }
}

const goToBreed = () => {
    const species = animal.value.type === 'Chat' ? 'cats' : 'dogs'
    router.push(`/breed/${species}/${animal.value.breedId}`)
}

onMounted(async () => {
    if (animalStore.listAnimals.length === 0){
        await animalStore.fetchAnimals()
    }
})
</script>

<template>
  <div v-if="animal" class="max-w-7xl mx-auto my-10 px-4">
    <div class="win98-window">
        <div class="win98-title-bar">
            <span class="font-bold truncate">C:\ADOPTION\{{ animal.name.toUpperCase() }}.HTM</span>
            <div class="flex gap-1">
                <button @click="goBack" class="win98-btn-tool">?</button>
                <button @click="goBack" class="win98-btn-tool">X</button>
            </div>
        </div>

        <div class="p-6 flex flex-col md:flex-row gap-8 bg-[#c0c0c0]">
            <div class="md:w-1/2 bg-[var(--win-face)] p-4 border-inset flex justify-center">
                <img :src="animal.image" alt="Photo de {{ animal.name }}" class="w-auto h-auto border-2 border-black shadow-[4px_4px_0px_#000]" />
            </div>

            <div class="md:w-1/2 flex flex-col gap-4">
                <h1 class="text-5xl font-black italic uppercase text-black mb-2 tracking-tighter" style="text-shadow: 3px 3px 0px #808080;">
                    {{ animal.name }}
                </h1>

                <div class="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#000] max-w-md">
                    <h3 class="font-black uppercase mb-3 text-lg border-b-2 border-black pb-1">>> SPECIFICATIONS.TXT</h3>
                    <div class="font-mono text-sm space-y-2 font-bold">
                        <p><span class="text-gray-600">Type_:</span> {{ animal.type }}</p>
                        <p><span class="text-gray-600">Age_:</span> {{ animal.age }} ans</p>
                        <p><span class="text-gray-600">Gender_:</span> {{ animal.gender }}</p>
                        <p><span class="text-gray-600">Breed_:</span> 
                            <button @click="goToBreed" class="underline text-blue-600 hover:text-blue-800">
                                {{ animal.breed }}
                            </button>
                        </p>
                    </div>
                </div>

                <div class="bg-pink-300 border-2 border-black p-4 font-black uppercase text-xs shadow-[4px_4px_0px_#000]">
                    Description: {{ animal.description }}
                </div>
            </div>
        </div>

        <div class="p-6 bg-[#c0c0c0] border-t-2 border-black">
            <div class="bg-white border-inset p-4 mb-4">
                <h3 class="font-black uppercase mb-3 text-lg border-b-2 border-black pb-1">FORMULAIRE D'ADOPTION</h3>
                <form @submit.prevent="handleContactSubmit" class="space-y-3">
                    <div class="flex flex-col">
                        <label class="font-bold text-black mb-1">Votre nom</label>
                        <input type="text" v-model="contactForm.name" required class="win-inset p-2 bg-gray-200 text-black border-0 outline-none w-full" />
                    </div>
                    
                    <div class="flex flex-col">
                        <label class="font-bold text-black mb-1">Votre email</label>
                        <input type="email" v-model="contactForm.email" required class="win-inset p-2 bg-gray-200 text-black border-0 outline-none w-full" />
                    </div>
                    
                    <div class="flex flex-col">
                        <label class="font-bold text-black mb-1">Votre message</label>
                        <textarea v-model="contactForm.message" required rows="4" class="win-inset p-2 bg-gray-200 text-black border-0 outline-none w-full resize-none"></textarea>
                    </div>
                    
                    <button type="submit" class="w-full y2k-btn-blue">
                        ENVOYER LA DEMANDE
                    </button>
                </form>
                
                <div v-if="contactSuccess" class="mt-3 p-2 bg-green-200 border border-green-600 text-green-800 font-bold">
                    {{ contactSuccess }}
                </div>
                <div v-if="contactError" class="mt-3 p-2 bg-red-200 border border-red-600 text-red-800 font-bold">
                    {{ contactError }}
                </div>
            </div>
            
            <div class="flex gap-4">
                <button @click="adoptAnimal" class="flex-1 y2k-btn-blue">
                    ADOPTER.EXE
                </button>
                <button @click="deleteAnimal" class="flex-1 y2k-btn-red">
                    SUPPRIMER.EXE
                </button>
            </div>
            
            <button @click="goBack" class="mt-4 w-full y2k-btn-blue">
                <-- RETOUR À LA LISTE
            </button>
        </div>
    </div>
  </div>
  <div v-else class="text-center py-20 font-black text-2xl uppercase">
    Animal non trouvé !
  </div>
</template>

<style scoped>
.win98-window {
    border: 3px solid black;
    background: #c0c0c0;
    box-shadow: 8px 8px 0px 0px #000;
}

.win98-title-bar {
    background: linear-gradient(90deg, #000080, #1084d0);
    color: white;
    padding: 4px 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid black;
}

.win98-btn-tool {
    background: #c0c0c0;
    border: 1px solid black;
    border-color: #ffffff #808080 #808080 #ffffff;
    color: black;
    font-weight: bold;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    cursor: pointer;
}
.win98-btn-tool:active {
    border-color: #808080 #ffffff #ffffff #808080;
}

.border-inset {
    border: 3px solid;
    border-color: #808080 #ffffff #ffffff #808080;
    background-color: #fff;
}

.win98-tab {
    background: #c0c0c0;
    color: #000;
    border: 2px outset #c0c0c0;
    border-bottom: none;
    padding: 4px 12px;
    font-size: 12px;
    font-weight: bold;
    margin-right: 2px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.win98-tab:hover {
    background: #dfdfdf;
    border: 2px inset #c0c0c0;
}

.win98-tab.active {
    background: #ffffff;
    border: 2px inset #c0c0c0;
    border-bottom: 2px solid #ffffff;
    color: #000;
    z-index: 10;
}

.y2k-btn-blue {
    background: #000080;
    color: white;
    font-weight: 900;
    padding: 12px;
    text-transform: uppercase;
    font-size: 1rem;
    border: 2px solid black;
    border-color: #ffffff #808080 #808080 #ffffff;
    cursor: pointer;
    transition: all 0.1s;
}
.y2k-btn-blue:hover {
    background: #1084d0;
}
.y2k-btn-blue:active {
    border-color: #808080 #ffffff #ffffff #808080;
    transform: translate(1px, 1px);
}

.y2k-btn-red {
    background: #800000;
    color: white;
    font-weight: 900;
    padding: 12px;
    text-transform: uppercase;
    font-size: 1rem;
    border: 2px solid black;
    border-color: #ffffff #808080 #808080 #ffffff;
    cursor: pointer;
    transition: all 0.1s;
}
.y2k-btn-red:hover {
    background: #cc0000;
}
.y2k-btn-red:active {
    border-color: #808080 #ffffff #ffffff #808080;
    transform: translate(1px, 1px);
}
.y2k-btn-red:hover {
    background: #cc0000;
}
.y2k-btn-red:active {
    border-color: #808080 #ffffff #ffffff #808080;
    transform: translate(1px, 1px);
}
.win-button {
  border: 2px outset #c0c0c0;
  background: #c0c0c0;
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}

.win-button:hover {
  border: 2px inset #c0c0c0;
  background: #dfdfdf;
}

.win-button:active {
  border: 2px inset #c0c0c0;
  background: #a0a0a0;
}

.adopt-btn {
  background: #000080;
  border: 2px outset #000000;
  color: #ffffff;
}

.adopt-btn:hover {
  background: #656565;
  border: 2px inset #000000;
}

.delete-btn {
  background: #656565;
  border: 2px outset #000000;
  color: #ffffff;
}

.delete-btn:hover {
  background: #000080;
  border: 2px inset #000000;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.95; }
}

.adopt-btn {
  animation: blink 2s infinite;
}
</style>