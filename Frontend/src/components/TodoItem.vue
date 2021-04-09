<template>
    <div @click="completeTask(todo._Id, todo)" class="li-wrapper">
            <li class="todo-item">
            <span :class="{done: todo.completed}">
                {{todo.task}}
            </span>
        </li>
        <button @click="remove(todo._id)" class="delete">delete</button>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        name: "TodoItem",
        props: ['todo'],
        methods: {
            ...mapActions(['deleteTodo', 'doneTodo']),
            remove(id){
                this.deleteTodo(id);
            },
            completeTask(id, item){
                const payload = {
                    changedItem: {
                        completed: !item.completed
                    },
                    item:item
                }
                this.doneTodo(payload)
            }
        }
    }
</script>

<style scoped>
    .li-wrapper{
        user-select: none;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #cccccc;
        padding: 10px 0;
        display: flex;
        margin: 20px 0;
        justify-content: space-between;
    }

    .todo-item{
        padding-left: 20px;
    }

    .delete{
        border: none;
        border-radius: 5px;
        background-color: lightpink;
        color: #ffffff;
        padding: 5px 10px;
        cursor: pointer;
        outline: none;
        transition: all 0.3s ease-out;
    }

    .delete:hover{
        background-color: palevioletred;
    }

    .done{
        text-decoration: line-through;
    }
</style>
