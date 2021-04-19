import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import i18n from './i18n'
import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css';


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
