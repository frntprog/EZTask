<template>
    <div>
        <h2>Subtasks</h2>
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
</style>
