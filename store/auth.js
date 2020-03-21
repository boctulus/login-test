import router from 'vue-router'

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
    SET_ID(state, val) {
        state.authUser.id = val;
    },
    SET_NAME(state, val) {
        state.authUser.name = val;
    },
    SET_USERNAME(state, val) {
        state.authUser.username = val;
    },
    SET_ROLES(state, val) {
        state.authUser.roles = val;
    },
    SET_ACCESS_TOKEN(state, val) {
        state.authUser.accessToken = val;
    },
    setRefreshToken(state, val) {
        state.authUser.refreshToken = val;
    },
    SET_EXPIRATION_TIME(state, expires_in) {
        state.authUser.expires_in = expires_in;
        state.authUser.exp = parseInt((new Date).getTime() / 1000) + expires_in;
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