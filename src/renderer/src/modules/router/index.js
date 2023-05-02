import { createRouter, createWebHashHistory } from "vue-router"

// const home = () => import("../views/home")
// const login = () => import("../views/login")
import home from '../views/home.vue';
import login from '../views/login.vue';
import settings from "../views/settings.vue";
import pkGen from "../views/pkGen.vue";
import digiSign from "../views/digiSign.vue";
import verifySign from "../views/verifySign.vue";

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: home
  },
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/pkGen",
    name: "pkGen",
    component: pkGen
  },
  {
    path: "/settings",
    name: "settings",
    component: settings
  },
  {
    path: "/digiSign",
    name: "digiSign",
    component: digiSign
  },
  {
    path: "/verifySign",
    name: "verifySign",
    component: verifySign
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
