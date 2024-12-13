<template>
    <q-page class="q-pa-md">
      <div class="form-container">
        <h2>Connexion</h2>
        <q-form @submit.prevent="handleLogin">
          <q-input
            v-model="email"
            label="Email"
            type="email"
            filled
            class="q-mb-md"
            :rules="[(val) => !!val || 'L’email est requis']"
          />
          <q-input
            v-model="password"
            label="Mot de passe"
            type="password"
            filled
            class="q-mb-md"
            :rules="[(val) => !!val || 'Le mot de passe est requis']"
          />
          <q-btn label="Se connecter" type="submit" color="primary" class="full-width" />
          <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
        </q-form>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  // Champs de connexion
  const email = ref('')
  const password = ref('')
  const errorMessage = ref('')
  
  // Gestion de la connexion
  function handleLogin() {
    // Récupérer les utilisateurs stockés
    const users = JSON.parse(localStorage.getItem('users')) || []
  
    

    // Vérifier les informations de connexion
    const user = users.find((user) => user.email === email.value && user.password === password.value)
  
    if (user) {
      // Enregistrer l'utilisateur connecté dans le localStorage
      const currentUser = {
      id: user.id,
      userType: user.userType,
      name: user.name,
      ...(user.userType === 'Individu' && { surname: user.surname }), // Ajoute le nom de famille si c'est un individu
      }
        
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      // Rediriger l'utilisateur vers la page d'accueil ou un tableau de bord
      
      router.push('/')
    } else {
      // Afficher un message d'erreur
      errorMessage.value = 'Email ou mot de passe incorrect.'
    }
  }
  </script>
  
  <style scoped>
  .form-container {
    max-width: 400px;
    margin: auto;
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .full-width {
    width: 100%;
  }
  
  .error-message {
    color: red;
    margin-top: 1rem;
    text-align: center;
  }
  </style>
  