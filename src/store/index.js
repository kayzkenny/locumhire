import Vue from "vue";
import Vuex from "vuex";
import { db, fb } from "../db.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    xp: [],
    applications: [],
    bio: {},
    vacancies: [],
    vacancy: {}
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
      // console.log(state.xp);
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
          bio.headline = snapshot.data().headline;
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
    },
    updateBio(state, payload) {
      // console.log(params.zip_code);
      db.collection("provider")
        .doc(state.user.email)
        .update({
          first_name: payload.first_name,
          last_name: payload.last_name,
          address: payload.address,
          phone_number: payload.phone_number,
          zip_code: payload.zip_code,
          headline: payload.headline
        })
        .then(() => {
          // this.loading = false;
          // this.snackbar = true;
        })
        .catch(error => {
          alert("Error writing document: ", error);
        });
    },
    loadVacancies(state) {
      let vacancies = [];
      db.collectionGroup("vacancies")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            let vac = doc.data();
            vac.id = doc.id;
            vacancies.push(vac);
          });
        });
      state.vacancies = vacancies;
      // console.log(state.vacancies);
    },
    loadVacancy(state, params) {
      function formatDate(date) {
        return date.toDate().toDateString();
      }
      let vacRef = db
        .collection("clinic")
        .doc(params.clinic_email)
        .collection("vacancies")
        .doc(params.vac_id);

      vacRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            state.vacancy = doc.data();
            state.vacancy.id = doc.id;
            state.vacancy.deadline = formatDate(state.vacancy.deadline);
            state.vacancy.date_posted = formatDate(state.vacancy.date_posted);
            state.vacancy.start_date = formatDate(state.vacancy.start_date);
            state.vacancy.end_date = formatDate(state.vacancy.end_date);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },
    apply(state, payload) {
      console.log(payload);
      let expRef = db
        .collection("clinic")
        .doc(payload.vacancy_email)
        .collection("vacancies")
        .doc(payload.vacancy_id)
        .collection("applicants");
      expRef
        .add({
          application_date: new Date(),
          decision: "pending",
          email: state.user.email,
          first_name: state.bio.first_name,
          last_name: state.bio.last_name,
          resume: state.bio.resume,
          avatar: state.bio.avatar,
          headline: state.bio.headline
        })
        .then(() => {})
        .catch(error => {
          console.log("Error writing document: ", error);
        });
      let appRef = db
        .collection("provider")
        .doc(state.user.email)
        .collection("applications");
      appRef
        .add({
          application_date: new Date(),
          decision: "pending",
          vacancy_id: payload.vacancy_id,
          clinic_name: payload.clinic_name,
          position: payload.position,
          avatar: payload.avatar
        })
        .then(() => {})
        .catch(error => {
          console.log("Error writing document: ", error);
        });
    },
    loadApplications(state) {
      let appls = [];
      let applRef = db
        .collection("provider")
        .doc(state.user.email)
        .collection("applications");
      applRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let appl = doc.data();
          appls.push(appl);
        });
      });
      state.applications = appls;
      // console.log(state.applications);
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
    },
    updateBioAction(context, params) {
      context.commit("updateBio", params);
    },
    loadVacanciesAction(context) {
      context.commit("loadVacancies");
    },
    loadVacancyAction(context, params) {
      context.commit("loadVacancy", params);
    },
    applyAction(context, payload) {
      context.commit("apply", payload);
    },
    loadApplicationsAction(context) {
      context.commit("loadApplications");
    }
  },
  modules: {}
});
