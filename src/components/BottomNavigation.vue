<template>
  <v-bottom-navigation
    v-model="bottomNav"
    grow
    :horizontal="$vuetify.breakpoint.mdAndUp"
    color="primary"
    fixed
  >
    <v-btn value="recent" to="/dashboard">
      <span>Dashboard</span>
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-btn value="favorites">
      <span>My Jobs</span>
      <v-icon>mdi-briefcase</v-icon>
    </v-btn>

    <v-btn value="nearby" to="/profile">
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
