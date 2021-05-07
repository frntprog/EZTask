export default {
    actions: {
        async registrateUser(ctx, payload) {
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
                console.log(response);
                ctx.commit('LogIn', payload);
            } catch (e) {
                throw new Error(e)
            }
        },
    },
    mutations: {
        LogIn(state, payload) {
            localStorage.setItem('auth', true);
            localStorage.setItem('username', payload.username);
        }
    },
    getters: {},
    state: {
        userName: '',
        password: null
    }
}