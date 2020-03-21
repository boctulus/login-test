export const state = () => ({
    color: 'green'
});

export const mutations = {
    setColor(state, val) {
        state.color = val;
    }
}

export const getters = {
    getColor(state) {
        return state.color;
    }
}