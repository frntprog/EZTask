<template>
    <div id="app">
        <h1>Todo App</h1>
        <router-view></router-view>
    </div>
</template>

<script>
    import Todos from "./components/Todos";

    export default {
        name: 'App',
        components: {
            Todos
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 60px;
        list-style: none;
    }
</style>
