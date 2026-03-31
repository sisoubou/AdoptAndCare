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
    <div>
        <h2 class="font-black uppercase mb-4 text-xl">>> REQUETE_ADOPTION.EXE</h2>
        
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
            <div class="flex flex-col">
                <label class="font-bold text-sm uppercase mb-1">Identifiant (Nom)</label>
                <input type="text" v-model="form.name" required class="neo-brutalism p-2 outline-none focus:bg-pink-300 font-mono" />
            </div>
            
            <div class="flex flex-col">
                <label class="font-bold text-sm uppercase mb-1">Contact (Email)</label>
                <input type="email" v-model="form.email" required class="neo-brutalism p-2 outline-none focus:bg-pink-300 font-mono" />
            </div>
            
            <div class="flex flex-col">
                <label class="font-bold text-sm uppercase mb-1">Message_Data</label>
                <textarea v-model="form.message" required rows="3" class="neo-brutalism p-2 outline-none focus:bg-pink-300 font-mono"></textarea>
            </div>
            
            <button type="submit" class="neo-brutalism bg-[#0033ff] text-white font-black uppercase py-3 hover:bg-[#ff1493] transition-colors mt-2">
                [ TRANSMETTRE LES DONNÉES ]
            </button>
            
            <div v-if="successMessage" class="bg-green-400 border-2 border-black p-2 font-bold font-mono text-sm text-center uppercase mt-2">
                {{ successMessage }}
            </div>
            <div v-if="errorMessage" class="bg-red-500 text-white border-2 border-black p-2 font-bold font-mono text-sm text-center uppercase mt-2">
                {{ errorMessage }}
            </div>
        </form>
    </div>
</template>