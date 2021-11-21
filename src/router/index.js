import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import EditArticle from "../views/EditArticle.vue";
import ViewArticle from "../views/ViewArticle.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/edit-article/:postId",
    name: "EditArticle",
    component: EditArticle,
    props: true,
  },
  {
    path: "/view-article/:postId",
    name: "ViewArticle",
    component: ViewArticle,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
