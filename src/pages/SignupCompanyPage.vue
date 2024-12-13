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
          v-model="formData.secteur"
          label="Secteur d'activité"
          filled
          class="q-mb-md"
          :rules="[(val) => !!val || 'Le secteur d\'activité est requis']"
        />
        <q-input
          v-model="formData.description"
          label="Description de l'entreprise"
          type="textarea"
          filled
          class="q-mb-md"
        />
        <q-input
          v-model="formData.adresse"
          label="Adresse"
          type="text"
          filled
          class="q-mb-md"
          :rules="[(val) => !!val || 'L’adresse est requise']"
        />
        <q-input
          v-model="formData.nomContact"
          label="Nom du responsable"
          filled
          class="q-mb-md"
          :rules="[(val) => !!val || 'Le nom est requis']"
        />
        <q-input v-model="formData.siteWeb" label="Site web de l'entreprise" filled class="q-mb-md" />
        <q-input
          v-model="formData.emailContact"
          label="Email du contact"
          type="email"
          filled
          class="q-mb-md"
          :rules="[(val) => !!val || 'L’email est requis']"
        />
        <q-input
          v-model="formData.telContact"
          label="Téléphone"
          type="tel"
          filled
          class="q-mb-md"
        />
        <q-input
          v-model="formData.email"
          label="Email du compte"
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Les données du formulaire
const formData = ref({
  id: Date.now(),
  userType: 'Entreprise',
  name: '',
  secteur: '',
  description: '',
  adresse: '',
  nomContact: '',
  emailContact: '',
  telContact: '',
  siteWeb: '',
  email: '',
  annonces: [],
  contacts: [],
  password: '',
  confirmPassword: '',
});

// Gestion de la soumission du formulaire
function handleSignup() {
  // Récupérer les utilisateurs existants ou initialiser un tableau vide
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Ajouter l'utilisateur actuel au tableau
  users.push({
    id: formData.value.id,
    userType: formData.value.userType,
    name: formData.value.name,
    secteur: formData.value.secteur,
    description: formData.value.description,
    adresse: formData.value.adresse,
    nomContact: formData.value.nomContact,
    emailContact: formData.value.emailContact,
    telContact: formData.value.telContact,
    siteWeb: formData.value.siteWeb,
    annonces: formData.value.annonces,
    email: formData.value.email,
  });

  // Sauvegarde des utilisateurs dans le localStorage
  localStorage.setItem('users', JSON.stringify(users));
  const currentUser = {id: formData.value.id, userType: formData.value.userType, name: formData.value.name}
  localStorage.setItem('currentUser', currentUser)

  // Redirection vers une autre page après l'inscription
  router.push('/');
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
