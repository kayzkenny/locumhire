<template>
  <v-app>
    <AppBar />
    <v-content class="mb-12">
      <router-view />
    </v-content>
    <BottomNavigation />
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar";
import BottomNavigation from "./components/BottomNavigation";
export default {
  name: "App",
  components: {
    AppBar,
    BottomNavigation
  },
  created() {
    this.$store.dispatch("loadUserAction"); // get user state
  },
  updated() {
    this.$store.dispatch("loadUserAction");
  }
};
</script>
