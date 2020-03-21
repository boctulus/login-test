const after_login = '/tres';

export const state = () => ({
    authUser: {
        id: null,
        name: null,
        username: null,
        roles: [],
        accessToken: null,
        refreshToken: null,
        exp: null,
        expires_in: null
    },
    alert: null
});

export const mutations = {
    SET_USER(state, payload) {
        state.authUser = val;

        for (let [key, value] of Object.entries(payload)) {
            state.authUser[key] = value;
        }
    },
    LOGIN(state, { username, password } ) {        
        this.$axios.post('http://elgrove.co/auth/login', {
            username: username,
            password: password

        }).then( response => {
            //console.log(response);
            state.authUser.accessToken  =  response.data.data.access_token;
            state.authUser.refreshToken =  response.data.data.refresh_token;
            state.authUser.expires_in = response.data.data.expires_in;
            state.authUser.exp = parseInt((new Date).getTime() / 1000) + response.data.data.expires_in
            state.authUser.id =  response.data.data.uid;
            state.authUser.roles =  response.data.data.roles;

            this.$axios.request({
                url: 'http://elgrove.co/api/v1/me',
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${response.data.data.access_token}`
                }
            }).then( response => {
                state.authUser.name =  response.data.data.name;
                state.authUser.username = response.data.data.username;

            }).catch((error) => {
                const response = error.response;
                //console.log('Error', error);
                //console.log(response.data.error);
                this.error = response.data.error;
            });
            
            //console.log(this.$store.getters['auth/GET_USER']);
            //console.log(process.server);

            // redirect
            this.$router.replace({ path: after_login });

        }).catch((error) => {
            const response = error.response;
            console.log('Error', error);
            //console.log(response.data.error);
            //this.error = response.data.error;
        });
    },    
    LOGOUT(state) {
        state.authUser = {
            id: null,
            name: null,
            username: null,
            roles: [],
            accessToken: null,
            refreshToken: null,
            exp: null,
            expires_in: null
        };
        state.alert = null;

        this.$router.replace({ path: '/' });
    },
    REFRESH_TOKEN(state) {
        console.log('Voy a veriificar si debo refrescar el access token'); 

        const margin = 30; // Seg. 
        const expiring = parseInt((new Date).getTime() / 1000) - margin > state.authUser.exp;

        console.log('Now', parseInt((new Date).getTime() / 1000));
        console.log('Vence en: ', state.authUser.exp);
        console.log('Expiring ?', expiring);

        if (state.authUser.accessToken !== null && expiring){
            this.$axios.request({
                url: 'http://elgrove.co/auth/token',
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${state.authUser.refreshToken}`
                }
            }).then( ({ data }) => {
                //console.log(data);

                state.authUser.accessToken = data.data.access_token;
                state.authUser.expires_in = data.data.expires_in;
                state.authUser.exp = parseInt((new Date).getTime() / 1000) + data.data.expires_in;

                console.log(state.authUser.exp);
                console.log(state.authUser.accessToken);

            }).catch((error) => {
                console.log(error);
            });
        }
    },
    SET_ALERT(state, msg){
        state.alert = msg;
    }
}

export const getters = {
    GET_USER(state) {
        return state.authUser;
    },
    IS_LOGGED(state) {
        return state.authUser.id !== null;
    }
}