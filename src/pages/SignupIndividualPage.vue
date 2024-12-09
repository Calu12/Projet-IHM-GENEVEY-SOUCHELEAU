<template>
  <q-page class="q-pa-md">
    <div class="form-container">
      <h2>Inscription en tant que particulier</h2>
      <q-form @submit.prevent="handleSignup">
        <q-input
          v-model="formData.name"
          label="Nom"
          filled
          class="q-mb-md"
          :rules="[(val) => !!val || 'Le nom est requis']"
        />
        <q-input
          v-model="formData.forename"
          label="Prénom"
          filled
          class="q-mb-md"
          :rules="[(val) => !!val || 'Le prénom est requis']"
        />
        <q-input
          v-model="formData.adresse"
          label="Adresse"
          type="adresse"
          filled
          class="q-mb-md"
          :rules="[(val) => !!val || 'L’adresse est requise']"
        />
        <q-input v-model="formData.tel" label="Téléphone" type="tel" filled class="q-mb-md" />
        <!-- Ajouter condition sur le nombre de caractère maximum -->
        <q-input
          v-model="formData.text"
          label="Description de votre profil"
          type="descr"
          filled
          class="q-mb-md"
        />
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
        <!-- Diplômes -->
        <div class="section-container">
          <h3>Diplômes</h3>
          <div
            v-for="(diploma, index) in formData.diplomas"
            :key="'diploma-' + index"
            class="q-mb-md"
          >
            <q-input
              v-model="diploma.title"
              label="Titre du diplôme"
              filled
              class="q-mb-sm"
              :rules="[(val) => !!val || 'Le titre du diplôme est requis']"
            />
            <q-input
              v-model="diploma.year"
              label="Année d'obtention"
              type="text"
              filled
              class="q-mb-sm"
              :rules="[(val) => !!val || 'L’année est requise']"
            />
            <q-btn
              label="Supprimer"
              color="negative"
              class="q-mt-sm"
              flat
              @click="removeDiploma(index)"
            />
          </div>
          <q-btn label="Ajouter un diplôme" color="primary" flat @click="addDiploma" />
        </div>

        <!-- Expériences -->
        <div class="section-container q-mt-md">
          <h3>Expériences professionnelles</h3>
          <div
            v-for="(experience, index) in formData.experiences"
            :key="'experience-' + index"
            class="q-mb-md"
          >
            <q-input
              v-model="experience.company"
              label="Nom de l'entreprise"
              filled
              class="q-mb-sm"
              :rules="[(val) => !!val || 'Le nom de l’entreprise est requis']"
            />
            <q-input
              v-model="experience.role"
              label="Rôle / Poste"
              filled
              class="q-mb-sm"
              :rules="[(val) => !!val || 'Le rôle est requis']"
            />
            <q-input v-model="experience.duration" label="Durée" filled class="q-mb-sm" />
            <q-btn
              label="Supprimer"
              color="negative"
              class="q-mt-sm"
              flat
              @click="removeExperience(index)"
            />
          </div>
          <q-btn label="Ajouter une expérience" color="primary" flat @click="addExperience" />
        </div>
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
  type: 'Individu',
  name: '',
  forename: '',
  adresse: '',
  tel: '',
  text: '',
  email: '',
  password: '',
  confirmPassword: '',
  diplomas: [], // Liste des diplômes
  experiences: [], // Liste des expériences
})

// Ajouter un diplôme
function addDiploma() {
  formData.value.diplomas.push({ title: '', year: '' })
}

// Supprimer un diplôme
function removeDiploma(index) {
  formData.value.diplomas.splice(index, 1)
}

// Ajouter une expérience
function addExperience() {
  formData.value.experiences.push({ company: '', role: '', duration: '' })
}

// Supprimer une expérience
function removeExperience(index) {
  formData.value.experiences.splice(index, 1)
}

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
