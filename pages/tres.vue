<template>
    <div style="text-align:center;">
        <a href="#" @click="logout" style="position: absolute; right: 20px; top: 20px;">salir</a>
  
        <h1 style="margin-bottom:100px;">Página 3 '''restringida'''</h1>
     
        <h2>Mensajes</h2>

        <ul>
            <li v-for="(mensaje, ix) in mensajes" v-bind:key="ix">
                {{ mensaje.name }} | {{ mensaje.subject }}
            </li>
        </ul>   

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
            mensajes: []
        }
    },

    created() {
        //console.log(`Bearer ${this.$store.getters['auth/GET_USER'].accessToken}`);

        this.$axios.request({
            url: 'http://elgrove.co/api/v1/messages',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${this.$store.getters['auth/GET_USER'].accessToken}`
            }
        }).then( ({ data }) => {
                //console.log(data);  
                this.mensajes = data['data'];
        }).catch((error) => {
                const response = error.response;
                console.log(response);
        });
    },

    methods: {
        logout(){
            //console.log('LOG OUT!');
            this.$store.commit('auth/LOGOUT');
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