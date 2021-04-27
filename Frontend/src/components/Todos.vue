<template>
    <div class="wrapper">
        <div class="todos">
            <div class="auth">
                <button @click="changeUserState" class="auth-btn">{{ auth ? $t("buttons.switchSignOut") : $t("buttons.switchSignIn")}}</button>
            </div>
            <h1>{{$t("headers.todo")}}</h1>
            <TodoList :todos="unDoneTodos"/>
            <TodoDone v-if="doneTodos.length" :todos="doneTodos"/>
        </div>
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
                todos: [],
                auth: false
            }
        },
        components: {
            TodoList,
            TodoDone
        },
        mounted() {
            this.fetchTodos();
            this.auth = localStorage.getItem('auth') !== null;
        },
        computed: {
            ...mapGetters(["unDoneTodos", "doneTodos"])
        },
        methods: {
            ...mapActions(["fetchTodos"]),
            changeUserState() {
                if (this.auth) {
                    localStorage.removeItem('auth');
                    this.auth = false;
                } else {
                    localStorage.setItem('auth', true);
                    this.auth = true;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .auth-btn{
        background-color: $submit-btn;
        border-radius: 5px;
        border: none;
        padding: 5px 10px;

        position: absolute;
        right: 30%;
    }
</style>
