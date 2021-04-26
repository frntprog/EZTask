<template>
    <div>
        <p @click="deleteSTask">{{extraInfo.sub.subTask}}</p>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "SubTask",
        props: ['extraInfo'],
        data() {
            return {
                completed: false
            }
        },
        methods: {
            ...mapActions(['deleteSubTask']),
            deleteSTask() {
                const payload = {
                    id: this.extraInfo.todoID,
                    subTaskID:this.extraInfo.sub._id
                }
                this.deleteSubTask(payload);
            }
        }
    }
</script>

<style lang="scss" scoped>
    p {
        cursor: pointer;
        text-align: left;
        border-radius: 5px;
        border: 1px solid $grey;
        padding: 10px 10px;
        word-wrap: normal;
        user-select: none;
    }
</style>
