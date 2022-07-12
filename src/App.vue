<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  created() {
    var filter = {
      pageSize: 10, pageNumber: 1, employeeFilter: null
    }
    this.$store.dispatch("getAllEmployee", filter)
  },
}
</script>

<style>
@import url(@/css/main.css);
</style>
