import { createRouter, createWebHashHistory } from "vue-router"

// const home = () => import("../views/home")
// const login = () => import("../views/login")
import home from '../views/home.vue';
import keyManager from "../views/keyManager.vue";
// import stableDiffusion from "../views/stableDiffusion.vue";
// import midJourney from "../views/midJourney.vue";
// import dallE from "../views/dallE.vue";

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
  },
  // {
  //   path: "/stableDiffusion",
  //   name: "stableDiffusion",
  //   component: stableDiffusion
  // },
  // {
  //   path: "/midJourney",
  //   name: "midJourney",
  //   component: midJourney
  // },
  // {
  //   path: "/dallE",
  //   name: "dallE",
  //   component: dallE
  // },
  {
    path: '/serialPort',
    name: 'serial-port',
    component: () => import('../views/serialPort.vue')
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
