const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
const width = 20
const height = 200
ctx.width = width
ctx.height = height

const gradient = ctx.createLinearGradient(0, 0, 0, height);
gradient.addColorStop(1.66 * 0, '#FF0000'); //红
gradient.addColorStop(1.66 * 1, '#FF7F00'); //橙
gradient.addColorStop(1.66 * 2, '#FFFF00'); //黄
gradient.addColorStop(1.66 * 3, '#00FF00'); //绿
gradient.addColorStop(1.66 * 4, '#00FFFF'); //青
gradient.addColorStop(1.66 * 5, '#0000FF'); //蓝
gradient.addColorStop(1.66 * 6, '#8B00FF'); //紫
ctx.fillStyle = gradient; 
ctx.fillRect(0, 0, width, height);

document.body.append(canvas)
