<template>
  <v-container>
    <v-row dense justify="center" class="mt-6">
      <v-col cols="11" sm="8" md="9" lg="10">
        <p class="title mx-auto">My Applications</p>
      </v-col>
    </v-row>
    <v-row
      dense
      justify="center"
      v-for="appls in applications"
      :key="appls.vacancy_id"
    >
      <v-col cols="11" sm="8" md="9" lg="10">
        <v-card
          color="white"
          class="display-1 mx-auto my-2 pb-2"
          max-width="1400"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="pb-0">
                <v-avatar size="36" tile class="mr-1">
                  <v-img :src="appls.avatar" :alt="appls.clinic_name"></v-img>
                </v-avatar>
                <span class="body-1"
                  >{{ appls.position }} @ {{ appls.clinic_name }} on
                  {{ appls.application_date.toDate().toDateString() }}</span
                >
              </v-card-title>
            </div>
            <div justify="center"></div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <v-btn color="primary" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { db, fb } from "../db.js";
export default {
  name: "Applications",
  data: () => ({
    loading: false,
    snackbar: false,
    text: "Application sent",
    timeout: 2000
  }),
  created() {
    // console.log(params);
    this.$store.dispatch("loadApplicationsAction"); // get xp state
  },
  computed: {
    user() {
      return this.$store.state.user; // get the current user state
    },
    applications() {
      return this.$store.state.applications; // get all vacancies state
    }
  }
};
</script>
