import i18n from "../../i18n";
export default {
    mutations: {
        switchRussian(state){
            state.switch = 'rus';
            i18n.locale = 'rus';
        },
        switchEnglish(state){
            state.switch = 'en';
            i18n.locale = 'en';
        }
    },
    state: {
        switch: 'en'
    }
}
