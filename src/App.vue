<template>
  <v-app>
    <AppBar />
    <v-content>
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
  }
};
</script>
