import { Users } from "@/api";
import axios from "axios";

const state = () => ({
  isAuth: false,
  user: {},
  users: [],
});

const getters = {
  isAdmin: (state) => {
    if (!state.user) return false;
    return state.user.roles.find((item) => item === "ADMIN") ? true : false;
  },
};

const actions = {
  userLogin({ commit }, payload) {
    return Users.login(payload)
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("token", res.data.accessToken);
          commit("setIsAuth", true);
          commit("setUser", res.data.user);
        }
        return res;
      })
      .catch((err) => {
        console.log(err, "Users.login");
      });
  },
  userRegistration({ commit }, payload) {
    return Users.registration(payload)
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("token", res.data.accessToken);
          commit("setIsAuth", true);
          commit("setUser", res.data.user);
        }
        return res;
      })
      .catch((err) => console.log(err, "registration"));
  },
  userLogout({ commit }) {
    return Users.logout()
      .then((res) => {
        localStorage.removeItem("token");
        commit("setIsAuth", false);
        commit("setUser", {});
        return res;
      })
      .catch((err) => console.log(err, "registration"));
  },
  async checkAuth({ commit }) {
    try {
      const API_URL = process.env.NODE_ENV === "production" ? `${process.env.VUE_APP_ADDRESS}/api` : "http://localhost:5000/api";
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      commit("setIsAuth", true);
      commit("setUser", response.data.user);
    } catch (e) {
      console.log(e);
    }
  },
  getUsers({ commit }) {
    Users.getUsers()
      .then((res) => {
        console.log(res, "getUsers");
      })
      .catch((err) => console.log(err, "registration"));
  },
  activationmail({ commit }) {
    Users.activationmail()
      .then((res) => {
        console.log(res, "activationmail");
      })
      .catch((err) => console.log(err, "activationmail"));
  },
  setUserApi({ commit }, payload) {
    return  Users.setUser(payload)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err, "setUser"));
  },
};

const mutations = {
  setIsAuth(state, value) {
    state.isAuth = value;
  },
  setUsers(state, value) {
    state.users = value;
  },
  setUser(state, value) {
    state.user = value;
  },
};

export default {
  namespaced: true,
  namespace: "user",
  state,
  getters,
  actions,
  mutations,
};
