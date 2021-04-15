<template>
    <div class="sub-from">
        <form @submit.prevent="submit(todo)">
            <input type="text" placeholder="Add subtask" v-model="subtask">
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "SubtaskForm",
        props: ['todo'],
        data() {
            return {
                subtask: ''
            }
        },
        methods: {
            ...mapActions(['addSubtask']),
            submit(item) {
                console.log(this.subtask)
                const payload = {
                    id: item._id,
                    res: {
                        subTask: this.subtask
                    }
                }
                this.addSubtask(payload);
                this.subtask = '';
            }
        }
    }
</script>

<style scoped>
    .sub-from{
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    form {
        display: flex;
        justify-content: space-between;
        margin: 30px 0 50px 0;
    }

    input {
        width: 300px;
        border: none;
        border-bottom: 1px solid #cccccc;
        outline: none;
        font-size: 16px;
        transition: all 0.3s;
    }

    input:focus {
        border-bottom: 1px solid cornflowerblue;
    }

    button {
        border: none;
        background-color: lightblue;
        cursor: pointer;
        padding: 10px 15px;
        color: #ffffff;
        border-radius: 5px;
        transition: all 0.3s ease-out;
    }

    button:hover {
        background-color: cadetblue;
    }
</style>
