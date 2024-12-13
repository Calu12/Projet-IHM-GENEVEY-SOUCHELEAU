<template>
    <q-page class="flex flex-center">
      <div class="announcement-form-container q-pa-md">
        <h2>Ajouter une annonce</h2>
        <q-form @submit="addAnnouncement" class="q-gutter-md">
          <q-input
            v-model="newAnnouncement.title"
            label="Titre de l'annonce"
            required
          />
          <q-input
            v-model="newAnnouncement.contract"
            label="Type de contrat"
            required
          />
          <q-input
            v-model="newAnnouncement.salaire"
            label="Salaire"
            required
          />
          <q-input
            v-model="newAnnouncement.description"
            label="Description"
            type="textarea"
            required
          />
          <q-input
            v-model="newAnnouncement.profileRecherche"
            label="Profil recherché"
            required
          />
          <q-input
            v-model="newAnnouncement.competancesRecherche"
            label="Compétences recherchées (séparées par des virgules)"
            required
          />
          <q-input
            v-model="newAnnouncement.avantages"
            label="Avantages (séparés par des virgules)"
            required
          />
          <q-btn type="submit" label="Ajouter l'annonce" color="primary" />
        </q-form>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const newAnnouncement = ref({
    title: '',
    contract: '',
    salaire: '',
    description: '',
    profileRecherche: '',
    competancesRecherche: '',
    avantages: '',
  });
  
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  // Vérifier si l'utilisateur est connecté et de type 'Entreprise'
  if (!currentUser || currentUser.userType !== 'Entreprise') {
    router.push('/login'); // Rediriger l'utilisateur vers la page de connexion si non-entreprise
  }
  
  function addAnnouncement() {
    const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    
    // Créer l'annonce à ajouter
    const newAnnouncementObj = {
      id: announcements.length + 1, // Générer un nouvel ID pour l'annonce
      title: newAnnouncement.value.title,
      contract: newAnnouncement.value.contract,
      salaire: newAnnouncement.value.salaire,
      entrepriseID: currentUser.id, // L'entrepriseID est l'ID de l'utilisateur actuel
      candidats: [], // Pas de candidats au début
      description: newAnnouncement.value.description,
      profileRecherche: newAnnouncement.value.profileRecherche,
      competancesRecherche: newAnnouncement.value.competancesRecherche.split(',').map(item => item.trim()),
      avantages: newAnnouncement.value.avantages.split(',').map(item => item.trim()),
    };
  
    // Ajouter l'annonce à la liste existante
    announcements.push(newAnnouncementObj);
    
    // Sauvegarder à nouveau dans le localStorage
    localStorage.setItem('announcements', JSON.stringify(announcements));
  
    // Récupérer la liste des utilisateurs
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Mettre à jour l'objet currentUser et ajouter l'annonce à ses annonces
    const updatedUsers = users.map(user => {
      if (user.id === currentUser.id) {
        user.annonces.push(newAnnouncementObj.id); // Ajouter l'ID de la nouvelle annonce
      }
      return user;
    });
  
    // Sauvegarder la liste des utilisateurs mise à jour dans le localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  
    // Rediriger après l'ajout de l'annonce
    router.push('/'); // Ou rediriger vers une autre page, si nécessaire
  }
  </script>
  
  <style scoped>
  .announcement-form-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .q-form {
    width: 100%;
  }
  </style>
  