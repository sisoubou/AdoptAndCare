<template>
  <div class="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 bg-[#d3d3d3]">
    <div class="win-window max-w-2xl">
      <div class="p-8">
        <h1 class="page-title mb-8">
          404_Erreur
        </h1>
        
        <div class="win-inset p-8 mb-8">
          <p class="text-xl font-bold text-center mb-4">Oups ! 🐾</p>
          <p class="text-center text-lg">La page que vous cherchez n'existe pas ou a été déménagée.</p>
        </div>

        <div class="text-center">
          <router-link to="/" class="win-button bg-gray-300 hover:bg-gray-200 py-3 px-12 text-lg uppercase font-bold inline-block">
            ← Retour à l'accueil
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>

<style scoped>
.error-message {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}

.error-button {
  display: inline-block;
  padding: 12px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: transform 0.2s, box-shadow 0.2s;
}

.error-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}
</style>
