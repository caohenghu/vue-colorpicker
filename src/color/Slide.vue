<template>
    <div class="slide">
        <canvas
            ref="canvasAlpha"
            class="canvas"
        />
    </div>
</template>

<script>
import mixin from './mixin'

export default {
    mixins: [mixin],
    mounted () {
        const canvas = this.$refs.canvasAlpha
        const canvasSquare = this.createAlphaSquare(5)
        const ctx = canvas.getContext('2d')
        const width = 13
        const height = 13
        canvas.width = width
        canvas.height = height

        ctx.fillStyle = ctx.createPattern(canvasSquare, 'repeat')
        ctx.fillRect(0, 0, width, height)
    }
}
</script>

<style scoped>
  .slide {
    position: absolute;
    left: 0;
    top: 100px;
    width: 13px;
    height: 1px;
    pointer-events: none;
  }
  .slide:after {
    content: '';
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 100%;
    box-shadow: 0 0 0 2px white, 0 2px 4px 2px rgb(0 0 0 / 50%);
    transform: translate(1px, calc(-50% + 1px));
    background: inherit;
  }
  .canvas {
    transform: translate(1px, calc(-50% + 1px));
    position: absolute;
    border-radius: 100%
  }
</style>