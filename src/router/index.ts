import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Zhihu',
    component: () => import(/* webpackChunkName: "zhihu" */ '../views/Zhihu/index.vue')
  },
  {
    path: '/cesium',
    name: 'Cesium',
    component: () => import(/* webpackChunkName: "cesium" */ '../views/Cesium.vue')
  },
  {
    path: '/ol',
    name: 'OL',
    component: () => import(/* webpackChunkName: "ol" */ '../views/OL.vue')
  },
  {
    path: '/mapbox-gl',
    name: 'mapbox-gl',
    component: () => import(/* webpackChunkName: "mapbox" */ '../views/MapBox-gl.vue')
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import(/* webpackChunkName: "editor" */ '../views/Editor')
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import(/* webpackChunkName: "demo" */ '../views/Demo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
