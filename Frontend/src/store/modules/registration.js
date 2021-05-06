export default {
    actions: {
        async registrateUser(ctx, payload) {
            try {
                const res = await fetch('http://localhost:3000/auth/registration', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                // const response = await res.json();
                ctx.commit('LogIn', payload);
            } catch (e) {
                throw new Error(e)
            }
        },
    },
    mutations: {
        LogIn() {
            localStorage.setItem('auth', true);
        }
    },
    getters: {},
    state: {
        userName: '',
        password: null
    }
}