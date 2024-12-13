<template>
    <q-page class="flex flex-center">
      <q-card class="q-pa-md" style="max-width: 500px; width: 100%;">
        <!-- Champ de saisie et bouton Ajouter -->
        <div class="input-section">
          <q-input
            filled
            v-model="contactInput"
            label="Nom ou email du contact"
            placeholder="Saisissez le nom ou l'email"
            :disable="!user"
            class="q-mb-sm"
          />
          <q-btn
            label="Ajouter un contact"
            color="primary"
            @click="addContact"
            :disable="!contactInput.trim()"
            class="add-btn"
          />
        </div>
  
        <q-banner v-if="errorMessage" class="q-mt-sm" dense color="negative">
          {{ errorMessage }}
        </q-banner>
        <q-banner v-if="successMessage" class="q-mt-sm" dense color="positive">
          {{ successMessage }}
        </q-banner>
  
        <!-- Liste des contacts -->
        <div class="q-mt-lg">
          <div class="text-h6 q-mb-md">Contacts</div>
          <q-list bordered>
            <q-item
              v-for="userContact in users.filter(user => contacts.includes(user.id))"
              :key="userContact.id"
            >
              <q-item-section>
                <div>
                  <strong>{{ userContact.name }}</strong>
                </div>
                <div>{{ userContact.email }}</div>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  label="Voir"
                  color="primary"
                  @click="viewProfile(userContact.id)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card>
  
     
    </q-page>
  </template>
  
  
  <script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const currentUser = ref(null);
    const users = ref([]);
    const user = ref(null);
    const contacts = ref([]);
    const contactInput = ref(""); // Champ d'entrée pour le nom ou l'email
    const errorMessage = ref(""); // Message d'erreur
    const successMessage = ref(""); // Message de succès
    const router = useRouter();

    // Lors de la montée du composant
    onMounted(() => {
      currentUser.value = JSON.parse(localStorage.getItem("currentUser"));
      users.value = JSON.parse(localStorage.getItem("users"));

      if (!currentUser.value) {
        router.push("/login");
      } else {
        user.value = users.value.find((u) => u.id === currentUser.value.id);
        if (user.value) {
          contacts.value = user.value.contacts;
        }
      }
    });

    // Fonction pour ajouter un contact
    const addContact = () => {
      const trimmedInput = contactInput.value.trim().toLowerCase();
      const foundUser = users.value.find(
        (u) =>
          u.name.toLowerCase() === trimmedInput ||
          u.email.toLowerCase() === trimmedInput
      );

      if (!foundUser) {
        errorMessage.value = "Aucun utilisateur trouvé avec ce nom ou email.";
        successMessage.value = ""; // Réinitialiser le message de succès
        return;
      }

      if (contacts.value.includes(foundUser.id)) {
        errorMessage.value = "Cet utilisateur est déjà dans vos contacts.";
        successMessage.value = ""; // Réinitialiser le message de succès
        return;
      }

      // Ajouter l'utilisateur trouvé aux contacts
      contacts.value.push(foundUser.id);
      user.value.contacts = contacts.value;

      // Mettre à jour le localStorage
      localStorage.setItem("users", JSON.stringify(users.value));

      successMessage.value = `Contact ajouté : ${foundUser.name} (${foundUser.email})`;
      errorMessage.value = ""; // Réinitialiser le message d'erreur
      contactInput.value = ""; // Réinitialiser le champ d'entrée
    };

    // Fonction pour voir le profil d'un contact
    const viewProfile = (id) => {
      router.push({ name: "Profile", params: { id } });
    };

    return {
      user,
      contacts,
      users,
      contactInput,
      errorMessage,
      successMessage,
      addContact,
      viewProfile, // Exporter la fonction
    };
  },
};
</script>

  
  <style scoped>
  .input-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .add-btn {
    align-self: flex-start;
  }
  
  .text-h6 {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .q-card {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .q-banner {
    margin-bottom: 10px;
  }
  
  .q-list {
    max-height: 300px;
    overflow-y: auto;
  }
  </style>
  