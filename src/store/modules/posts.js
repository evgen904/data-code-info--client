import { Posts } from "@/api";
import getPosts from "@/api/posts/getPosts";
import getPostsUser from "@/api/posts/getPostsUser";

const state = () => ({
  posts: [],
});

const getters = {};

const actions = {
  addPost({ commit }, payload) {
    return Posts.addPost(payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  setPublishPost({ commit }, payload) {
    return Posts.setPublishPost(payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getPosts({ commit }, payload) {
    let folderName = {
      folder: payload.folder,
    };
    if (payload.isUserFolder) {
      return Posts.getPostsFolderUser(folderName)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return Posts.getPosts(folderName)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  getPostsUser({ commit }) {
    return Posts.getPostsUser()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getPostsModeration({ commit }) {
    return Posts.getPostsModeration()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  removePost({ commit }, payload) {
    return Posts.removePost(payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  editPost({ commit }, payload) {
    return Posts.editPost(payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  setPost({ commit }, payload) {
    return Posts.setPost(payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const mutations = {
  setFolders(state, value) {
    state.folders = value;
  },
};

export default {
  namespaced: true,
  namespace: "post",
  state,
  getters,
  actions,
  mutations,
};
