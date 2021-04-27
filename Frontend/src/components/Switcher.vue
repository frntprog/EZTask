<template>
    <div class="switch">
        <label>
            English
            <input type="checkbox" v-model="isEngLocale" @change="changeLocale">
            <span class="lever"></span>
            Русский
        </label>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';

    export default {
        name: "Switcher",
        data() {
            return {
                isEngLocale: false
            }
        },
        methods: {
            ...mapMutations(['switchRussian', 'switchEnglish']),
            changeLocale() {
                if (this.isEngLocale) {
                    this.switchRussian();
                } else {
                    this.switchEnglish();
                }
            }
        }
    }
</script>

<style scoped>
    .switch {
        margin-top: 30px;
    }

    label {
        font-size: 20px;
    }
</style>
