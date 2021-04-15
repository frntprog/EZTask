<template>
    <div class="details">
        <h2>Detail Page</h2>
        <TodoItem
                :todo="currTodo"
        />
        <TodoDetails :todo="currTodo"/>
        <router-link class="back" to="/">Go Back</router-link>
    </div>
</template>

<script>
    import EditInput from "../EditInput";
    import TodoItem from "../TodoItem";
    import TodoDetails from "./TodoDetails";

    export default {
        name: "TodoDetailPage",
        components: {
            TodoDetails,
            TodoItem,
            EditInput
        },
        data() {
            return {
                todo: null
            }
        },
        created() {
            const todo = this.$store.state.todo.todos.find(todo => todo._id === this.$route.params.id)
            if (todo) {
                this.todo = todo;
            }
            console.log(todo)
        },
        computed: {
            currTodo() {
                const todo = this.$store.state.todo.todos.find(todo => todo._id === this.$route.params.id)
                return todo;
            }
        }
    }
</script>

<style scoped>
    .back{
      text-decoration: none;
        color: #2c3e50;
    }

    .details {
        width: 500px;
        margin: 0 auto;
    }

    .done {
        text-decoration: line-through;
    }
</style>
