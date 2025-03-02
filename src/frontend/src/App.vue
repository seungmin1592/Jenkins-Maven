<template>
  <component :is="this.$route.meta.layout || 'div'">
    <router-view></router-view>
  </component>

</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
@import "./assets/css/font.css";
@import "./assets/css/style.css";
@import "./assets/css/common.css";
@import "./assets/css/content.css";

</style>