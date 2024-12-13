const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/announce/:id',
        component: () => import('pages/AnnonceDetailsPage.vue'), // La page de détail de l'annonce
        props: true, // Passe l'ID comme prop à la page
      },
      {
        path: '/signupc',
        name: 'signupc',
        component: () => import('pages/SignupCompanyPage.vue'),
      },
      {
        path: '/signupi',
        name: 'signupi',
        component: () => import('pages/SignupIndividualPage.vue'),
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: '/add-annonce',
        name: 'add-annonce',
        component: () => import('pages/AjoutAnnoncePage.vue'),
      },
      {
        path: '/contacts',
        name: 'contacts',
        component: () => import('pages/ContactsPage.vue'),
      },
      {
        path: "/profile/:id",
        name: "Profile",
        component: () => import("pages/ProfilePage.vue"),
      },
      {
        path: "/messagerie",
        name: "Messagerie",
        component: () => import("pages/MessageriePage.vue"),
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
