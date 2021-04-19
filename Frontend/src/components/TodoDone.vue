<template>
    <ul class="todo-list">
        <h2>Done</h2>
        <TodoItem
                v-for="todo in todos" :key="todo.id"
                :todo="todo"
        />
        <button @click="deleteDone" class="clear">Clear done todos</button>
    </ul>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import TodoItem from "./TodoItem";
    import TodoForm from "./TodoForm";
    export default {
        name: "TodoList",
        components: {
            TodoForm,
            TodoItem
        },
        props: ['todos'],
        computed: {
            ...mapGetters(['doneTodos'])
        },
        methods: {
            ...mapActions(['clearDone']),
            deleteDone(){
                this.clearDone();
            }
        }
    }
</script>



<style lang="scss" scoped>
    .todo-list{
        list-style: none;
        width: 400px;
        margin: 0 auto;
    }

    .clear{
        border: none;
        border-radius: 5px;
        background-color: palevioletred;
        color: $white;
        padding: 5px 10px;
        cursor: pointer;
        outline: none;
        transition: all 0.3s ease-out;
    }

    .clear:hover{
        background-color: lightcoral;
    }
</style>
