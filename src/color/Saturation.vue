<template>
    <div
        class="saturation"
        @mousedown.prevent.stop="selectSaturation"
        @touchstart.prevent.stop="selectSaturationTouch"
    >
        <canvas ref="canvasSaturation" />
        <Slide :style="slideSaturationStyle" />
    </div>
</template>

<script>
import mixin from './mixin'
import Slide from './Slide.vue'

export default {
    components: {
        Slide
    },
    mixins: [mixin],
    props: {
        color: {
            type: String,
            default: '#000000'
        },
        hsv: {
            type: Object,
            default: null
        },
        size: {
            type: Number,
            default: 152
        }
    },
    data() {
        return {
            slideSaturationStyle: {}
        }
    },
    // 不能监听，否则自己改变自己时，颜色也会发生变化
    // watch: {
    //     color() {
    //         this.renderColor()
    //     }
    // },
    mounted() {
        this.renderColor()
        this.renderSlide()
    },
    methods: {
        renderColor() {
            const canvas = this.$refs.canvasSaturation
            const size = this.size
            const ctx = canvas.getContext('2d')
            canvas.width = size
            canvas.height = size

            ctx.fillStyle = this.color
            ctx.fillRect(0, 0, size, size)

            this.createLinearGradient('l', ctx, size, size, '#FFFFFF', 'rgba(255,255,255,0)')
            this.createLinearGradient('p', ctx, size, size, 'rgba(0,0,0,0)', '#000000')
        },
        renderSlide() {
            this.slideSaturationStyle = {
                left: this.hsv.s * this.size - 7 + 'px',
                top: (1 - this.hsv.v) * this.size - 2 + 'px',
                background: this.color
            }
        },
        changeStart (e) {
            const { top, left } = this.$el.getBoundingClientRect()
            this.saturationLeft = left
            this.saturationTop = top
            this.ctx = e.target.getContext('2d')
        },
        change (e) {
            if (!this.saturationLeft || !this.saturationTop || !this.ctx) return

            const clientX = e.clientX || e.touches[0].clientX
            const clientY = e.clientY || e.touches[0].clientY

            let x = clientX - this.saturationLeft
            let y = clientY - this.saturationTop

            if (x < 0) {
                x = 0
            }
            if (y < 0) {
                y = 0
            }
            if (x > this.size) {
                x = this.size
            }
            if (y > this.size) {
                y = this.size
            }

            // 不通过监听数据变化来修改dom，否则当颜色为#ffffff时，slide会跑到左下角
            this.slideSaturationStyle = {
                left: x - 7 + 'px',
                top: y - 2 + 'px',
                background: this.color
            }
            // 如果用最大值，选择的像素会是空的，空的默认是黑色
            const imgData = this.ctx.getImageData(Math.min(x, this.size - 1), Math.min(y, this.size - 1), 1, 1)
            const [r, g, b] = imgData.data
            this.$emit('selectSaturation', { r, g, b })
        },
        changeEnd () {
            delete this.saturationTop
            delete this.saturationLeft
            delete this.ctx
        },
        selectSaturation(e) {
            this.changeStart(e)
            this.change(e)

            const mouseup = () => {
                this.changeEnd()
                document.removeEventListener('mousemove', this.change)
                document.removeEventListener('mouseup', mouseup)
            }

            document.addEventListener('mousemove', this.change)
            document.addEventListener('mouseup', mouseup)
        },
        selectSaturationTouch (e) {
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
.saturation {
    position: relative;
    cursor: pointer;
}
</style>