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
    <div class="form-container">
        <h2>Contactez-nous à propos de cet animal</h2>
        <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-group">
                <label for="name">Votre nom</label>
                <input type="text" id="name" v-model="form.name" required />
            </div>
            <div class="form-group">
                <label for="email">Votre email</label>
                <input type="email" id="email" v-model="form.email" required />
            </div>
            <div class="form-group">
                <label for="message">Votre message</label>
                <textarea id="message" v-model="form.message" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Envoyer</button>
            <p v-if="successMessage" class="text-success">{{ successMessage }}</p>
            <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
        </form>
    </div>

</template>