<template>
    <div class="color-type">
        <span class="name">
            {{ name }}
        </span>
        <input
            v-model="modelColor"
            class="value"
        >
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: ''
        }
    },
    computed: {
        modelColor: {
            get() {
                return this.color
            },
            set(val) {
                this.$emit('inputColor', val)
            }
        }
    }
}
</script>

<style lang="scss">
.color-type {
    display: flex;
    margin-top: 8px;
    font-size: 12px;
    .name {
        width: 60px;
        height: 30px;
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999;
        background: #252930;
    }
    .value {
        flex: 1;
        height: 30px;
        min-width: 100px; // 可以让flex起作用
        padding: 0 12px;
        border: 0;
        color: #fff;
        background: #2e333a;
        box-sizing: border-box;
    }
}
</style>
