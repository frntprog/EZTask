<template>
    <div id="app">
        <router-view></router-view>
        <Switcher/>
    </div>
</template>

<script>
    import Todos from "./components/Todos";
    import Switcher from "./components/Switcher";

    export default {
        name: 'App',
        components: {
            Switcher,
            Todos
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: $primary-text-color;
        margin: 60px;
        list-style: none;
    }

    h1, h2 {
        font-size: 20px;
    }
</style>
