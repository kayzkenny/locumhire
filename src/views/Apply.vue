<template>
  <v-container>
    <v-row dense justify="center" class="mt-6">
      <v-col cols="11" sm="8" md="9" lg="10">
        <p class="title mx-auto">Apply to {{ vacancy.clinic_name }}</p>
      </v-col>
    </v-row>
    <v-row dense justify="center">
      <v-col cols="11" sm="8" md="9" lg="10">
        <v-card color="white" class="display-1 my-4">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title>
                <v-avatar size="36" tile class="mr-1">
                  <v-img
                    :src="vacancy.avatar"
                    :alt="vacancy.clinic_name"
                  ></v-img>
                </v-avatar>
                <span class="body-1">{{ vacancy.position }}</span>
                <span class="body-1">@ {{ vacancy.clinic_name }}</span>
                <!-- <v-spacer></v-spacer>
                <p class="body-2 text-right">{{ vacancy.date_posted }}</p>-->
              </v-card-title>
              <!-- <p class="caption d-block ml-12 pl-2">
                <span class="font-weight-light">at</span>
                {{ vacancy.clinic_name }}
              </p>-->

              <v-card-subtitle class="mt-1 ml-4 body-2 text-left my-o py-0">
                <span class="font-weight-medium">Date Posted:</span>
                {{ vacancy.date_posted }},
                <span class="font-weight-medium">Application Deadline:</span>
                {{ vacancy.deadline }},
                <span class="font-weight-medium">Length:</span>
                {{ vacancy.start_date }}
                ~ {{ vacancy.end_date }}
                <div class="my-8 body-2" v-html="vacancy.job_desc"></div>
              </v-card-subtitle>
            </div>
          </div>
          <v-card-actions class="ml-4">
            <v-btn text @click="apply" color="primary" :loading="loading"
              >Apply</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <v-btn text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { db, fb } from "../db.js";
export default {
  name: "Apply",
  data: () => ({
    loading: false,
    snackbar: false,
    text: "Application sent",
    timeout: 2000
  }),
  created() {
    let params = {
      vac_id: this.$route.params.vac_id,
      clinic_email: this.$route.query.clinic_email
    };
    // console.log("params", params);
    this.$store.dispatch("loadVacancyAction", params); // get xp state
  },
  computed: {
    user() {
      return this.$store.state.user; // get the current user state
    },
    vacancy() {
      return this.$store.state.vacancy; // get all vacancies state
    }
  },
  methods: {
    apply() {
      this.loading = true;
      let payload = {
        vacancy_email: this.vacancy.email,
        vacancy_id: this.vacancy.id,
        clinic_name: this.vacancy.clinic_name,
        position: this.vacancy.position,
        avatar: this.vacancy.avatar
      };
      this.$store.dispatch("applyAction", payload).then(() => {
        this.loading = false;
        this.snackbar = true;
      });
      // this.$router.push({ name: "dashboard" });
    }
  }
};
</script>
