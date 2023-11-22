
const routes = [
  {
    path: '/',
    component: () => import('layouts/BasicLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('components/Login.vue'),
        meta: {
          checkRedirect: true
        }
      },
      {
        path: '/login',
        name:'login',
        component: () => import('components/Login.vue')
      },


    ]

  },
  {
    path: '/test',
    component: () => import('src/nucleus/test.vue')
  },
{
  path: '/hari',
  component: () => import('src/nucleus/hari.vue')
},
{
  path: '/bal',
  component: () => import('src/nucleus/bal.vue')
},

  {
    path: '/theHub',
    component: () => import('layouts/AppLayout.vue'),
    meta: {
      requiresAuth: true
    },

    children: [
      {
        path: '',
        name: 'landingPage',
        component: () => import('components/LandingPage.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path:'/abc',
        name: 'abc',
        meta: {
          requiresAuth: true
        },
        component: () => import('src/pages/abc.vue')
      },
      {
        path:'/GoogleChart',
        name: 'GoogleChart',
        meta: {
          requiresAuth: true
        },
        component: () => import('src/components/GoogleChart.vue')
      },
      {
        path:'/ graphline',
        name: ' graphline',
        meta: {
          requiresAuth: true
        },
        component: () => import('src/components/graphline.vue')
      },
      {
        path:'/ harigraphone',
        name: ' harigraphone',
        meta: {
          requiresAuth: true
        },
        component: () => import('src/components/harigraphone.vue')
      },
      {
        path:'/ harigraphtwo',
        name: ' harigraphtwo',
        meta: {
          requiresAuth: true
        },
        component: () => import('src/components/harigraphtwo.vue')
      },
      {
        path:'/ balrajgraphone',
        name: '/ balrajgraphone',
        meta: {
          requiresAuth: true
        },
        component: () => import('src/components/balrajgraphone.vue')
      },
      {
        path:'/ balrajgraphtwo',
        name: ' balrajgraphtwo',
        meta: {
          requiresAuth: true
        },
        component: () => import('src/components/balrajgraphtwo.vue')
      },
      {
        path: '/nucleus',
        name: 'viewCommunicationDashboard',
        meta: {
          requiresAuth: true
        },
        component: () => import('src/nucleus/ViewCommunicationDashboard.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  })
}

export default routes
