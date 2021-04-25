<template>
    <div class="edit-wrapper">
        <pencil-outline @click="[editItem(todo._id), defaultData()]" class="edit"/>
        <form @submit.prevent="submitChanges(todo)">
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
        },
        methods:{
            ...mapActions(["accessEdit", "editTask"]),
            editItem(id){
                const payload = {
                    id,
                    edited: this.todo.task
                }
                this.accessEdit(payload);
            },
            submitChanges(item){
                const payload = {
                    id: item._id,
                    item: {
                        ...item,
                        task: this.edited
                    }
                }
                this.editTask(payload);
            },
            defaultData(){
                this.edited = this.todo.task;
            }
        }
    }
</script>

<style lang="scss" scoped>
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
        border-bottom: 1px solid $white;
        outline: none;
        font-size: 16px;
        transition: all 0.3s;
        height: 1.5rem !important;;
        margin: 0 !important;
    }

    .edit-wrapper input:focus {
        border-bottom: 1px solid cornflowerblue;
    }
</style>
