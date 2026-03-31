<script setup>
import { ref } from 'vue';
import axios from 'axios';

const form = ref({
    name: '',
    email: '',
    message: ''
})

const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
    try {
        await axios.post('https://jsonplaceholder.typicode.com/posts',{
            name: form.value.name,
            email: form.value.email,
            message: form.value.message
        })
        successMessage.value = 'Votre message a été envoyé avec succès !'
        errorMessage.value = ''
        form.value = { name: '', email: '', message: '' }
    } catch (error) {
        errorMessage.value = 'Une erreur est survenue. Veuillez réessayer.'
        successMessage.value = ''
    }
}
</script>

<template>
    <div class="animal-contact-card win-window p-4">
        <h2 class="font-black uppercase mb-4 text-xl text-black border-b-2 border-black pb-2 flex items-center gap-2 bg-gray-300 px-2 py-1 -mx-2 -mt-2">
            Formulaire d'Adoption
        </h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-3">
            <div class="flex flex-col">
                <label class="font-bold text-black mb-1">Votre nom</label>
                <input type="text" v-model="form.name" required class="win-inset p-2 bg-gray-200 text-black border-0 outline-none w-full" />
            </div>
            
            <div class="flex flex-col">
                <label class="font-bold text-black mb-1">Votre email</label>
                <input type="email" v-model="form.email" required class="win-inset p-2 bg-gray-200 text-black border-0 outline-none w-full" />
            </div>
            
            <div class="flex flex-col">
                <label class="font-bold text-black mb-1">Votre message</label>
                <textarea v-model="form.message" required rows="4" class="win-inset p-2 bg-gray-200 text-black border-0 outline-none w-full resize-none"></textarea>
            </div>
            
            <button type="submit" class="win-button w-full bg-gray-300 text-black font-bold py-2 px-4 hover:bg-gray-200">
                Envoyer la demande d'adoption
            </button>
            
            <div v-if="successMessage" class="message success win-inset p-3 bg-gray-200 text-black border-2 border-gray-600">
                {{ successMessage }}
            </div>
            <div v-if="errorMessage" class="message error win-inset p-3 bg-gray-200 text-black border-2 border-gray-600">
                {{ errorMessage }}
            </div>
        </form>
    </div>
</template>