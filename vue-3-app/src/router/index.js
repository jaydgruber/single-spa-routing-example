import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/ping'
  },
  {
    path: '/ping',
    name: 'Ping',
    component: { template: `<h2>Ping</h2>` }
  },
  {
    path: '/companies',
    name: 'Companies',
    component: { template: `<router-view></router-view>` },
    children: [
      {
        name: 'newCompany',
        path: 'new',
        component: { template: `<h2>New Company</h2>` },
      },
      {
        name: 'editCompany',
        path: ':id',
        component: { template: `<h2>Edit Company</h2>` },
      },
      {
        name: 'companiesList',
        path: '',
        component: { template: `<h2>Companies List</h2>` },
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory('/vue-3-app/'),
  routes
});

export default router;
