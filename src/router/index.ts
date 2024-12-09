import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import HomeView from "@/views/HomeView/HomeView.vue";
import StopsView from "@/views/StopsView/StopsView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name:"home",
    component: HomeView,
  },
  {
    path: "/stops",
    name: "stops",
    component: StopsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
