<template>
    <div class="color-type">
        <span class="name">
            {{ name }}
        </span>
        <input
            v-model="modelColor"
            class="value"
            @keyup="emitColorChange"
            @blur="emitColorChange"
        >
    </div>
</template>

<script>
export default {
    created () {
        // Sets default colour if exists from prop
        if (this.color) this.modelColor = this.color;
    },
    data () {
        return {
            modelColor: ''
        }
    },
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
    methods: {
        // Emits colour change on blur
        emitColorChange () {
            // If valid HEX color, emit color
            if (/^#[0-9A-F]{6}$/i.test(this.modelColor)) {
                this.$emit('inputColor', this.modelColor);
            }
        }
    },
    watch: {
        // Watches for any change in the color prop, updates this.modelColor
        color (newVal, oldVal) {
            this.modelColor = newVal;
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
