<template>
  <div class="auth-cont-wrap">

    <h2>
      <p>ENV TYPE => <span>{{envType}}</span></p>
    </h2>

  </div>


</template>

<script>
// import axios from "axios";

export default {
  name: "Main",
  data() {
    return {

      envType:process.env.VUE_APP_ENV_TYPE_TEXT,

    }
  },
  mounted() {
  },

  created() {
  },
  methods: {

    login() {

      this.$axios.post('/auth/login', params).then(response => {


      }).catch((e) => {
       console.log(e)

      });
    },

  }
};
</script>
