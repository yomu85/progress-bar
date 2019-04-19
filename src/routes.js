import VueRouter from "vue-router";

import HelloWorld from "./components/HelloWorld";
import View_hereFoods from "./components/View_hereFoods";

export const router = new VueRouter({
  mode: "history",
  routes: [{
      name: "HelloWorld",
      path: "/helloworld",
      component: HelloWorld
    },
    {
      name: "hereFoods",
      path: "/herefoods",
      component: View_hereFoods
    }
  ]
});