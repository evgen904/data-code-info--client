import { createStore } from "vuex";
import user from "./modules/user";
import folders from "./modules/folders";
import posts from "./modules/posts";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    folders,
    posts,
  },
});
