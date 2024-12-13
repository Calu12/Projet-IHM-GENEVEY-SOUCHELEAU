<template>
    <q-page class="row">
      <!-- Liste des contacts -->
      <div class="col-3 bg-grey-2">
        <q-list bordered class="full-height">
          <q-item-label header class="text-h6 q-pa-sm">Contacts</q-item-label>
          <q-item
            v-for="contact in contactsList"
            :key="contact.id"
            clickable
            @click="selectContact(contact)"
          >
            <q-item-section>
              <div class="text-subtitle1 overflow-text">{{ contact.name }}</div>
              <div class="text-caption overflow-text">{{ contact.email }}</div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
  
      <!-- Chat principal -->
      <div class="col-9 bg-white">
        <div v-if="selectedContact" class="q-pa-md full-height">
          <!-- Entête du chat -->
          <div class="q-pa-sm row items-center bg-grey-3">
            <div class="text-h6">Discussion avec {{ selectedContact.name }}</div>
          </div>
  
          <!-- Zone des messages -->
          <div class="q-pa-md overflow-auto full-height" style="max-height: calc(100vh - 100px);">
            <div v-for="message in conversation" :key="message.id" :class="['q-pa-sm', message.isCurrentUser ? 'text-right' : 'text-left']">
              <div :class="['q-pa-sm', 'inline-block', message.isCurrentUser ? 'bg-primary text-white' : 'bg-grey-4']">
                {{ message.text }}
              </div>
            </div>
          </div>
  
          <!-- Champ d'envoi -->
          <div class="q-pa-sm row">
            <q-input
              v-model="messageInput"
              placeholder="Écrivez un message..."
              outlined
              dense
              class="col"
            ></q-input>
            <q-btn
              label="Envoyer"
              color="primary"
              class="q-ml-sm"
              @click="sendMessage"
            ></q-btn>
          </div>
        </div>
  
        <div v-else class="q-pa-md text-h6 text-grey-7 full-height flex flex-center">
          Sélectionnez un contact pour démarrer une conversation.
        </div>
      </div>
    </q-page>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  
  export default {
    name: 'MessagingPage',
    setup() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const users = JSON.parse(localStorage.getItem('users'));
  
      const contactsList = computed(() => {
        const currentUserContacts = users.find((u) => u.id === currentUser.id)?.contacts || [];
        return users.filter((u) => currentUserContacts.includes(u.id));
      });
  
      const selectedContact = ref(null);
      const conversation = ref([]); // Messages de la conversation
      const messageInput = ref('');
  
      function selectContact(contact) {
        selectedContact.value = contact;
        loadConversation(contact.id);
      }
  
      function loadConversation(contactId) {
        // Charger une conversation spécifique à partir du localStorage (ou initialiser une nouvelle)
        const conversations = JSON.parse(localStorage.getItem('conversations')) || {};
        conversation.value = conversations[`${currentUser.id}-${contactId}`] || [];
      }
  
      function saveConversation(contactId) {
        // Sauvegarder la conversation actuelle dans le localStorage
        const conversations = JSON.parse(localStorage.getItem('conversations')) || {};
        conversations[`${currentUser.id}-${contactId}`] = conversation.value;
        localStorage.setItem('conversations', JSON.stringify(conversations));
      }
  
      function sendMessage() {
        if (messageInput.value.trim()) {
          conversation.value.push({
            id: Date.now(),
            text: messageInput.value,
            isCurrentUser: true,
          });
  
          // Simuler une réponse automatique pour tester
          setTimeout(() => {
            conversation.value.push({
              id: Date.now(),
              text: `Réponse automatique à : ${messageInput.value}`,
              isCurrentUser: false,
            });
          }, 1000);
  
          saveConversation(selectedContact.value.id);
          messageInput.value = '';
        }
      }
  
      return {
        contactsList,
        selectedContact,
        conversation,
        messageInput,
        selectContact,
        sendMessage,
      };
    },
  };
  </script>
  
  <style scoped>
  .full-height {
    height: 100vh;
  }
  .overflow-auto {
    overflow-y: auto;
  }
  .inline-block {
    display: inline-block;
    border-radius: 8px;
    max-width: 70%;
    word-wrap: break-word;
  }
  .bg-grey-2 {
    background-color: #f5f5f5;
  }
  .bg-grey-3 {
    background-color: #e0e0e0;
  }
  .bg-grey-4 {
    background-color: #d6d6d6;
  }
  .overflow-text {
  white-space: nowrap; /* Empêche le texte de se casser sur plusieurs lignes */
  overflow: hidden; /* Cache le texte qui dépasse */
  text-overflow: ellipsis; /* Ajoute des points de suspension si le texte dépasse */
  width: 100%; /* Assurez-vous que l'élément prend toute la largeur disponible */
  }
  </style>
  