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

      <div v-if="currentUser&&currentUser.userType === 'Entreprise'" class="post-btn-container">
        <q-btn label="Poster une annonce" color="primary" @click="postAnnouncement" />
      </div>
      <div v-if="currentUser" class="post-btn-container">
        <q-btn label="Se déconnecter" color="primary" @click="postLogOut" />
      </div>
      <div v-if="!currentUser" class="post-btn-container">
        <q-btn label="Se connecter" color="primary" @click="postLogIn" />
        <q-btn label="S'inscrire entreprise" color="primary" @click="postSignInEntreprise" />
        <q-btn label="S'inscrire particulier" color="primary" @click="postSigninParticulier" />
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
import { useRouter } from 'vue-router'
import AnnouncementList from 'components/AnnouncementList.vue'


const router = useRouter()
const search = ref('')
//const userType = ref('entreprise') // ou 'particulier'
const announcements = ref([])
const currentUser = ref(null);

function initializeLocalStorage() {
  const existingAnnonces = localStorage.getItem('announcements');
  if (!existingAnnonces) {

    const initialData = [
      {
        id: 1,
        title: 'Développeur Web Full-Stack',
        contract: 'CDD',
        salaire: '1500 - 2000k €',
        entrepriseID: 0,
        candidats: [1],
        description: "Nous recherchons un développeur web full-stack passionné pour rejoindre notre équipe dynamique. Vous serez responsable de concevoir, développer et maintenir des applications web robustes et performantes. Vous travaillerez sur des technologies modernes telles que React, Node.js et MongoDB. Une expérience avec les frameworks de développement rapide et les API REST est essentielle. En outre, nous valorisons les compétences en résolution de problèmes et une forte volonté d'apprendre. Si vous aimez relever des défis et travailler dans un environnement collaboratif, cette opportunité est faite pour vous !",
        profileRecherche: "Employé impliqué, passionné par le développement web et les technologies modernes. Expérience avec React, Node.js et MongoDB. Compétences en résolution de problèmes et en collaboration.",
        competancesRecherche: ["React", "Node.js", "MongoDB", "API REST", "Résolution de problèmes", "Collaboration"],
        avantages: ["Environnement de travail dynamique", "Opportunités de formation", "Projets innovants"],
      },
      {
        id: 2,
        title: 'Chef de Projet IT',
        contract: 'CDI',
        salaire: '2500 - 3000k €',
        entrepriseID: 0,
        candidats: [1],
        description: "Vous êtes un expert en gestion de projets informatiques avec une expérience avérée dans la coordination d'équipes interdisciplinaires ? Rejoignez-nous en tant que Chef de Projet IT et aidez à piloter des initiatives stratégiques. Vos responsabilités incluront la planification, l'exécution et la supervision des projets pour garantir leur livraison dans les délais et le respect des budgets. Une connaissance approfondie des méthodologies Agile et Scrum est requise. Nous recherchons une personne communicative et organisée, capable de motiver son équipe pour atteindre les objectifs communs.",
        profileRecherche: "Chef de projet expérimenté, avec une expertise en gestion de projets informatiques. Connaissance des méthodologies Agile et Scrum. Capacité à motiver et à coordonner des équipes interdisciplinaires.",
        competancesRecherche: ["Gestion de projets", "Agile", "Scrum", "Communication", "Coordination d'équipes"],
        avantages: ["Environnement de travail stimulant", "Opportunités de développement professionnel", "Projets stratégiques"],
      },
      {
        id: 3,
        title: 'Designer UI/UX',
        contract: 'Freelance',
        salaire: 'À discuter',
        entrepriseID: 0,
        candidats: [],
        description: "Notre entreprise est à la recherche d'un designer UI/UX talentueux pour améliorer l'expérience utilisateur de nos produits numériques. Vous serez en charge de la recherche utilisateur, de la création de wireframes, de prototypes interactifs et de l'élaboration de designs attrayants. Une maîtrise des outils comme Figma, Adobe XD ou Sketch est indispensable. Nous apprécions les profils ayant une approche centrée sur l'utilisateur et capables de transformer des concepts complexes en interfaces intuitives. Si vous avez un œil pour les détails et une passion pour le design fonctionnel, rejoignez notre équipe.",
        profileRecherche: "Designer UI/UX créatif, avec une expérience dans la recherche utilisateur et la conception d'interfaces. Maîtrise des outils de design (Figma, Adobe XD, Sketch). Approche centrée sur l'utilisateur et souci du détail.",
        competancesRecherche: ["UI Design", "UX Design", "Recherche utilisateur", "Wireframing", "Prototypage", "Outils de design"],
        avantages: ["Projets variés et stimulants", "Collaboration avec des experts du secteur", "Liberté créative"],
      },
      {
        id: 4,
        title: 'Analyste Data Scientist',
        contract: 'Stage',
        salaire: 'Non rémunéré',
        entrepriseID: 0,
        candidats: [],
        description: "En tant qu'Analyste Data Scientist, vous jouerez un rôle clé dans la collecte, l'analyse et l'interprétation des données pour aider à la prise de décision stratégique. Vous utiliserez des outils comme Python, R ou SQL pour explorer les ensembles de données complexes et fournir des insights clairs et exploitables. Une expérience dans les modèles de machine learning et les visualisations de données est fortement souhaitée. Si vous avez un esprit analytique et un désir de résoudre des problèmes réels à l'aide de données, nous aimerions travailler avec vous.",
        profileRecherche: "Étudiant en data science ou domaine connexe, avec une passion pour l'analyse de données. Connaissance de Python, R ou SQL. Intérêt pour les modèles de machine learning et les visualisations de données.",
        competancesRecherche: ["Data Analysis", "Python", "R", "SQL", "Machine Learning", "Visualisations de données"],
        avantages: ["Expérience pratique en data science", "Encadrement par des experts du secteur", "Possibilité d'impacter les décisions stratégiques"],
      },
      {
        id: 5,
        title: 'Responsable Marketing Digital',
        contract: 'CDI',
        salaire: '2000 - 2500k €',
        entrepriseID: 0,
        candidats: [],
        description: "Nous cherchons un Responsable Marketing Digital pour élaborer et mettre en œuvre des stratégies innovantes qui renforcent notre présence en ligne. Vous superviserez les campagnes de publicité payante, l'optimisation SEO, le marketing de contenu et la gestion des réseaux sociaux. Une connaissance approfondie des outils tels que Google Ads, Analytics et des plateformes de gestion de contenu est cruciale. Nous recherchons une personne créative, motivée et axée sur les résultats, capable de transformer les tendances numériques en opportunités de croissance.",
        profileRecherche: "Expert en marketing digital, avec une expérience dans la gestion de campagnes en ligne. Connaissance des outils Google Ads, Analytics et des réseaux sociaux. Créativité, motivation et orientation résultats.",
        competancesRecherche: ["Marketing Digital", "Publicité en ligne", "SEO", "Google Ads", "Analytics", "Gestion de contenu"],
        avantages: ["Projets stimulants et variés", "Opportunités d'évolution", "Impact direct sur la croissance de l'entreprise"],
      },
      {
        id: 6,
        title: 'Ingénieur DevOps',
        contract: 'CDI',
        salaire: '2500 - 3000k €',
        entrepriseID: 0,
        candidats: [],
        description: "Rejoignez notre équipe en tant qu'Ingénieur DevOps pour optimiser nos processus de développement et de déploiement. Vous serez responsable de l'automatisation des pipelines CI/CD, de la surveillance des performances des systèmes et de la résolution proactive des incidents. Une expertise en Docker, Kubernetes et les services cloud tels qu'AWS ou Azure est essentielle. Nous valorisons les profils capables de collaborer efficacement avec les équipes de développement et d'opérations pour atteindre des objectifs ambitieux.",
        profileRecherche: "Ingénieur DevOps expérimenté, avec une connaissance approfondie des outils d'automatisation et des services cloud. Expertise en Docker, Kubernetes, AWS ou Azure. Capacité à collaborer avec des équipes interdisciplinaires.",
        competancesRecherche: ["DevOps", "Automatisation", "CI/CD", "Docker", "Kubernetes", "Cloud Computing"],
        avantages: ["Environnement de travail collaboratif", "Projets innovants", "Opportunités de formation continue"],
      },
      {
        id: 7,
        title: 'Consultant en Cybersécurité',
        contract: 'Freelance',
        salaire: 'À discuter',
        entrepriseID: 0,
        candidats: [],
        description: "Nous sommes à la recherche d'un Consultant en Cybersécurité pour protéger nos systèmes d'information contre les menaces croissantes. Vous effectuerez des audits de sécurité, élaborerez des politiques de protection et mettrez en œuvre des solutions de sécurité avancées. Une connaissance des normes comme ISO 27001, ainsi qu'une maîtrise des outils d'analyse de vulnérabilités, est requise. Si vous êtes passionné par la cybersécurité et que vous aimez anticiper et neutraliser les menaces, cette mission vous correspondra parfaitement.",
        profileRecherche: "Expert en cybersécurité, avec une expérience dans l'audit et la protection des systèmes d'information. Connaissance des normes ISO 27001 et des outils de sécurité. Passion pour la protection des données et la prévention des menaces.",
        competancesRecherche: ["Cybersécurité", "Audit de sécurité", "ISO 27001", "Analyse de vulnérabilités", "Protection des données"],
        avantages: ["Mission stratégique et impactante", "Collaboration avec des experts en sécurité", "Opportunités de développement professionnel"],
      },
      {
        id: 8,
        title: 'Assistant Administratif',
        contract: 'CDD',
        salaire: '1200 - 1500k €',
        entrepriseID: 0,
        candidats: [1],
        description: "Nous recherchons un Assistant Administratif pour apporter un soutien organisationnel à notre équipe. Vous serez en charge de la gestion des agendas, de la rédaction de rapports et de la coordination des communications internes. Une excellente maîtrise des outils bureautiques comme Microsoft Office est requise. Nous privilégions les profils rigoureux, multitâches et capables de travailler sous pression tout en maintenant une grande attention aux détails. Si vous cherchez un rôle varié au sein d'une entreprise dynamique, postulez dès maintenant.",
        profileRecherche: "Assistant Administratif organisé, avec une maîtrise des outils bureautiques. Capacité à gérer des tâches multiples et à travailler sous pression. Rigoureux et souci du détail.",
        competancesRecherche: ["Assistanat", "Gestion administrative", "Microsoft Office", "Organisation", "Gestion des tâches"],
        avantages: ["Environnement de travail stimulant", "Opportunités d'évolution", "Collaboration avec des professionnels expérimentés"],
      },
      {
        id: 9,
        title: 'Technicien Support Informatique',
        contract: 'CDI',
        salaire: '1500 - 2000k €',
        entrepriseID: 0,
        candidats: [1],
        description: "Rejoignez notre équipe en tant que Technicien Support Informatique et devenez un pilier essentiel pour nos utilisateurs. Vous serez responsable de la gestion des demandes de support, du diagnostic des problèmes techniques et de la mise en œuvre de solutions efficaces. Une bonne connaissance des systèmes d'exploitation (Windows, macOS, Linux) et des réseaux est indispensable. Nous recherchons une personne orientée service client, avec d'excellentes compétences en communication et une capacité à résoudre des problèmes sous pression.",
        profileRecherche: "Technicien Support Informatique passionné, avec une expertise dans les systèmes d'exploitation et les réseaux. Compétences en service client, communication et résolution de problèmes. Capacité à travailler sous pression.",
        competancesRecherche: ["Support Informatique", "Systèmes d'exploitation", "Réseaux", "Service client", "Communication", "Résolution de problèmes"],
        avantages: ["Environnement de travail collaboratif", "Opportunités de développement professionnel", "Soutien continu"],
      },
      {
        id: 10,
        title: 'Consultant ERP',
        contract: 'CDI',
        salaire: '2000 - 2500k €',
        entrepriseID: 0,
        candidats: [1],
        description: "Nous recrutons un Consultant ERP expérimenté pour accompagner nos clients dans l'implémentation et l'optimisation de leurs systèmes ERP. Vous serez impliqué dans l'analyse des besoins, la configuration du logiciel et la formation des utilisateurs finaux. Une expertise dans des plateformes comme SAP, Oracle ou Microsoft Dynamics est fortement souhaitée. Nous recherchons une personne proactive, avec un esprit analytique et une capacité à s'adapter rapidement à des environnements variés. Rejoignez notre équipe pour relever des défis passionnants.",
        profileRecherche: "Consultant ERP spécialisé, avec une expérience dans l'implémentation de systèmes ERP. Connaissance des plateformes SAP, Oracle, Microsoft Dynamics. Proactivité, esprit analytique et adaptabilité.",
        competancesRecherche: ["Consultant ERP", "Implémentation", "SAP", "Oracle", "Microsoft Dynamics", "Formation"],
        avantages: ["Projets variés et stimulants", "Collaboration avec des clients de renom", "Opportunités de développement professionnel"],
      },
    ]
    localStorage.setItem('announcements', JSON.stringify(initialData))
    announcements.value = initialData
  } else {
    announcements.value = JSON.parse(existingAnnonces);
  }

  const existingUsers = localStorage.getItem('users');
  if (!existingUsers) {

    const initialData = [
      {
        id: 0,
        userType: 'Entreprise',
        name: 'Entreprise A',
        secteur: 'Informatique',
        description:
          "Entreprise A est une entreprise spécialisée dans le développement de logiciels et la gestion de projets informatiques. Nous travaillons avec des clients variés pour concevoir des solutions sur mesure et innovantes. Notre équipe est composée de professionnels passionnés par la technologie et l'innovation. Si vous cherchez un environnement dynamique et stimulant pour développer vos compétences, rejoignez-nous !",
        annonces: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        adresse: "123 Rue de l'Innovation, 75000 Paris",
        nomContact: "Jean Dupont",
        emailContact: "jean.dupont@out.fr",
        telContact: "01 23 45 67 89",
        siteWeb: "www.entrepriseA.com",
        contacts: [1],
        email: "accueil.entreprisea@out.fr",
        password: "azerty123",
      },
      {
        id: 1,
        userType: 'Individu',
        name: 'Dupond',
        surname: 'Jeanne',
        email: 'jeanne.dupond@out.fr',
        adresse: "123 Rue des Anges, 75000 Paris",
        tel: "04 23 55 67 89",
        contacts: [0],
        profile: "Développeur web passionné par les nouvelles technologies et les projets innovants. Expérience dans la conception et le développement d'applications web. Compétences en HTML, CSS, JavaScript et React. Recherche de nouvelles opportunités pour mettre en pratique mes compétences et contribuer à des projets stimulants.",
        diplomes: [{title: "Licence Informatique", year: "2019"}, {title: "BTS Développement Web", year: "2017"}],
        experiences: [{company: "Startup XYZ", role: "Développeur Web", duration: "2019 - 2021"}, {company: "Agence Web ABC", role: "Stagiaire Développeur", duration: "2016"}],
        competances: ["HTML", "CSS", "JavaScript", "React", "Développement Web"],
        password: "123azerty",
      },
    ]
    localStorage.setItem('users', JSON.stringify(initialData))
  }
  currentUser.value = JSON.parse(localStorage.getItem('currentUser'));
}

onMounted(() => {
  initializeLocalStorage()
})

watch(
  announcements,
  (newValue) => {
    localStorage.setItem('announcements', JSON.stringify(newValue))
  },
  { deep: true },
)

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
  router.push('/add-annonce')
}

function postSignInEntreprise() {
  router.push('/signupc')
}

function postSigninParticulier() {
  router.push('/signupi')
}

function postLogIn() {
  router.push('/login')
}

function postLogOut() {
  localStorage.removeItem('currentUser')
  currentUser.value = null
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
