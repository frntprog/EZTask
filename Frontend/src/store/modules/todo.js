export default {
    actions:{
        async fetchTodos(ctx){
            const res = await fetch('http://localhost:3000/todo', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const todos = await res.json();
            ctx.commit('updateTodos', todos)
        },

        async addTodo(ctx, todo){
            const res = await fetch('http://localhost:3000/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            });
            const newTodo = await res.json();
            ctx.commit('addNewTodo', newTodo)
        },

        async deleteTodo(ctx, todoID){
           await fetch(`http://localhost:3000/todo/one/${todoID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            ctx.commit('setDeleteTodo', todoID);
        },

        async doneTodo(ctx,payload){
             await fetch(`http://localhost:3000/todo/${payload.item._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload.changedItem)
            });
            ctx.commit('triggerCompleted', payload.item)
        },

        async clearDone(ctx){
            await fetch(`http://localhost:3000/todo/done`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            ctx.commit('deleteCompleted');
        }



    },
    mutations:{
        deleteCompleted(state){
            state.todos = state.todos.filter(todo => todo.completed === false)
        },
        triggerCompleted(state, todo){
          state.todos = state.todos.map((i) => {
              if(i === todo){
                  return {
                      ...todo,
                      completed: !todo.completed
                  }
              }
              return i;
          })
        },
        setDeleteTodo(state, deletedTodo){
            console.log(deletedTodo)
            state.todos = state.todos.filter(todo => todo._id !== deletedTodo);
            console.log(state.todos)
        },
        updateTodos(state, todos){
            state.todos = todos;
        },
        addNewTodo(state, todo){
            state.todos.unshift(todo);
        }
    },
    state:{
        todos: []
    },
    getters:{
        unDoneTodos(state) {
            const res = state.todos.filter(todo => todo.completed === false);
            return res;
        },

        doneTodos(state){
            const res = state.todos.filter(todo => todo.completed === true);
            return res;
        }
    }
}
