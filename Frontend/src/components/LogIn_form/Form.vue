<template>
    <div class="form_wrapper">
        <h2>Sign In</h2>
        <form @submit.prevent>
        <input class="username" :show="showUsername" placeholder="Enter yout username" type="text" v-model="userName">
        <input class="password" :show="showUsername" placeholder="Enter yout password" type="text" v-model="password">
        <div class="button-wrapper">
            <button type="submit">{{$t("buttons.submit")}}</button>
        </div>
    </form>
    </div>
</template>

<script>
export default {
    name: "From",
    data() {
        return{
            userName: '',
            password: null
        }
    },
    computed: {
        showUsername(){
            console.log(this.userName, this.password);
        }
    }
}
</script>

<style lang="scss" scoped>

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 70px 0;
    }

    .username{
        margin: 30px 0;
    }

    input {
        width: 300px !important;
        border: none;
        border-bottom: 1px solid $white;
        outline: none;
        font-size: 16px;
        transition: all 0.3s;
        margin: 15px 0 !important;
    }

    input:focus {
        border-bottom: 1px solid cornflowerblue;
    }

    button {
        border: none;
        background-color: lightblue;
        cursor: pointer;
        padding: 10px 15px;
        color: $white;
        border-radius: 5px;
        transition: all 0.3s ease-out;
        margin: 30px
    }

    button:hover {
        background-color: cadetblue;
    }
</style>