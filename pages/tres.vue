<template>
    <div style="text-align:center;">
        <a href="#" @click="logout" style="position: absolute; right: 20px; top: 20px;">salir</a>
  
        <h1 style="margin-bottom:100px;">Página 3 '''restringida'''</h1>
     
        <div style="margin-top: 50px;">
            <nuxt-link to="/">Index</nuxt-link>
        </div>
        <div style="margin-top: 10px;">
            <nuxt-link to="/dos">Página (2)</nuxt-link>
        </div>  
    </div>
</template>

<script>
export default {
    name: 'tres',

    data: () => {
        return {
            
        }
    },

    created() {

    },

    methods: {
        logout(){
            console.log('LOG OUT!');
            this.$store.commit('login/logout');
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
    h1 {
        color: white;
    }
</style>