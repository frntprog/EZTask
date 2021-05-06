import Vue from 'vue'
import Vuex from 'vuex'
import todo from './modules/todo'
import switcher from "./modules/switcher";
import registration from "./modules/registration";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        todo,
        switcher,
        registration
    }
})