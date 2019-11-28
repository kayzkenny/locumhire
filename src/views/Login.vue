<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xs="10">
        <v-alert type="error" v-if="feedback">{{ feedback }}</v-alert>
        <v-alert type="success" v-if="success">{{ success }}</v-alert>
      </v-col>

      <v-col cols="12" xs="10" sm="8" md="8" lg="4">
        <v-img
          :src="require('../assets/doctor(1).svg')"
          max-height="400"
          max-width="600"
          contain
        ></v-img>
      </v-col>

      <v-col cols="12" xs="10" sm="8" md="8" lg="4">
        <v-card flat color="transparent" max-width="340">Login</v-card>

        <v-form class="mx-auto my-4" @submit.prevent="signUp">
          <v-text-field
            v-model="email"
            label="E-mail"
            type="email"
            :rules="[rules.required, rules.email]"
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-form>
        <v-row justify-self>
          <v-btn color="primary ml-3" @click="login" :loading="loading"
            >Login</v-btn
          >
          <v-spacer></v-spacer>
          <p color="cyan lighten-2" class="body-1">Forgot password</p>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db, fb } from "../db.js";
export default {
  name: "Login",
  data: () => ({
    feedback: "",
    success: "",
    email: "",
    password: "",
    loading: false,
    show1: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),
  methods: {
    login() {
      this.loading = true;
      if (this.email && this.password) {
        let ref = db.collection("provider").doc(this.email);
        // get reference to the users document, the users email is the id of the doc
        ref.get().then(doc => {
          if (!doc.exists) {
            this.feedback = "this email is not registered";
            this.loading = false;
          } else {
            fb.auth()
              .signInWithEmailAndPassword(this.email, this.password)
              .then(() => {
                this.loading = false;
                this.success = "You successfully logged in";
                this.$store.dispatch("loadUserAction"); // get user state
                this.$router.replace({ name: "dashboard" });
              })
              .catch(error => {
                // alert(error);
                this.loading = false;
                this.feedback = error.message;
              });
          }
        });
      } else {
        this.feedback = "You must enter all fields";
      }
    }
  }
};
</script>
