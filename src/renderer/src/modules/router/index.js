import { createRouter, createWebHashHistory } from "vue-router"

// const home = () => import("../views/home")
// const login = () => import("../views/login")
import home from '../views/home.vue';
import keyManager from "../views/keyManager.vue";

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: home
  },
  {
    path: "/keyManager",
    name: "keyManager",
    component: keyManager
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
