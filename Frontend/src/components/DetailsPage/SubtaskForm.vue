<template>
    <div class="sub-from">
        <form @submit.prevent="submit(todo)">
            <input type="text" :placeholder='$t("input.addSubTask")' v-model="subtask">
            <div class="button-wrapper">
                <button type="submit">{{$t("buttons.submit")}}</button>
            </div>
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

<style lang="scss" scoped>
    .sub-from {
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
        border-bottom: 1px solid $white;
        outline: none;
        font-size: 16px;
        transition: all 0.3s;
    }

    input:focus {
        border-bottom: 1px solid $input-focus;
    }

    button {
        border: none;
        background-color: $submit-btn;
        cursor: pointer;
        padding: 10px 15px;
        color: $white;
        border-radius: 5px;
        transition: all 0.3s ease-out;
    }

    button:hover {
        background-color: $submit-btn-hover;
    }
</style>
