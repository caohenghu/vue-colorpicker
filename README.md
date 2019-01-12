# vue-colorpicker

## installation

### yarn

```js
yarn add vue-colorpicker
```

### usage

```html
<template>
    <div :style="{background: color}">
        <color-picker
            :color="color"
            :sucker-canvas="suckerCanvas"
            :sucker-area="suckerArea"
            @change="change"
            @openSucker="openSucker"
        />
    </div>
</template>

<script>
    import colorPicker from 'vue-colorpicker'

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
            change(rgba) {
                this.color = rgba.toRgbaString()
            },
            openSucker(isOpen) {
                if (isOpen) {
                    // ... canvas be created
                    // this.suckerCanvas = canvas
                    // this.suckerArea = [x1, y1, x2, y2]
                } else {
                    // this.suckerCanvas && this.suckerCanvas.remove
                }
            }
        }
    }
</script>
```

### options

#### color

type: String, rgba or hex

why not v-model? because i think it's not necessary here.

#### change

type: Function

```js
change(rgba) {
    // {
    //     r: 255,
    //     g: 255,
    //     b: 255,
    //     a: 1,
    //     toRgbString,
    //     toRgbaString,
    //     toRgbaStringShort,
    //     toHexString,
    // }
}
```

#### openSucker

type: Function

`esc` and click sucker button can exit

```js
openSucker(isOpen) {
    // true or false
}
```

#### sucker-canvas

type: HTMLCanvasElement, default: null

#### sucker-area

type: Array, like `[x1, y1, x2, y2]`

> if you use sucker, then `openSucker`, `sucker-canvas`, `sucker-area` is necessary.