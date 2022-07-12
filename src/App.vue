<template>
  <div class="m-container">
    <the-menu-vue />
    <div class="m-content">
      <the-navbar-vue />
      <the-content-vue />
    </div>
  </div>
</template>

<script>
import TheContentVue from "./components/layouts/TheContent.vue";
import TheMenuVue from "./components/layouts/TheMenu.vue";
import TheNavbarVue from "./components/layouts/TheNavbar.vue";

export default {
  name: "App",
  components: {
    TheContentVue,
    TheMenuVue,
    TheNavbarVue,
  },
};
</script>

<style>
@import url(@/css/main.css);
</style>
