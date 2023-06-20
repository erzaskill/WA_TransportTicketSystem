import Homepage from "@/router/pages/Homepage.vue";
import Planets from "@/router/pages/Planets.vue";
import Planet from "@/router/pages/Planet.vue";
import Tickets from "@/router/pages/Tickets.vue";
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
    path: "/planets",
    component: Planets,
    name: "planets",
    meta: { requiresAuth: true },
  },
  {
    path: "/planets/:id",
    component: Planet,
    name: "planet",
    props: true,
    meta: { requiresAuth: true },
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
