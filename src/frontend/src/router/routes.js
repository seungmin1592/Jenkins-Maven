import LayoutAuth from '@/layouts/LayoutAuth.vue';

export default [
    {
      path: '/',
      name: 'Main',
      meta: {
        layout: LayoutAuth,
        authRequired: false,
      },
      component: () => import("@/views/Auth/Main.vue")
    },

  ]