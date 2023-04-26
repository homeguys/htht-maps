import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views'),
  },
  {
    path: '/zhihu',
    name: 'Zhihu',
    component: () => import(/* webpackChunkName: "zhihu" */ '../views/Zhihu/index.vue'),
    children: [
      {
        path: '/zhihu/home',
        name: 'ZhihuHome',
        component: () => import(/* webpackChunkName: "zhihuHome" */ '../views/Zhihu/home.vue'),
      },
      {
        path: '/zhihu/login',
        name: 'ZhihuLogin',
        component: () => import(/* webpackChunkName: "zhihuLogin" */ '../views/Zhihu/login.vue'),
      },
      {
        path: '/zhihu/login',
        name: 'Zhihulogin',
        component: () => import(/* webpackChunkName: "zhihuLogin" */ '../views/Zhihu/login.vue'),
        meta: { redirectAlreadyLogin: true },
      },
      {
        path: '/zhihu/signup',
        name: 'Zhihusignup',
        component: () => import(/* webpackChunkName: "Zhihusignup" */ '../views/Zhihu/Signup.vue'),
        meta: { redirectAlreadyLogin: true },
      },
      {
        path: '/zhihu/create',
        name: 'ZhihuCreate',
        component: () => import(/* webpackChunkName: "ZhihuCreate" */ '../views/Zhihu/CreatePost.vue'),
        meta: { requiredLogin: true },
      },
      {
        path: '/zhihu/column/:id',
        name: 'ZhihuColumn',
        component: () => import(/* webpackChunkName: "ZhihuColumn" */ '../views/Zhihu/ColumnDetail.vue'),
      },
      {
        path: '/zhihu/posts/:id',
        name: 'ZhihuPost',
        component: () => import(/* webpackChunkName: "ZhihuPost" */ '../views/Zhihu/PostDetail.vue'),
      },
    ],
  },
  {
    path: '/cesium',
    name: 'Cesium',
    component: () => import(/* webpackChunkName: "cesium" */ '../views/Cesium.vue'),
  },
  {
    path: '/ol',
    name: 'OL',
    component: () => import(/* webpackChunkName: "ol" */ '../views/OL.vue'),
  },
  {
    path: '/mapbox-gl',
    name: 'mapbox-gl',
    component: () => import(/* webpackChunkName: "mapbox" */ '../views/MapBox-gl.vue'),
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import(/* webpackChunkName: "editor" */ '../views/Editor'),
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import(/* webpackChunkName: "demo" */ '../views/Demo.vue'),
  },
];

// router.beforeEach((to, from, next) => {
//   const { requiredLogin, redirectAlreadyLogin } = to.meta;

// })

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
