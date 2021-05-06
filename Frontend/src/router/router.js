import Vue from 'vue';
import Router from 'vue-router';
import TodoDetailPage from "../components/DetailsPage/TodoDetailPage";
import Todos from "../components/Todos";
import NotFound from '../components/errors/404';
import Form from "../components/LogIn_form/Form";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'main',
            component: Todos
        },
        {
            path: '/detail/:id',
            component: TodoDetailPage,
            beforeEnter: (to, form, next) => {
                if (localStorage.getItem('auth')) {
                    next();
                } else {
                    next({
                        name: 'main'
                    })
                }
            }
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound
        },
        {
            path: '/registration',
            component: Form
        }
    ]
})