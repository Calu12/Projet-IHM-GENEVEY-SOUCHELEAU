<template>
  <q-page class="q-pa-md">
    <div class="form-container">
      <h2>Inscription en tant qu'entreprise</h2>
      <q-form @submit.prevent="handleSignup">
        <q-input
          v-model="formData.name"
          label="Nom de votre entreprise"
          filled
          class="q-mb-md"
          :rules="[(val) => !!val || 'Le nom est requis']"
        />
        <q-input
          v-model="formData.name2"
          label="Secteur d'activité"
          filled
          class="q-mb-md"
          :rules="[(val) => !!val || 'Le secetur d\'activité est requis']"
        />
        <q-input
          v-model="formData.text"
          label="Description de l'entreprise"
          type="descr"
          filled
          class="q-mb-md"
        />
        <q-input
          v-model="formData.adresse"
          label="Adresse"
          type="adresse"
          filled
          class="q-mb-md"
          :rules="[(val) => !!val || 'L’adresse est requise']"
        />
        <q-input
          v-model="formData.name3"
          label="Nom du responsable"
          filled
          class="q-mb-md"
          :rules="[(val) => !!val || 'Le nom est requis']"
        />
        <q-input v-model="formData.site" label="Siteweb de l\'entreprise" filled class="q-mb-md" />
        <q-input
          v-model="formData.email"
          label="Email"
          type="email"
          filled
          class="q-mb-md"
          :rules="[(val) => !!val || 'L’email est requis']"
        />
        <q-input
          v-model="formData.password"
          label="Mot de passe"
          type="password"
          filled
          class="q-mb-md"
          :rules="[(val) => !!val || 'Le mot de passe est requis']"
        />
        <q-input
          v-model="formData.confirmPassword"
          label="Confirmer le mot de passe"
          type="password"
          filled
          class="q-mb-md"
          :rules="[(val) => val === formData.password || 'Les mots de passe doivent correspondre']"
        />
        <q-btn label="S'inscrire" type="submit" color="primary" class="full-width" />
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Les données du formulaire
const formData = ref({
  type: 'Entreprise',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// Gestion de la soumission du formulaire
function handleSignup() {
  // Sauvegarde des données localement
  localStorage.setItem('userData', JSON.stringify(formData.value))

  // Redirection vers une autre page après l'inscription
  router.push('/')
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
</style>
