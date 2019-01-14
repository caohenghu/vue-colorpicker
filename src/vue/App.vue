<template>
    <div class="hu-page">
        <div
            class="bg"
            :style="{background: color}"
        >
            <div class="title">
                vue-colorpicker
            </div>
            <div class="cover">
                <div v-if="isSucking">
                    <img ref="cover">
                </div>
                <color-picker
                    :color="color"
                    :sucker-hide="false"
                    :sucker-canvas="suckerCanvas"
                    :sucker-area="suckerArea"
                    @changeColor="changeColor"
                    @openSucker="openSucker"
                />
            </div>
        </div>
        <div class="github">
            <a
                href="https://github.com/caohenghu/vue-colorpicker"
                target="_blank"
            >
                Fork me on GitHub
            </a>
        </div>
    </div>
</template>

<script>
import colorPicker from './main'
import imgCover from '../img/cover.jpg'

export default {
    components: {
        colorPicker
    },
    data() {
        return {
            color: '#59c7f9',
            suckerCanvas: null,
            suckerArea: [],
            isSucking: false
        }
    },
    methods: {
        changeColor(color) {
            this.color = color.rgba.toRgbaString()
        },
        openSucker(isOpen) {
            if (isOpen) {
                this.isSucking = true
                const image = new Image()
                image.onload = () => {
                    const cover = this.$refs.cover
                    cover.setAttribute('crossorigin', 'Anonymous')
                    cover.src = imgCover
                    setTimeout(() => {
                        const coverRect = cover.getBoundingClientRect()
                        const canvas = this.createCanvas(cover, coverRect)
                        document.body.appendChild(canvas)
                        this.suckerCanvas = canvas
                        this.suckerArea = [
                            coverRect.left,
                            coverRect.top,
                            coverRect.left + coverRect.width, 
                            coverRect.top + coverRect.height
                        ]
                    }, 10)
                }
                image.src = imgCover
            } else {
                this.suckerCanvas && this.suckerCanvas.remove()
                this.isSucking = false
            }
        },
        createCanvas(cover, coverRect) {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            canvas.width = coverRect.width
            canvas.height = coverRect.height
            
            ctx.drawImage(cover, 0, 0, coverRect.width, coverRect.height)
            Object.assign(canvas.style, {
                position: 'absolute',
                left: coverRect.left + 'px',
                top: coverRect.top + 'px',
                opacity: 0
            })
            return canvas

        }
    }
}
</script>

<style lang="scss">
.hu-page {
    height: 100%;
    .bg {
        // margin-top: 1000px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .title {
            color: #fff;
            font-size: 48px;
            text-shadow: 0 0 8px rgba(0, 0, 0, 0.16);
        }
        .cover {
            display: flex;
            justify-content: space-around;
            width: 100%;
        }
    }
    .github {
        position: fixed;
        right: 0;
        top: 0;
        width: 200px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        font-weight: bold;
        background: #a00;
        text-align: center;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3);
        transform: rotate(45deg) translateX(60px);
        a {
            display: block;
            text-decoration: none;
            color: #fff;
        }
    }
}
</style>
