<template>
  <v-container>
    <v-row dense justify="center" class="mt-6">
      <v-col cols="11" sm="8" md="9" lg="10">
        <p class="title mx-auto">My Jobs</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db, fb } from "../db.js";
export default {
  name: "MyJobs"
};
</script>
