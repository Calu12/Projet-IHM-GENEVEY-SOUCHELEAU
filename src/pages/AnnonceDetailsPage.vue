<template>
  <div class="announcement-container">
    <!-- Bouton Postuler visible uniquement pour les utilisateurs connectés de type 'Individu' -->
    <div v-if="currentUser && currentUser.userType === 'Individu'" class="apply-button-container">
      <button class="apply-button" @click="applyForJob">Postuler</button>
    </div>

    <h1 class="announcement-title">{{ announcement.title }}</h1>

    <div v-if="company" class="company-info">
      <h2>Informations sur l'entreprise :</h2>
      <p><strong>Nom de l'entreprise :</strong> {{ company.name }}</p>
      <p><strong>Adresse :</strong> {{ company.adresse }}</p>
      <p><strong>A propos de l'entreprise :</strong> {{ company.description }}</p>
    </div>

    <div class="announcement-details">
      <p><strong>Description de l'annonce :</strong> {{ announcement.description }}</p>
      <p><strong>Profil recherché :</strong> {{ announcement.profileRecherche }}</p>

      <div class="skills">
        <strong>Compétences recherchées :</strong>
        <ul>
          <li v-for="(competence, index) in announcement.competancesRecherche" :key="index">
            {{ competence }}
          </li>
        </ul>
      </div>

      <p><strong>Contrat :</strong> {{ announcement.contract }}</p>
      <p><strong>Salaire :</strong> {{ announcement.salaire }}</p>

      <div class="benefits">
        <strong>Avantages :</strong>
        <ul>
          <li v-for="(avantage, index) in announcement.avantages" :key="index">
            {{ avantage }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute();
  const announcement = ref({}); // Stocke les informations de l'annonce
  const company = ref(null); // Stocke les informations de l'entreprise
  const currentUser = ref(null); // Stocke les informations de l'utilisateur connecté
  
  onMounted(() => {
    const id = route.params.id
    const announcements = JSON.parse(localStorage.getItem('announcements'))
    announcement.value = announcements.find(a => a.id === parseInt(id))

    const users = JSON.parse(localStorage.getItem('users'))
    company.value = users.find(user => user.id === announcement.value.entrepriseID)

    try {
      currentUser.value = JSON.parse(localStorage.getItem('currentUser'))
    } catch (error) {
      currentUser.value = null
      console.error('No user found:', error)
    }
  })

  // Fonction pour ajouter l'ID du currentUser dans les candidats de l'annonce
  function applyForJob() {
    if (currentUser.value && announcement.value) {
      
      // Ajouter l'ID de l'utilisateur dans le tableau des candidats si il n'est pas déjà présent
      if (!announcement.value.candidats.includes(currentUser.value.id)) {
        announcement.value.candidats.push(currentUser.value.id);
        // Mettre à jour l'annonce dans le localStorage
        const announcements = JSON.parse(localStorage.getItem('announcements'));
        const index = announcements.findIndex(a => a.id === announcement.value.id);
        if (index !== -1) {
          announcements[index] = announcement.value;
          localStorage.setItem('announcements', JSON.stringify(announcements));
          alert('Votre candidature a bien été envoyée.');
        }
      } else {
        alert('Vous avez déjà postulé à cette annonce.');
      }
    }
  }
</script>

<style scoped>
/* Conteneur principal */
.announcement-container {
  font-family: 'Arial', sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; /* Pour positionner le bouton "Postuler" */
}

/* Bouton Postuler en haut à droite */
.apply-button-container {
  position: absolute;
  top: 20px;
  right: 20px;
}

.apply-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 128, 0, 0.2);
}

.apply-button:hover {
  background-color: #45a049;
}

/* Titre principal */
.announcement-title {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

/* Informations sur l'entreprise */
.company-info {
  background-color: #f1f1f1;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.company-info h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #2c3e50;
}

.company-info p {
  font-size: 1rem;
  color: #34495e;
  line-height: 1.5;
  margin-bottom: 8px;
}

/* Détails de l'annonce */
.announcement-details {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
}

.announcement-details p {
  margin-bottom: 12px;
}

/* Liste des compétences et avantages */
.skills ul,
.benefits ul {
  list-style-type: square;
  margin-left: 20px;
  padding-left: 10px;
}

.skills li,
.benefits li {
  margin-bottom: 6px;
  color: #555;
}

/* Espacement des sections */
strong {
  font-weight: bold;
  color: #2c3e50;
}

/* Adaptation responsive */
@media (max-width: 600px) {
  .announcement-container {
    padding: 15px;
  }

  .announcement-title {
    font-size: 1.5rem;
  }

  .apply-button-container {
    top: 10px;
    right: 10px;
  }
}
</style>
