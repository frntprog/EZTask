<template>
    <div>
        <h4 class="subTitle">{{$t("headers.subTasks")}}</h4>
        <SubtaskForm :todo="todo"/>
        <SubTask v-for="item in todo.subTasks" :extraInfo="{todoID: todo._id, sub: item}" :key="item._id"/>
    </div>
</template>

<script>
    import SubTask from "./SubTask";
    import SubtaskForm from "./SubtaskForm";

    export default {
        name: "TodoDetails",
        components: {SubTask, SubtaskForm},
        props: ['todo'],
        mounted() {
            console.log(this.todo)
        }
    }
</script>

<style scoped>
    .subTitle {
        margin-top: 40px;
    }
</style>
