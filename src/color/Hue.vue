<template>
    <div
        class="hue"
        @mousedown.prevent.stop="selectHue"
        @touchstart.prevent.stop="selectHueTouch"
    >
        <canvas ref="canvasHue" />
        <div
            :style="slideHueStyle"
            class="slide"
        />
    </div>
</template>

<script>
export default {
    props: {
        hsv: {
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
            slideHueStyle: {}
        }
    },
    // 不能监听，否则操作saturation时，这里的slide会抖动
    // watch: {
    //     'hsv.h'() {
    //         this.renderSlide()
    //     }
    // },
    mounted() {
        this.renderColor()
        this.renderSlide()
    },
    methods: {
        renderColor() {
            const canvas = this.$refs.canvasHue
            const width = this.width
            const height = this.height
            const ctx = canvas.getContext('2d')
            canvas.width = width
            canvas.height = height

            const gradient = ctx.createLinearGradient(0, 0, 0, height)
            gradient.addColorStop(0, '#FF0000') // 红
            gradient.addColorStop(0.17 * 1, '#FF00FF') // 紫
            gradient.addColorStop(0.17 * 2, '#0000FF') // 蓝
            gradient.addColorStop(0.17 * 3, '#00FFFF') // 青
            gradient.addColorStop(0.17 * 4, '#00FF00') // 绿
            gradient.addColorStop(0.17 * 5, '#FFFF00') // 黄
            gradient.addColorStop(1, '#FF0000') // 红
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, width, height)
        },
        renderSlide() {
            this.slideHueStyle = {
                top: (1 - this.hsv.h / 360) * this.height - 2 + 'px'
            }
        },
        changeStart (e) {
            const { top } = this.$el.getBoundingClientRect()
            this.hueTop = top
            this.ctx = e.target.getContext('2d')
        },
        change (e) {
            if (!this.hueTop || !this.ctx) return

            const clientY = e.clientY || e.touches[0].clientY

            let y = clientY - this.hueTop

            if (y < 0) {
                y = 0
            }
            if (y > this.height) {
                y = this.height
            }

            this.slideHueStyle = {
                top: y - 2 + 'px'
            }
            // 如果用最大值，选择的像素会是空的，空的默认是黑色
            const imgData = this.ctx.getImageData(0, Math.min(y, this.height - 1), 1, 1)
            const [r, g, b] = imgData.data
            this.$emit('selectHue', { r, g, b })
        },
        changeEnd () {
            delete this.hueTop
            delete this.ctx
        },
        selectHue(e) {
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
        selectHueTouch(e) {
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
  .hue {
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