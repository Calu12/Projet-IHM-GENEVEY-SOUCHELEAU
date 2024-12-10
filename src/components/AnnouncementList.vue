<template>
  <div>
    <!-- <h2>Annonces</h2> -->
    <q-list>
      <q-item v-for="announcement in props.announcements" :key="announcement.id">
        <q-item-section>
          <q-item-label>{{ announcement.title }}</q-item-label>
          <q-item-label caption>{{ announcement.description.substring(0, 100) }}...</q-item-label>
          <q-btn flat label="Voir plus" @click="viewMore(announcement.id)" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'  // Importer useRouter pour pouvoir naviguer

// Initialiser le router
const router = useRouter()

const props = defineProps({
  announcements: {
    type: Array,
    required: true,
  },
})

function viewMore(id) {
  // Rediriger vers la page de détails de l'annonce
  router.push({ path: `/announce/${id}` })
}
</script>
