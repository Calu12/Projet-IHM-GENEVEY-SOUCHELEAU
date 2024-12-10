<template>
    <div>
      <h1>{{ announcement.title }}</h1>
      <p>{{ announcement.description }}</p>
      <!-- Vous pouvez ajouter plus de détails ici -->
    </div>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const announcement = ref({})
  
  // Simuler la récupération des détails de l'annonce (par exemple, via une API ou du localStorage)
  onMounted(() => {
    const id = route.params.id
    // Ici, vous récupérez l'annonce avec cet ID (par exemple depuis un localStorage ou une API)
    // Exemple de données statiques :
    const announcements = JSON.parse(localStorage.getItem('announcements'))
    announcement.value = announcements.find(a => a.id === parseInt(id))
  })
</script>
  