<template>
y    <div>
      <q-input
        filled
        v-model="search"
        label="Search"
        placeholder="Type to search..."
        class="q-mb-md"
      />
    </div>
    <div v-if="userType === 'entreprise'">
      <q-btn label="Poster une annonce" color="primary" @click="postAnnouncement" />
    </div>
  
  <!--
  <q-page class="flex flex-center">
    <container>
      <img
        alt="Quasar logo"
        src="~assets/quasar-logo-vertical.svg"
        style="width: 200px; height: 200px"
      />
    </container>
  </q-page> -->
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')
</script>
