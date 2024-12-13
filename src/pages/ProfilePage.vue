<template>
    <q-page class="q-pa-md">
      <q-card>
        <q-card-section>
          <div class="text-h5">{{ profile.name }}</div>
  
          <div v-if="profile.userType === 'Entreprise'">
            <div v-if="isCurrentUser">
              <q-input v-model="profile.name" label="Nom de l'entreprise" class="q-mb-sm" />
              <q-input v-model="profile.secteur" label="Secteur" class="q-mb-sm" />
              <q-input v-model="profile.description" label="Description" type="textarea" class="q-mb-sm" />
              <q-input v-model="profile.adresse" label="Adresse" class="q-mb-sm" />
              <q-input v-model="profile.emailContact" label="Email de contact" class="q-mb-sm" />
              <q-input v-model="profile.telContact" label="Téléphone de contact" class="q-mb-sm" />
              <q-input v-model="profile.siteWeb" label="Site web" class="q-mb-sm" />
              <q-btn label="Sauvegarder" color="primary" @click="saveProfile" class="q-mb-lg" />
            </div>
            <div v-else>
              <p><strong>Secteur :</strong> {{ profile.secteur }}</p>
              <p><strong>Description :</strong> {{ profile.description }}</p>
              <p><strong>Adresse :</strong> {{ profile.adresse }}</p>
              <p><strong>Email :</strong> {{ profile.emailContact }}</p>
              <p><strong>Téléphone :</strong> {{ profile.telContact }}</p>
              <p><strong>Site web :</strong> <a :href="profile.siteWeb" target="_blank">{{ profile.siteWeb }}</a></p>
            </div>
          </div>
  
          <div v-else>
            <div v-if="isCurrentUser">
              <q-input v-model="profile.name" label="Prénom" class="q-mb-sm" />
              <q-input v-model="profile.surname" label="Nom" class="q-mb-sm" />
              <q-input v-model="profile.email" label="Email" class="q-mb-sm" />
              <q-input v-model="profile.adresse" label="Adresse" class="q-mb-sm" />
              <q-input v-model="profile.tel" label="Téléphone" class="q-mb-sm" />
              <q-input v-model="profile.profile" label="Profil" type="textarea" class="q-mb-sm" />
              <q-btn label="Sauvegarder" color="primary" @click="saveProfile" class="q-mb-lg" />
            </div>
            <div v-else>
              <p><strong>Nom :</strong> {{ profile.name }} {{ profile.surname }}</p>
              <p><strong>Email :</strong> {{ profile.email }}</p>
              <p><strong>Adresse :</strong> {{ profile.adresse }}</p>
              <p><strong>Téléphone :</strong> {{ profile.tel }}</p>
              <p><strong>Profil :</strong> {{ profile.profile }}</p>
            </div>
  
            <!-- Diplômes -->
            <div>
              <h6 class="q-mt-lg">Diplômes :</h6>
              <ul>
                <li v-for="(diplome, index) in profile.diplomes" :key="index">
                  {{ diplome.title }} - {{ diplome.year }}
                </li>
              </ul>
  
              <div v-if="isCurrentUser">
                <q-input v-model="newDiplome.title" label="Titre du diplôme" class="q-mb-sm" />
                <q-input v-model="newDiplome.year" label="Année du diplôme" class="q-mb-sm" />
                <q-btn label="Ajouter un diplôme" color="primary" @click="addDiplome" />
              </div>
            </div>
  
            <!-- Expériences -->
            <div>
              <h6 class="q-mt-lg">Expériences :</h6>
              <ul>
                <li v-for="(experience, index) in profile.experiences" :key="index">
                  <strong>{{ experience.company }}</strong> : {{ experience.role }} ({{ experience.duration }})
                </li>
              </ul>
  
              <div v-if="isCurrentUser">
                <q-input v-model="newExperience.company" label="Entreprise" class="q-mb-sm" />
                <q-input v-model="newExperience.role" label="Rôle" class="q-mb-sm" />
                <q-input v-model="newExperience.duration" label="Durée" class="q-mb-sm" />
                <q-btn label="Ajouter une expérience" color="primary" @click="addExperience" />
              </div>
            </div>
  
            <!-- Compétences -->
            <div>
              <h6 class="q-mt-lg">Compétences :</h6>
              <ul>
                <li v-for="(competence, index) in profile.competances" :key="index">
                  {{ competence }}
                </li>
              </ul>
  
              <div v-if="isCurrentUser">
                <q-input v-model="newCompetence" label="Compétence" class="q-mb-sm" />
                <q-btn label="Ajouter une compétence" color="primary" @click="addCompetence" />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  export default {
    setup() {
      const profile = ref({});
      const route = useRoute();
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const isCurrentUser = ref(false);
  
      // Form fields for adding data
      const newDiplome = ref({ title: "", year: "" });
      const newExperience = ref({ company: "", role: "", duration: "" });
      const newCompetence = ref("");
  
      onMounted(() => {
        const users = JSON.parse(localStorage.getItem("users"));
        profile.value = users.find((u) => u.id === parseInt(route.params.id));
        isCurrentUser.value = profile.value.id === currentUser.id;
      });
  
      function addDiplome() {
        if (newDiplome.value.title && newDiplome.value.year) {
          profile.value.diplomes.push({ ...newDiplome.value });
          newDiplome.value = { title: "", year: "" };
          saveProfile();
        }
      }
  
      function addExperience() {
        if (newExperience.value.company && newExperience.value.role && newExperience.value.duration) {
          profile.value.experiences.push({ ...newExperience.value });
          newExperience.value = { company: "", role: "", duration: "" };
          saveProfile();
        }
      }
  
      function addCompetence() {
        if (newCompetence.value) {
          profile.value.competances.push(newCompetence.value);
          newCompetence.value = "";
          saveProfile();
        }
      }
  
      function saveProfile() {
        const users = JSON.parse(localStorage.getItem("users"));
        const userIndex = users.findIndex((u) => u.id === profile.value.id);
        if (userIndex !== -1) {
          users[userIndex] = profile.value;
          localStorage.setItem("users", JSON.stringify(users));
        }
      }
  
      return {
        profile,
        isCurrentUser,
        newDiplome,
        newExperience,
        newCompetence,
        addDiplome,
        addExperience,
        addCompetence,
        saveProfile,
      };
    },
  };
  </script>
  
  <style scoped>
  .q-mt-lg {
    margin-top: 1.5rem;
  }
  .q-mb-sm {
    margin-bottom: 0.75rem;
  }
  .q-mb-lg {
    margin-bottom: 1.5rem;
  }
  </style>
  