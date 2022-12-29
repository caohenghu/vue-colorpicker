<template>
    <div
        class="color-alpha"
        @mousedown.prevent.stop="selectAlpha"
        @touchstart.prevent.stop="selectAlphaTouch"
    >
        <canvas ref="canvasAlpha" />
        <div
            :style="slideAlphaStyle"
            class="slide"
        />
    </div>
</template>

<script>
import mixin from './mixin'
export default {
    mixins: [mixin],
    props: {
        color: {
            type: String,
            default: '#000000'
        },
        rgba: {
            type: Object,
            default: null
        },
        width: {
            type: Number,
            default: 15
        },
        height: {
            type: Number,
            default: 152
        }
    },
    data() {
        return {
            slideAlphaStyle: {},
            alphaSize: 5
        }
    },
    watch: {
        color() {
            this.renderColor()
        },
        'rgba.a'() {
            this.renderSlide()
        }
    },
    mounted() {
        this.renderColor()
        this.renderSlide()
    },
    methods: {
        renderColor() {
            const canvas = this.$refs.canvasAlpha
            const width = this.width
            const height = this.height
            const size = this.alphaSize
            const canvasSquare = this.createAlphaSquare(size)

            const ctx = canvas.getContext('2d')
            canvas.width = width
            canvas.height = height

            ctx.fillStyle = ctx.createPattern(canvasSquare, 'repeat')
            ctx.fillRect(0, 0, width, height)

            this.createLinearGradient('p', ctx, width, height, 'rgba(255,255,255,0)', this.color)
        },
        changeStart () {
            const { top } = this.$el.getBoundingClientRect()
            this.hueTop = top
        },
        change (e) {
            const clientY = e.clientY || e.touches[0].clientY
            let y = clientY - this.hueTop

            if (y < 0) {
                y = 0
            }
            if (y > this.height) {
                y = this.height
            }

            let a = parseFloat((y / this.height).toFixed(2))
            this.$emit('selectAlpha', a)
        },
        changeEnd () {
            delete this.hueTop
        },
        renderSlide() {
            this.slideAlphaStyle = {
                top: this.rgba.a * this.height - 2 + 'px'
            }
        },
        selectAlpha(e) {
            this.changeStart()
            this.change(e)

            const mouseup = () => {
                this.changeEnd()
                document.removeEventListener('mousemove', this.change)
                document.removeEventListener('mouseup', mouseup)
            }

            document.addEventListener('mousemove', this.change)
            document.addEventListener('mouseup', mouseup)
        },
        selectAlphaTouch(e) {
            this.changeStart(e)

            this.change(e)

            const touchend = () => {
                this.changeEnd()
                document.removeEventListener('touchmove', this.change)
                document.removeEventListener('touchend', touchend)
            }

            document.addEventListener('touchmove', this.change)
            document.addEventListener('touchend', touchend)
        }
    }
}
</script>

<style lang="scss">
.color-alpha {
    position: relative;
    margin-left: 8px;
    cursor: pointer;
    .slide {
        position: absolute;
        left: 0;
        top: 100px;
        width: 100%;
        height: 4px;
        background: #fff;
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.3);
        pointer-events: none;
    }
}
</style>