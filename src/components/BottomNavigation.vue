<template>
  <v-bottom-navigation
    v-model="bottomNav"
    grow
    :horizontal="$vuetify.breakpoint.mdAndUp"
    color="primary"
    fixed
  >
    <v-btn value="recent" to="/">
      <span>Dashboard</span>
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-btn value="applications" to="/applications">
      <span>Applications</span>
      <v-icon>mdi-file-document</v-icon>
    </v-btn>

    <v-btn value="myjobs" to="/myjobs">
      <span>My Jobs</span>
      <v-icon>mdi-briefcase</v-icon>
    </v-btn>

    <v-btn value="profile" to="/profile">
      <span>Profile</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "BottomNavigation",
  data() {
    return {
      bottomNav: "recent"
    };
  }
};
</script>
