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
