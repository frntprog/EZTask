import Vue from 'vue';
import Router from 'vue-router';
import TodoDetailPage from "./components/DetailsPage/TodoDetailPage";
import Todos from "./components/Todos";

Vue.use(Router);

export default new Router(
    {
        mode: 'history',
        routes: [
            {
                path: '/',
                component: Todos
            },
            {
                path: '/detail/:id',
                component: TodoDetailPage
            }
        ]

    }
)
