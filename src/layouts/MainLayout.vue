<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>Connect Work</q-toolbar-title>
        <div>{{ txtAccueil }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <q-item v-for="link in linksList" :key="link.title" class="q-my-sm">
          <q-btn
            flat
            dense
            icon-left
            :icon="link.icon"
            :label="link.title"
            color="primary"
            @click="navigateTo(link.link)"
          />
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <AnnouncementList />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AnnouncementList from 'components/AnnouncementList.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const leftDrawerOpen = ref(false)
const currentUser = ref(null)
const linksList = ref([])
const txtAccueil = ref("Visiteur")

// Fonction pour récupérer l'utilisateur du localStorage
function fetchCurrentUser() {
  try {
    currentUser.value = JSON.parse(localStorage.getItem('currentUser'))
  } catch (error) {
    currentUser.value = null
    console.error('No user found:', error)
  }
}

// Fonction pour calculer les liens en fonction de currentUser
function updateLinksList() {
  if (currentUser.value) {
    const userType = currentUser.value.userType
    if (userType === 'Entreprise') {
      txtAccueil.value = currentUser.value.name;
      linksList.value = [
        { title: 'Home', icon: 'home', link: '/' },
        { title: 'Mon Profil', icon: 'business', link: '/profile/'+currentUser.value.id },
        { title: 'Messagerie', icon: 'chat', link: '/messagerie' },
        { title: 'Répertoire', icon: 'record_voice_over', link: '/contacts' },
      ]
    } else if (userType === 'Individu') {
      txtAccueil.value = currentUser.value.name+' '+currentUser.value.surname;
      linksList.value = [
        { title: 'Home', icon: 'home', link: '/' },
        { title: 'Mon Profil ', icon: 'person', link: '/profile/'+currentUser.value.id },
        { title: 'Messagerie', icon: 'chat', link: '/messagerie' },
        { title: 'Répertoire', icon: 'record_voice_over', link: '/contacts' },
      ]
    }
  } else {
    linksList.value = [
      { title: 'Home', icon: 'home', link: '/' },
      { title: 'Connexion', icon: 'login', link: '/login' },
    ]
  }
}

// Effectuer le rafraîchissement du layout à l'initialisation
onMounted(() => {
  fetchCurrentUser()
  updateLinksList()

  // Surveillance de changes dans localStorage pour currentUser
  const interval = setInterval(() => {
    const newUser = localStorage.getItem('currentUser')
    if (JSON.stringify(currentUser.value) !== newUser) {
      fetchCurrentUser() // Mettre à jour currentUser
      updateLinksList()   // Mettre à jour la liste des liens
    }
  }, 3000) // Vérification toutes les 3 secondes

  // Nettoyage lors de la destruction du composant
  onBeforeUnmount(() => {
    clearInterval(interval)
  })
})

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function navigateTo(link) {
  router.push(link)
}
</script>
