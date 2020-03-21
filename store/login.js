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
    setUser(state, payload) {
        state.authUser = val;

        for (let [key, value] of Object.entries(payload)) {
            state.authUser[key] = value;
        }
    },
    setId(state, val) {
        state.authUser.id = val;
    },
    setName(state, val) {
        state.authUser.name = val;
    },
    setUsername(state, val) {
        state.authUser.username = val;
    },
    setRoles(state, val) {
        state.authUser.roles = val;
    },
    setAccessToken(state, val) {
        state.authUser.accessToken = val;
    },
    setRefreshToken(state, val) {
        state.authUser.refreshToken = val;
    },
    setExpirationTime(state, expires_in) {
        state.authUser.expires_in = expires_in;
        state.authUser.exp = parseInt((new Date).getTime() / 1000) + expires_in;
    },
    logout(state) {
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
    setAlert(state, msg){
        state.alert = msg;
    }
}

export const getters = {
    getUser(state) {
        return state.authUser;
    },
    isLogged(state) {
        return state.authUser.id !== null;
    }
}