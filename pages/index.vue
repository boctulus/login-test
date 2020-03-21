<template>
  <div style="text-align:center;">
      <div style="width:100%;">
        <nuxt-link to="/login" style="position: absolute; right: 20px;">login</nuxt-link>
      </div>

      <h1 style="margin-bottom: 50px;">Home</h1>

      <img src="/logo.png">

      <div style="text-align: center;">
        <div style="margin-top: 50px;">
          <nuxt-link to="/dos">Página (2)</nuxt-link>
        </div>
        <div style="margin-top: 10px;">
          <nuxt-link to="/tres">Página (3) [ restringida ]</nuxt-link>
        </div>
      </div>

  </div>
</template>

<script>

export default {
  computed: {
    loginAlert() {
      return this.$store.state.auth.alert;
    }
  },

  watch: {
    loginAlert(msg){
      if (msg !== null) {
        this.$store.commit('auth/SET_ALERT', null);
        alert(msg);
      }
    }
  },

  mounted() {
    
  },
  
  components: {
  
  }
}
</script>
