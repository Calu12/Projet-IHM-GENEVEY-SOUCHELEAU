<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Connect Work </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <AnnouncementList />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import AnnouncementList from 'components/AnnouncementList.vue'

const leftDrawerOpen = ref(false)
const userType = ref('entreprise') // or 'particulier'

const linksList = ref([])

if (userType.value === 'entreprise') {
  linksList.value = [
    {
      title: 'Profil Entreprise',
      caption: 'quasar.dev',
      icon: 'business',
      link: 'https://quasar.dev',
    },
    {
      title: 'Messagerie Entreprise',
      caption: 'chat.quasar.dev',
      icon: 'chat',
      link: 'https://chat.quasar.dev',
    },
    {
      title: 'Répertoire Entreprise',
      caption: 'forum.quasar.dev',
      icon: 'record_voice_over',
      link: 'https://forum.quasar.dev',
    },
  ]
} else if (userType.value === 'particulier') {
  linksList.value = [
    {
      title: 'Profil Particulier',
      caption: 'quasar.dev',
      icon: 'person',
      link: 'https://quasar.dev',
    },
    {
      title: 'Messagerie Particulier',
      caption: 'chat.quasar.dev',
      icon: 'chat',
      link: 'https://chat.quasar.dev',
    },
    {
      title: 'Répertoire Particulier',
      caption: 'forum.quasar.dev',
      icon: 'record_voice_over',
      link: 'https://forum.quasar.dev',
    },
  ]
  // si pas connecté
} else if (userType.value === 'unknown') {
  linksList.value = [
    {
      title: 'Connection',
      caption: 'quasar.dev',
      icon: 'person',
      link: 'https://quasar.dev',
    },
  ]
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
