import Vue from "vue";
import Vuex from "vuex";
import { fb } from "../db.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    loadUser(state) {
      state.user = fb.auth().currentUser;
    },
    resetUser(state) {
      state.user = {};
    }
  },
  actions: {
    loadUserAction(context) {
      context.commit("loadUser");
    },
    resetUserAction(context) {
      context.commit("resetUser");
    }
  },
  modules: {}
});
