<template>
  <div id="app">
    <h1>Todo App</h1>
    <TodoList :todos="unDoneTodos"/>
    <TodoDone v-if="doneTodos.length" :todos="doneTodos"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import TodoDone from "./components/TodoDone";
import TodoList from "./components/TodoList";
export default {
  name: 'App',
  data(){
    return{
      todos: []
    }
  },
  components: {
    TodoList,
    TodoDone
  },
  async mounted() {
    this.fetchTodos();
  },
computed: {
    ...mapGetters(["unDoneTodos", "doneTodos"])
},
  methods: {
    ...mapActions(["fetchTodos"])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px;

}
</style>
