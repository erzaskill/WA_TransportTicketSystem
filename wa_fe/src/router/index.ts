import Homepage from "@/router/pages/Homepage.vue";
import Tickets from "@/router/pages/Tickets.vue";
import Stations from "@/router/pages/Stations.vue";
import Login from "@/router/pages/Login.vue";
import Register from "@/router/pages/Register.vue"
import NotFound from "@/router/pages/NotFound.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";


const routes: RouteRecordRaw[] = [
  { path: "/", component: Homepage, name: "homepage" },
  { path: "/login", component: Login, name: "login" },
  { path: "/register", component: Register, name: "register" },
  {
    path: "/stations",
    component: Stations,
    name: "stations",
    meta: { requiresAuth: false },
  },
  {
    path: "/tickets",
    component: Tickets,
    name: "tickets",
    meta: { requiresAuth: true },
  },
  { path: "/:pathMatch(.*)*", component: NotFound, name: "notfound" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.user;

  if (requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
