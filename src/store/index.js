import Vue from "vue";
import Vuex from "vuex";
import { db, fb } from "../db.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    xp: [],
    bio: {}
  },
  mutations: {
    loadUser(state) {
      state.user = fb.auth().currentUser;
    },
    resetUser(state) {
      state.user = {};
    },
    loadXp(state) {
      let xp = [];
      let xpRef = db
        .collection("provider")
        .doc(state.user.email)
        .collection("experience")
        .orderBy("end_date", "desc");
      xpRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let exp = doc.data();
          exp.id = doc.id;
          xp.push(exp);
        });
      });
      state.xp = xp;
    },
    loadBio(state) {
      let bio = {};
      db.collection("provider")
        .doc(state.user.email)
        .get()
        .then(snapshot => {
          bio.first_name = snapshot.data().first_name;
          bio.last_name = snapshot.data().last_name;
          bio.address = snapshot.data().address;
          bio.phone_number = snapshot.data().phone_number;
          bio.zip_code = snapshot.data().zip_code;
          bio.resume = snapshot.data().resume;
          bio.avatar = snapshot.data().avatar;
        })
        .catch(error => {
          alert(error);
        });
      state.bio = bio;
    },
    deleteXp(state, id) {
      let xpRef = db
        .collection("provider")
        .doc(state.user.email)
        .collection("experience")
        .doc(id);
      xpRef
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    }
  },
  actions: {
    loadUserAction(context) {
      context.commit("loadUser");
    },
    resetUserAction(context) {
      context.commit("resetUser");
    },
    loadXpAction(context) {
      context.commit("loadXp");
    },
    loadBioAction(context) {
      context.commit("loadBio");
    },
    deleteXpAction(context, id) {
      context.commit("deleteXp", id);
    }
  },
  modules: {}
});
