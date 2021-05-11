import Vue from 'vue';
import Router from 'vue-router';
import TodoDetailPage from "../components/DetailsPage/TodoDetailPage";
import Todos from "../components/Todos";
import NotFound from '../components/errors/404';
import RegistrationForm from "../components/LogIn_form/RegistrationForm";
import LoginForm from "../components/LogIn_form/LoginForm";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'registration',
            component: RegistrationForm
        },
        {
            path: '/login',
            name: 'login',
            component: LoginForm,
            beforeEnter: (to, form, next) => {
                console.log("MAIN", localStorage.getItem('auth'));
                if (localStorage.getItem('auth')) {
                    next();
                } else {
                    next({
                        name: 'registration'
                    })
                }
            }
        },
        {
            path: '/main',
            name: 'main',
            component: Todos,
            beforeEnter: (to, form, next) => {
                console.log("MAIN", localStorage.getItem('auth'));
                if (localStorage.getItem('auth')) {
                    next();
                } else {
                    next({
                        name: 'registration'
                    })
                }
            }
        },
        {
            path: '/detail/:id',
            component: TodoDetailPage,
            beforeEnter: (to, form, next) => {
                console.log(localStorage.getItem('auth'))
                if (localStorage.getItem('auth')) {
                    next();
                } else {
                    next({
                        name: 'registration'
                    })
                }
            }
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound
        }
    ]
})