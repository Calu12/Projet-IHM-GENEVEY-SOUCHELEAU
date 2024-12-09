<template>
  <q-page class="flex flex-center">
    <div class="header-container q-pa-md">
      <q-input
        filled
        v-model="search"
        label="Search"
        placeholder="Type to search..."
        class="q-mb-md search-bar"
      />
      <div v-if="userType === 'entreprise'" class="post-btn-container">
        <q-btn label="Poster une annonce" color="primary" @click="postAnnouncement" />
      </div>
    </div>

    <container>
      <h2>Annonces</h2>
      <div v-if="filteredAnnouncements.length === 0">
        <p>Aucune annonce ne correspond à votre recherche.</p>
      </div>
      <div v-else>
        <AnnouncementList :announcements="filteredAnnouncements" />
      </div>
    </container>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import AnnouncementList from 'components/AnnouncementList.vue'
import { name } from '@vue/eslint-config-prettier/skip-formatting';

const search = ref('')
const userType = ref('entreprise') // ou 'particulier'
const announcements = ref([]);

function initializeLocalStorage() {
  const existingData = localStorage.getItem('announcements');
  if (!existingData) {
    const initialData = [
  {
    id: 1,
    title: "Développeur Web Full-Stack",
    description:
      "Nous recherchons un développeur web full-stack passionné pour rejoindre notre équipe dynamique. Vous serez responsable de concevoir, développer et maintenir des applications web robustes et performantes. Vous travaillerez sur des technologies modernes telles que React, Node.js et MongoDB. Une expérience avec les frameworks de développement rapide et les API REST est essentielle. En outre, nous valorisons les compétences en résolution de problèmes et une forte volonté d'apprendre. Si vous aimez relever des défis et travailler dans un environnement collaboratif, cette opportunité est faite pour vous !",
  },
  {
    id: 2,
    title: "Chef de Projet IT",
    description:
      "Vous êtes un expert en gestion de projets informatiques avec une expérience avérée dans la coordination d'équipes interdisciplinaires ? Rejoignez-nous en tant que Chef de Projet IT et aidez à piloter des initiatives stratégiques. Vos responsabilités incluront la planification, l'exécution et la supervision des projets pour garantir leur livraison dans les délais et le respect des budgets. Une connaissance approfondie des méthodologies Agile et Scrum est requise. Nous recherchons une personne communicative et organisée, capable de motiver son équipe pour atteindre les objectifs communs.",
  },
  {
    id: 3,
    title: "Designer UI/UX",
    description:
      "Notre entreprise est à la recherche d'un designer UI/UX talentueux pour améliorer l'expérience utilisateur de nos produits numériques. Vous serez en charge de la recherche utilisateur, de la création de wireframes, de prototypes interactifs et de l'élaboration de designs attrayants. Une maîtrise des outils comme Figma, Adobe XD ou Sketch est indispensable. Nous apprécions les profils ayant une approche centrée sur l'utilisateur et capables de transformer des concepts complexes en interfaces intuitives. Si vous avez un œil pour les détails et une passion pour le design fonctionnel, rejoignez notre équipe.",
  },
  {
    id: 4,
    title: "Analyste Data Scientist",
    description:
      "En tant qu'Analyste Data Scientist, vous jouerez un rôle clé dans la collecte, l'analyse et l'interprétation des données pour aider à la prise de décision stratégique. Vous utiliserez des outils comme Python, R ou SQL pour explorer les ensembles de données complexes et fournir des insights clairs et exploitables. Une expérience dans les modèles de machine learning et les visualisations de données est fortement souhaitée. Si vous avez un esprit analytique et un désir de résoudre des problèmes réels à l'aide de données, nous aimerions travailler avec vous.",
  },
  {
    id: 5,
    title: "Responsable Marketing Digital",
    description:
      "Nous cherchons un Responsable Marketing Digital pour élaborer et mettre en œuvre des stratégies innovantes qui renforcent notre présence en ligne. Vous superviserez les campagnes de publicité payante, l'optimisation SEO, le marketing de contenu et la gestion des réseaux sociaux. Une connaissance approfondie des outils tels que Google Ads, Analytics et des plateformes de gestion de contenu est cruciale. Nous recherchons une personne créative, motivée et axée sur les résultats, capable de transformer les tendances numériques en opportunités de croissance.",
  },
  {
    id: 6,
    title: "Ingénieur DevOps",
    description:
      "Rejoignez notre équipe en tant qu'Ingénieur DevOps pour optimiser nos processus de développement et de déploiement. Vous serez responsable de l'automatisation des pipelines CI/CD, de la surveillance des performances des systèmes et de la résolution proactive des incidents. Une expertise en Docker, Kubernetes et les services cloud tels qu'AWS ou Azure est essentielle. Nous valorisons les profils capables de collaborer efficacement avec les équipes de développement et d'opérations pour atteindre des objectifs ambitieux.",
  },
  {
    id: 7,
    title: "Consultant en Cybersécurité",
    description:
      "Nous sommes à la recherche d'un Consultant en Cybersécurité pour protéger nos systèmes d'information contre les menaces croissantes. Vous effectuerez des audits de sécurité, élaborerez des politiques de protection et mettrez en œuvre des solutions de sécurité avancées. Une connaissance des normes comme ISO 27001, ainsi qu'une maîtrise des outils d'analyse de vulnérabilités, est requise. Si vous êtes passionné par la cybersécurité et que vous aimez anticiper et neutraliser les menaces, cette mission vous correspondra parfaitement.",
  },
  {
    id: 8,
    title: "Assistant Administratif",
    description:
      "Nous recherchons un Assistant Administratif pour apporter un soutien organisationnel à notre équipe. Vous serez en charge de la gestion des agendas, de la rédaction de rapports et de la coordination des communications internes. Une excellente maîtrise des outils bureautiques comme Microsoft Office est requise. Nous privilégions les profils rigoureux, multitâches et capables de travailler sous pression tout en maintenant une grande attention aux détails. Si vous cherchez un rôle varié au sein d'une entreprise dynamique, postulez dès maintenant.",
  },
  {
    id: 9,
    title: "Technicien Support Informatique",
    description:
      "Rejoignez notre équipe en tant que Technicien Support Informatique et devenez un pilier essentiel pour nos utilisateurs. Vous serez responsable de la gestion des demandes de support, du diagnostic des problèmes techniques et de la mise en œuvre de solutions efficaces. Une bonne connaissance des systèmes d'exploitation (Windows, macOS, Linux) et des réseaux est indispensable. Nous recherchons une personne orientée service client, avec d'excellentes compétences en communication et une capacité à résoudre des problèmes sous pression.",
  },
  {
    id: 10,
    title: "Consultant ERP",
    description:
      "Nous recrutons un Consultant ERP expérimenté pour accompagner nos clients dans l'implémentation et l'optimisation de leurs systèmes ERP. Vous serez impliqué dans l'analyse des besoins, la configuration du logiciel et la formation des utilisateurs finaux. Une expertise dans des plateformes comme SAP, Oracle ou Microsoft Dynamics est fortement souhaitée. Nous recherchons une personne proactive, avec un esprit analytique et une capacité à s'adapter rapidement à des environnements variés. Rejoignez notre équipe pour relever des défis passionnants.",
  }
];
    localStorage.setItem('announcements', JSON.stringify(initialData));
    announcements.value = initialData;
  } else {
    announcements.value = JSON.parse(existingData);
  }

  existingData = localStorage.getItem('users');
  if (!existingData) {
    const initialData = [
        {
          id: 0,
          userType: "Entreprise",
          name: "Entreprise A",
          secteur: "Informatique",
          description: "Entreprise A est une entreprise spécialisée dans le développement de logiciels et la gestion de projets informatiques. Nous travaillons avec des clients variés pour concevoir des solutions sur mesure et innovantes. Notre équipe est composée de professionnels passionnés par la technologie et l'innovation. Si vous cherchez un environnement dynamique et stimulant pour développer vos compétences, rejoignez-nous !",
          annonces: [1, 2, 3, 4, 5],
          adresse: "123 Rue de l'Innovation, 75000 Paris",

        }
      , 
        {
          id: 1,
          userType: "Individu",
          description:
            "Vous êtes un expert en gestion de projets informatiques avec une expérience avérée dans la coordination d'équipes interdisciplinaires ? Rejoignez-nous en tant que Chef de Projet IT et aidez à piloter des initiatives stratégiques. Vos responsabilités incluront la planification, l'exécution et la supervision des projets pour garantir leur livraison dans les délais et le respect des budgets. Une connaissance approfondie des méthodologies Agile et Scrum est requise. Nous recherchons une personne communicative et organisée, capable de motiver son équipe pour atteindre les objectifs communs.",
        }
    ];
    localStorage.setItem('users', JSON.stringify(initialData));
  } 

}

onMounted(() => {
  initializeLocalStorage();
});

watch(announcements, (newValue) => {
  localStorage.setItem('announcements', JSON.stringify(newValue));
}, { deep: true });


const filteredAnnouncements = computed(() => {
  if (!search.value) {
    return announcements.value
  }
  const searchLower = search.value.toLowerCase()
  return announcements.value.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchLower) ||
      announcement.description.toLowerCase().includes(searchLower),
  )
})

function postAnnouncement() {
  // Logique pour poster une annonce
  console.log('Poster une annonce')
}
</script>
<style>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-bar {
  flex-grow: 1;
  margin-right: 1rem;
}

.post-btn-container {
  flex-shrink: 0;
}
</style>
