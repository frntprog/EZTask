<template>
    <form @submit.prevent="submit">
        <input type="text" placeholder="Add todo" v-model="todo">
        <button type="submit">Submit</button>
    </form>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    export default {
        name: "TodoForm",
        data(){
            return{
                todo: ''
            }
        },
        methods:{
            ...mapActions(["addTodo"]),
            submit(){
                if(this.todo !== ''){
                    const todo = {
                        task: this.todo
                    };
                    this.addTodo(todo);
                    this.todo = '';
                }
            }
        }
    }
</script>

<style scoped>

    form{
        display: flex;
        justify-content: space-between;
        margin: 30px 0 50px 0;
    }

    input{
        width: 300px;
        border: none;
        border-bottom: 1px solid #cccccc;
        outline: none;
        font-size: 16px;
        transition: all 0.3s;
    }

    input:focus{
        border-bottom: 1px solid cornflowerblue;

    }

    button{
        border: none;
        background-color: lightblue;
        cursor: pointer;
        padding: 10px 15px;
        color: #ffffff;
        border-radius: 5px;
        transition: all 0.3s ease-out;
    }

    button:hover{
        background-color: cadetblue;

    }
</style>
