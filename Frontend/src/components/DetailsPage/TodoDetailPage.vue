<template>
    <div class="details">
        <h2>{{$t("headers.detailPage")}}</h2>
        <TodoItem
                :todo="currTodo"
        />
        <TodoDetails :todo="currTodo"/>
        <!--        <router-link class="back" to="/">-->
        <!--            <p class="back">{{$t("goBack")}}</p>-->
        <!--        </router-link>-->
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
    .back {
        text-decoration: none;
    }

    .details {
        width: 500px;
        margin: 0 auto;
    }

    .done {
        text-decoration: line-through;
    }

    .back {
        font-size: 20px;
    }
</style>
