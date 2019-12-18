<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-alert type="error" v-if="feedback">{{ feedback }}</v-alert>
        <v-alert type="success" v-if="success">{{ success }}</v-alert>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
        <v-card flat color="transparent" class="display-1 mx-auto"
          >Edit Experience</v-card
        >
        <v-form class="mx-auto my-4" @submit.prevent="update">
          <v-container>
            <v-row justify="center">
              <v-col cols="12" lg="4" md="6" sm="6">
                <v-text-field
                  v-model="clinic_name"
                  label="Clinic Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="4" md="6" sm="6">
                <v-text-field
                  v-model="job_title"
                  label="Job Title"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="4">
                <v-text-field
                  v-model="dateRangeText"
                  label="Date range"
                  prepend-icon="mdi-calendar"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-date-picker
                  full-width
                  v-model="dates"
                  color="primary"
                  range
                ></v-date-picker>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-btn class="mr-4 primary" @click="update" :loading="loading"
                >Update</v-btn
              >
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db, fb } from "../db.js";
export default {
  name: "EditXp",
  data: () => ({
    feedback: null,
    success: null,
    clinic_name: null,
    job_title: null,
    loading: false,
    dates: []
  }),
  methods: {
    update() {
      this.loading = true;
      let expRef = db
        .collection("provider")
        .doc(this.user.email)
        .collection("experience")
        .doc(this.$route.params.xp_id);
      expRef
        .set({
          clinic_name: this.clinic_name,
          job_title: this.job_title,
          start_date: new Date(this.dates[0]),
          end_date: new Date(this.dates[1])
        })
        .then(() => {
          this.loading = false;
          this.$router.push({ name: "profile" });
        })
        .catch(error => {
          alert("Error writing document: ", error);
        });
    },
    formatDate(dt) {
      let newDate = dt
        .toDate()
        .toISOString()
        .slice(0, 10)
        .split("/")
        .reverse()
        .join("-");
      return newDate;
    }
  },
  computed: {
    user() {
      return this.$store.state.user; // get the current user state
    },
    dateRangeText() {
      return this.dates.join(" ~ ");
    }
  },
  created() {
    let clinic_name = this.clinic_name;
    let job_title = this.job_title;

    let expRef = db
      .collection("provider")
      .doc(this.user.email)
      .collection("experience")
      .doc(this.$route.params.xp_id);

    expRef
      .get()
      .then(snapshot => {
        this.clinic_name = snapshot.data().clinic_name;
        this.job_title = snapshot.data().job_title;
        this.dates = [
          this.formatDate(snapshot.data().start_date),
          this.formatDate(snapshot.data().end_date)
        ];
      })
      .catch(error => {
        alert(error);
      });
  }
};
</script>
