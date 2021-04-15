<template>
    <div>
        <p @click="deleteSTask">{{subTask.item.subTask}}</p>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "SubTask",
        props: ['subTask'],
        data(){
            return{
                completed: false
            }
        },
        mounted() {
            console.log(this.subTask)
        },
        methods: {
            ...mapActions(['deleteSubTask']),
            deleteSTask(){
                const payload = {
                    id: this.subTask.todo._id,
                    subTask: this.subTask.item
                }
                this.deleteSubTask(payload);
            }
        }
    }
</script>

<style scoped>
    p{
        cursor: pointer;
        text-align: left;
        border-radius: 5px;
        border: 1px solid #cccccc;
        padding: 10px 10px;
        word-wrap: normal;
        user-select: none;
    }
</style>
