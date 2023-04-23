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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
