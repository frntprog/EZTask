<template>
    <div class="li-wrapper">
        <li class="todo-item">
            <div class="todo-wrapper">
                <EditInput :todo="todo"/>
                <router-link class="item-link" :to="{path: `/detail/${todo._id}`}">
                    <span v-if="todo.edit === false" :class="{done: todo.completed}">
                        {{todo.task}}
                    </span>
                </router-link>
            </div>
        </li>
        <div class="item-btns">
            <button @click="completeTask(todo)">{{todo.completed ? $t("buttons.undone") : $t("buttons.done")}}</button>
            <button @click="remove(todo._id)" :class="{hide: $route.path !== '/'}">{{$t("buttons.delete")}}</button>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import EditInput from "./EditInput";

    export default {
        name: "TodoItem",
        props: ['todo'],
        components: {
            EditInput
        },
        methods: {
            ...mapActions(['deleteTodo', 'doneTodo']),

            remove(id) {
                this.deleteTodo(id);
            },

            completeTask(item) {
                const payload = {
                    changedItem: {
                        completed: !item.completed
                    },
                    item: item
                }
                this.doneTodo(payload)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .item-link {
        text-decoration: none;
        color: $primary-text-color;
    }

    .li-wrapper {
        user-select: none;
        border-radius: 5px;
        border: 1px solid $grey;
        padding: 10px 10px;
        display: flex;
        margin: 20px 0;
        justify-content: space-between;
    }

    button {
        border: none;
        border-radius: 5px;
        background-color: $todo-btn !important;
        color: $white;
        padding: 5px 10px;
        cursor: pointer;
        outline: none;
        transition: all 0.3s ease-out;
    }

    button:hover {
        background-color: $todo-btn-hover !important;
    }

    .item-btns button:not(:last-child) {
        margin-right: 30px;
    }

    .hide {
        display: none;
    }

    .todo-wrapper {
        display: flex;
        align-items: center;
    }

    .todo-wrapper span {
        max-width: 150px;
        overflow: hidden;
    }

    .done {
        text-decoration: line-through;
    }
</style>
