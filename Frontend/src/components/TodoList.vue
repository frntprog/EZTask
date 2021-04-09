<template>
    <ul class="todo-list">
        <TodoForm/>
        <TodoItem
        v-for="todo in todos" :key="todo.id"
        :todo="todo"
        />
    </ul>
</template>

<script>
    import TodoItem from "./TodoItem";
    import TodoForm from "./TodoForm";
    export default {
    name: 'TodoList',
    components: {
        TodoForm,
        TodoItem
    },
    props: ['todos']
    }
</script>

<style scoped>
    .todo-list{
        list-style: none;
        width: 400px;
        margin: 0 auto;
    }
</style>
