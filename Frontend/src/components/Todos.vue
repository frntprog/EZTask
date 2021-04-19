<template>
    <div>
        <h1>{{$t("headers.todo")}}</h1>
        <TodoList :todos="unDoneTodos"/>
        <TodoDone v-if="doneTodos.length" :todos="doneTodos"/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import TodoDone from "./TodoDone";
    import TodoList from "./TodoList";

    export default {
        name: "Todos",
        data() {
            return {
                todos: []
            }
        },

        components: {
            TodoList,
            TodoDone
        },

        async mounted() {
            this.fetchTodos();
        },

        computed: {
            ...mapGetters(["unDoneTodos", "doneTodos"])
        },

        methods: {
            ...mapActions(["fetchTodos"])
        }
    }
</script>

<style scoped>

</style>
