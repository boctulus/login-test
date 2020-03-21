<template>
    <div style="text-align:center;">
      <div style="width:100%;">
        <nuxt-link to="/" style="position: absolute; left: 20px; top: 20px;">Mi sitio</nuxt-link>
      </div>

        <div class="container">
            <h1 style="margin-bottom:50px; margin-top:50px;">Ingreso</h1>
    
                <!-- Login Form -->
                <form @submit.prevent="onSubmit">
                    <input type="text" v-model="user.username" placeholder="Nombre de usuario">
                    <input type="text" v-model="user.password"  placeholder="Password">
                    <input type="submit" class="fadeIn fourth" value="Log In">
                </form>

            <!-- Errores -->
            <span style="displa:block; color: red;" v-if="error">{{ error }}</span>
        </div>       

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'login',

    data: () => {
        return {
            afterLogin: '/tres',
            error: null,
            user: {
                username: 'boctulu', // null
                password: 'gogogo'  // null
            }
        }
    },

    created () {
      /*
      setInterval(() => {
        console.log(this.$store.getters['login/getUser'].accessToken);
      }, 5000)
      */
    },

    methods: {
        onSubmit() {
            //console.log('SUBMITTED!');
            //console.log(this.user);            
            
            this.$axios.post('http://elgrove.co/auth/login', {
                    username: this.user.username,
                    password: this.user.password

            }).then( response => {
                //console.log(response);

                this.$store.commit('login/setAccessToken', response.data.data.access_token);
                this.$store.commit('login/setRefreshToken', response.data.data.refresh_token);
                this.$store.commit('login/setExpirationTime', response.data.data.expires_in);
                this.$store.commit('login/setId', response.data.data.uid);
                this.$store.commit('login/setRoles', response.data.data.roles);

                this.$axios.request({
                    url: 'http://elgrove.co/api/v1/me',
                    method: 'get',
                    headers: {
                        'Authorization': `Bearer ${response.data.data.access_token}`
                    }
                }).then( response => {
                    this.$store.commit('login/setName', response.data.data.name);
                    this.$store.commit('login/setUsername', response.data.data.username);

                }).catch((error) => {
                    const response = error.response;
                    //console.log('Error', error);
                    //console.log(response.data.error);
                    this.error = response.data.error;
                });
                
                //console.log(this.$store.getters['login/getUser']);
                //console.log(process.server);

                // redirect
                this.$router.push(this.afterLogin);

            }).catch((error) => {
                const response = error.response;
                //console.log('Error', error);
                //console.log(response.data.error);
                this.error = response.data.error;
            });
        }
    }
}
</script>

<style scoped>
    h1 {
        color: white;
    }

/* BASIC */

html {
  background-color: #56baed;
}

body {
  font-family: "Poppins", sans-serif;
  height: 100vh;
}

a {
  color: #92badd;
  display:inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display:inline-block;
  margin: 40px 8px 10px 8px; 
  color: #cccccc;
}



/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column; 
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}



/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}



/* FORM TYPOGRAPHY*/

input[type=button], input[type=submit], input[type=reset]  {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {
  background-color: #39ace7;
}

input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type=text] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type=text]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type=text]:placeholder {
  color: #cccccc;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after{
  width: 100%;
}



/* OTHERS */

*:focus {
    outline: none;
} 

#icon {
  width:60%;
}

</style>