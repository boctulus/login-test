<template>
    <div style="text-align:center; min-height:100vh" :style="{backgroundColor: selected_color}">
        <h1 style="margin-bottom:50px;">Página 2</h1>

        <label for="color">Elija color:&nbsp;</label>
        <select v-model="selected_color" style="width:10%;">
            <option v-for="(color,ix) in colors" v-bind:key="ix" :selected="selected_color === color" style="color: #ccc !important;">{{ color }}</option>
        </select>

        <div style="margin-top: 50px;">
            <nuxt-link to="/">Index</nuxt-link>
        </div>
        <div style="margin-top: 10px;">
            <nuxt-link to="/tres">Página (3)  [ restringida ]</nuxt-link>
        </div>  
    </div>
</template>

<script>
export default {
    name: 'dos',

    data: () => {
        return {
            selected_color: null,
            colors: ['red', 'yellow', 'orange', 'blue']  
        }
    },

    watch: {
        selected_color: function (val) {
            //console.log(this.$store);
            this.$store.commit('colors/setColor', val);
        }
    },

    created() {
        this.selected_color = this.$store.state.colors.color;
    }
}
</script>

<style scoped>
    h1 {
        color: white;
    }
</style>