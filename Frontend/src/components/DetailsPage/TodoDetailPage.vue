<template>
    <div class="details">
        <h2>{{$t("headers.detailPage")}}</h2>
        <TodoItem
                :todo="currTodo"
        />
        <TodoDetails :todo="currTodo"/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import EditInput from "../EditInput";
    import TodoItem from "../TodoItem";
    import TodoDetails from "./TodoSubtasks";

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
            const todo = this.getAllTodos.find(todo => todo._id === this.$route.params.id);
            if (todo) {
                this.todo = todo;
            }
        },
        computed: {
            ...mapGetters(['getAllTodos']),
            currTodo() {
                const todo = this.getAllTodos.find(todo => todo._id === this.$route.params.id);
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
