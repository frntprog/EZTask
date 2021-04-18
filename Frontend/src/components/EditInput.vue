<template>
    <div class="edit-wrapper">
        <pencil-outline @click="[editItem(todo._id), defaultData()]" class="edit"/>
        <form @submit.prevent="submit(todo)">
            <input :class="{editInput: todo.edit === false}" type="text" v-model="edited">
        </form>
    </div>
</template>

<script>
    import PencilOutline from 'vue-material-design-icons/PencilOutline.vue';
    import {mapActions} from 'vuex';

    export default {
        name: "EditInput",
        props: ['todo'],
        components:{
            PencilOutline
        },
        data(){
            return{
                edited: ''
            }
        },
        mounted() {
          this.edited = this.todo.task;
            console.log(this.todo)
        },
        methods:{
            ...mapActions(["changeEditStatus", "editTodo"]),
            editItem(id){
                const payload = {
                    id,
                    edited: this.todo.task
                }
                this.changeEditStatus(payload);
            },
            submit(item){
                const payload = {
                    id: item._id,
                    item: {
                        ...item,
                        task: this.edited
                    }
                }
                this.editTodo(payload);
            },
            defaultData(){
                this.edited = this.todo.task;
                console.log(this.edited)
            }
        }
    }
</script>

<style scoped>
    .editInput{
        display: none;
    }

    .edit {
        margin-right: 10px;
        cursor: pointer;
    }

    .edit-wrapper{
        display: flex;
        align-items: center;
    }

    .edit-wrapper input{
        max-width: 150px;
        border: none;
        border-bottom: 1px solid #cccccc;
        outline: none;
        font-size: 16px;
        transition: all 0.3s;
    }

    .edit-wrapper input:focus {
        border-bottom: 1px solid cornflowerblue;
    }
</style>
