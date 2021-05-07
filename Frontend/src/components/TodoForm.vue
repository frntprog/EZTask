<template>
    <form @submit.prevent="submit">
        <input type="text" :placeholder='$t("input.addTodo")' v-model="todo">
        <div class="button-wrapper">
            <button type="submit">{{$t("buttons.submit")}}</button>
        </div>
    </form>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "TodoForm",
        data() {
            return {
                todo: ''
            }
        },
        methods: {
            ...mapActions(["addTodo"]),
            submit() {
                if (this.todo !== '') {
                    const todo = {
                        task: this.todo,
                        username: localStorage.getItem('username')
                    };
                    this.addTodo(todo);
                    this.todo = '';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    form {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 30px 0 50px 0;
    }

    input {
        width: 300px;
        border: none;
        border-bottom: 1px solid $white;
        outline: none;
        font-size: 16px;
        transition: all 0.3s;
    }

    input:focus {
        border-bottom: 1px solid cornflowerblue;
    }

    button {
        border: none;
        background-color: lightblue;
        cursor: pointer;
        padding: 10px 15px;
        color: $white;
        border-radius: 5px;
        transition: all 0.3s ease-out;
    }

    button:hover {
        background-color: cadetblue;
    }
</style>
