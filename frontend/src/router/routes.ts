import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AccountPage.vue') }],
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ProductsPage.vue') }],
  },
  {
    path: '/recommendation',
    name: 'recommendation',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/RecommendationPage.vue') },
    ],
  },
  {
    path: '/routinesList',
    name: 'routinesList',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/RoutinesListPage.vue') },
    ],
  },
  {
    path: '/routines/:id',
    name: 'routines',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/RoutinePage.vue') }],
  },
  {
    path: '/routines/:id',
    name: 'routines',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/RoutinePage.vue') }],
  },
  {
    path: '/tracker',
    name: 'tracker',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/TrackerPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
