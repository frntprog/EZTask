<template>
    <div>
        <h4 class="subTitle">{{$t("headers.subTasks")}}</h4>
        <SubtaskForm :todo="todo"/>
        <SubTask v-for="item in todo.detailedInfo" :subTask="{item: item, todo: todo}"/>
    </div>
</template>

<script>
    import SubTask from "./SubTask";
    import SubtaskForm from "./SubtaskForm";

    export default {
        name: "TodoDetails",
        components: {SubTask, SubtaskForm},
        props: ['todo']
    }
</script>

<style scoped>
    .subTitle {
        margin-top: 40px;
    }
</style>
