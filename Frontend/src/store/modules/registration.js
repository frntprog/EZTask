const to = require("await-to-js").default;
import router from '../../router/router';

export default {
    actions: {
        async registrateUser(ctx, payload) {
            console.log("ACTIOn");
            console.log(payload)
            try {
                const res = await fetch('http://localhost:3000/auth/registration', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                const response = await res.json();
                if (res.status >= 400) {
                    throw new Error(response.message);
                }
                ctx.commit('registration', payload);
            } catch (e) {
                localStorage.setItem('auth', false);
                throw new Error(e);

            }
        },
        async loginUser(ctx, payload) {
            console.log("LOGIN");
            console.log(payload)
            try {
                const res = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                const response = await res.json();
                console.log();
                if (res.status >= 400) {
                    throw new Error(response.message);
                }
                localStorage.setItem('auth', true);
                ctx.commit('login', payload);
            } catch (e) {
                localStorage.setItem('auth', false);
                throw new Error(e);

            }
        },
    },
    mutations: {
        registration(state, payload) {
            console.log("MUtation");
            router.push({
                name: "login"
            });
            // localStorage.setItem('auth', true);
            // localStorage.setItem('username', payload.username);
        },

        login(state, payload) {
            console.log("LOGIN MUTATION");
            router.push({
                name: "main"
            })
        }
    },
    getters: {},
    state: {
        userName: '',
        password: null
    }
}