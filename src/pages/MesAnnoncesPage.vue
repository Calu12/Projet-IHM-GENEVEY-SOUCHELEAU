<template>
    <q-page class="q-pa-md">
      <!-- Liste des annonces -->
      <div>
        <q-item-label header class="text-h5 q-mb-md">Mes annonces</q-item-label>
        <q-list bordered>
          <q-item v-for="annonce in annonces" :key="annonce.id" clickable @click="selectAnnonce(annonce)">
            <q-item-section>
              <div class="text-subtitle1">{{ annonce.title }}</div>
              <div class="text-caption">{{ annonce.description }}</div>
            </q-item-section>
  
            <!-- Détails de l'annonce sélectionnée -->
            <q-item-section v-if="selectedAnnonce && selectedAnnonce.id === annonce.id" class="q-pt-none">
              <q-card class="q-ma-md">
                <q-card-section>
                  <div class="text-h6">Annonce : {{ selectedAnnonce.title }}</div>
                  <!--<p>{{ selectedAnnonce.description }}</p>-->
                </q-card-section>
                <q-separator></q-separator>
                <q-card-section>
                  <div class="text-h6">Candidats</div>
                  <q-list bordered>
                    <q-item v-for="candidat in candidats" :key="candidat.id">
                      <q-item-section>
                        <div class="text-subtitle1">{{ candidat.name }} {{ candidat.surname }}</div>
                        <div class="text-caption">Email : {{ candidat.email }}</div>
                        <div class="text-caption">Téléphone : {{ candidat.tel }}</div>
                      </q-item-section>
                      <q-item-section side>
                        <!-- Bouton Voir pour rediriger vers le profil du candidat -->
                        <q-btn label="Voir" @click="viewProfile(candidat.id)" color="primary" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-page>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'CompanyAnnouncementsPage',
    setup() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const users = JSON.parse(localStorage.getItem('users'));
      const annoncesData = JSON.parse(localStorage.getItem('announcements')) || [];
  
      // Filtrer les annonces en fonction de l'entreprise de l'utilisateur
      const annonces = computed(() => {
        if (!currentUser) return [];
        return annoncesData.filter((annonce) => annonce.entrepriseID === currentUser.id);
      });
  
      const selectedAnnonce = ref(null);
      const candidats = ref([]);
  
      // Fonction pour sélectionner une annonce
      function selectAnnonce(annonce) {
        selectedAnnonce.value = annonce;
        loadCandidats(annonce);
      }
  
      // Fonction pour charger les candidats ayant répondu à l'annonce
      function loadCandidats(annonce) {
        candidats.value = users.filter(user => annonce.candidats.includes(user.id));
      }
  
      // Utilisation du router pour rediriger vers le profil du candidat
      const router = useRouter();
  
      // Fonction pour rediriger vers le profil du candidat
      function viewProfile(candidatId) {
        router.push(`/profile/${candidatId}`);
      }
  
      return {
        annonces,
        selectedAnnonce,
        candidats,
        selectAnnonce,
        viewProfile,
      };
    },
  };
  </script>
  
  <style scoped>
  .q-card {
    max-width: 800px;
    margin: 0 auto;
  }
  </style>
  