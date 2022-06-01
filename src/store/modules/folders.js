import { Folders } from "@/api";

const state = () => ({
  foldersAll: [],
  foldersUser: [],
});

const getters = {};

const actions = {
  addFolder({ commit }, payload) {
    return Folders.addFolder(payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  setFolder({ commit }, payload) {
    return Folders.setFolder(payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  removeFolder({ commit }, payload) {
    return Folders.removeFolder(payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getFoldersAll({ commit }) {
    return Folders.getFoldersAll()
      .then((res) => {
        if (res?.data) {
          commit("setFoldersAll", res.data);
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getFoldersUser({ commit }) {
    return Folders.getFoldersUser()
      .then((res) => {
        if (res?.data) {
          commit("setFoldersUser", res.data);
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const mutations = {
  setFoldersAll(state, value) {
    state.foldersAll = value;
  },
  setFoldersUser(state, value) {
    state.foldersUser = value;
  },
};

export default {
  namespaced: true,
  namespace: "folders",
  state,
  getters,
  actions,
  mutations,
};
