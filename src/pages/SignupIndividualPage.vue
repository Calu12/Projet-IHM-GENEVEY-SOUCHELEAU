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
          v-model="formData.surname"
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
            v-for="(diplome, index) in formData.diplomes"
            :key="'diplome-' + index"
            class="q-mb-md"
          >
            <q-input
              v-model="formData.diplomes[index].title"
              label="Titre du diplôme"
              filled
              class="q-mb-sm"
              :rules="[(val) => !!val || 'Le titre du diplôme est requis']"
            />
            <q-input
              v-model="formData.diplomes[index].year"
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
              @click="removeDiplome(index)"
            />
          </div>
          <q-btn label="Ajouter un diplôme" color="primary" flat @click="addDiplome" />
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
              v-model="formData.experiences[index].company"
              label="Nom de l'entreprise"
              filled
              class="q-mb-sm"
              :rules="[(val) => !!val || 'Le nom de l’entreprise est requis']"
            />
            <q-input
              v-model="formData.experiences[index].role"
              label="Rôle / Poste"
              filled
              class="q-mb-sm"
              :rules="[(val) => !!val || 'Le rôle est requis']"
            />
            <q-input
              v-model="formData.experiences[index].duration"
              label="Durée"
              filled
              class="q-mb-sm"
            />
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

        <!-- Compétences -->
        <div class="section-container q-mt-md">
          <h3>Compétences</h3>
          <div v-for="(competence, index) in formData.competences" :key="'competence-' + index">
            <q-input
              v-model="formData.competences[index]"
              label="Compétence"
              filled
              class="q-mb-sm"
              :rules="[(val) => !!val || 'La compétence est requise']"
            />
            <q-btn
              label="Supprimer"
              color="negative"
              class="q-mt-sm"
              flat
              @click="removeCompetence(index)"
            />
          </div>
          <q-btn label="Ajouter une compétence" color="primary" flat @click="addCompetence" />
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
  surname: '',
  adresse: '',
  tel: '',
  text: '',
  email: '',
  password: '',
  confirmPassword: '',
  diplomes: [], // Liste des diplômes
  experiences: [], // Liste des expériences
  competences: [], // Liste des compétences
  contacts: [], // Liste des contacts
})

// Ajouter un diplôme
function addDiplome() {
  formData.value.diplomes.push({ title: '', year: '' })
}

// Supprimer un diplôme
function removeDiplome(index) {
  formData.value.diplomes.splice(index, 1)
}

// Ajouter une expérience
function addExperience() {
  formData.value.experiences.push({ company: '', role: '', duration: '' })
}

// Supprimer une expérience
function removeExperience(index) {
  formData.value.experiences.splice(index, 1)
}

// Ajouter une compétence
function addCompetence() {
  formData.value.competences.push('')
}

// Supprimer une compétence
function removeCompetence(index) {
  formData.value.competences.splice(index, 1)
}

// Gestion de la soumission du formulaire
function handleSignup() {
  // Récupérer les utilisateurs existants
  const existingUsers = JSON.parse(localStorage.getItem('users')) || []

  // Ajouter le nouvel utilisateur
  const newUser = {
    id: existingUsers.length + 1,
    ...formData.value,
  }
  existingUsers.push(newUser)

  // Sauvegarder dans localStorage
  localStorage.setItem('users', JSON.stringify(existingUsers))
  const currentUser = { id: newUser.id, type: newUser.type, name: newUser.name, surname: newUser.surname }
  localStorage.setItem('currentUser', JSON.stringify(currentUser))

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
