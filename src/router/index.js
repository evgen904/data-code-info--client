import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import guest from "./middleware/guest";
import auth from "./middleware/auth";
import middlewarePipeline from "./middlewarePipeline";

const routes = [
  {
    path: "/ui",
    name: "UI",
    component: () => import("@/views/UiView"),
  },
  {
    path: "/",
    name: "JsView",
    component: () => import("@/views/JsView"),
  },
  {
    path: "/folder",
    name: "FolderView",
    component: () => import("@/views/FolderView"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/post",
    name: "PostView",
    component: () => import("@/views/PostView"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/profile",
    name: "ProfileView",
    component: () => import("@/views/ProfileView"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/post/:id",
    name: "PostViewEdit",
    component: () => import("@/views/PostView"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/posts/",
    name: "PostsView",
    component: () => import("@/views/PostsView"),
    children: [
      {
        path: "/posts/:folder",
        name: "CardList",
        component: () => import("@/components/CardList"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    store,
  };
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
