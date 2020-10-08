const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'start',
        component: () => import('pages/Index.vue')
      }
    ]
  },
  {
    path: '/terms',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'terms',
        component: () => import('pages/Agreement.vue')
      }
    ]
  },
  {
    path: '/policy',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'policy',
        component: () => import('pages/Responsibility.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    meta: {
      unAuth: true
    },
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/login/Index.vue')
      }
    ]
  },
  // {
  //   path: '/preorder',
  //   component: () => import('layouts/MainLayout.vue'),
  //   meta: {
  //     auth: true
  //   },
  //   children: [
  //     {
  //       path: '',
  //       name: 'preorder',
  //       component: () => import('pages/preorder/Index.vue')
  //     }
  //   ]
  // },
  {
    path: '/history',
    meta: {
      auth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'history',
        component: () => import('pages//history/Index.vue')
      }
    ]
  },
  {
    path: '/pay',
    meta: {
      auth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'payment',
        component: () => import('pages/payment/Index.vue')
      },
      {
        path: 'success',
        name: 'payment.success',
        component: () => import('pages/payment/Success.vue')
      },
      {
        path: 'fail',
        name: 'payment.fail',
        component: () => import('pages/payment/Fail.vue')
      }
    ]
  },
  {
    path: '/settings',
    meta: {
      auth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'settings',
        component: () => import('pages/settings/Index.vue')
      }
    ]
  },
  {
    path: '/support',
    meta: {
      auth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'support',
        component: () => import('pages/support/Index.vue')
      },
      {
        path: ':id',
        name: 'support.page',
        component: () => import('pages/support/Page.vue')
      }
    ]
  },
  {
    path: '/ride',
    meta: {
      auth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'ride',
        component: () => import('pages/ride/Index.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
