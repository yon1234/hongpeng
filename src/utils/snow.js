var screenW = 0;
var screenH = 0;
var snowsNum  
var timer
wx.getSystemInfo({
  success: (res) => {
    screenW = res.screenWidth
    screenH = res.screenHeight
  },
})
class Snow {
  constructor() {
    this.canvas = {}
    this.snow = []
    this.init()
  }
  init() {
    this.canvas = wx.createCanvasContext("snow", this)
    this.generateSnow()
  }
  //随机生成雪花半径
  rand(num) {
    return Math.floor(Math.random() * num + 1)
  }
  //雪花飘落速度
  getRanNum(n, m) {
    return Math.floor(Math.random() * (m - n) + n);
  }
  //生成雪花
  generateSnow() {
    snowsNum = setInterval(() => {
      let snows = {
        r: this.rand(5), //雪花半径
        x: this.rand(screenW), //雪花坐标位置
        y: this.rand(screenH),
        speedx: this.getRanNum(-5, 5), //雪花飘落速度
        speedy: -this.getRanNum(8, 16)
      }
      this.snow.push(snows)
    }, 100)
  }

  //绘制雪花
  drawSnow() {
    let canvas = this.canvas
    let snow = this.snow
    canvas.clearRect(0, 0, screenW, screenH)
    for (let i = 0; i < snow.length; i++) {
      snow[i].x += snow[i].speedx
      snow[i].y += snow[i].speedy
      //超出屏幕高度时移除雪花
      if (snow[i].y > screenH) {
        this.snow.splice(i, 1)
      }
      canvas.beginPath()
      let snowColor = canvas.createCircularGradient(snow[i].x, snow[i].y, snow[i].r)
      snowColor.addColorStop(0, "rgba(41, 214, 233,1)")
      snowColor.addColorStop(1, "rgba(41, 214, 233,0.2)")
      canvas.setFillStyle(snowColor)
      canvas.arc(snow[i].x, snow[i].y, snow[i].r, 0, 2 * Math.PI)
      canvas.fill()
    }
    canvas.draw()
  }
}
function play() {
  //清除定时器
  clearInterval(snowsNum)
  clearInterval(timer)
  let snow = new Snow()
  timer = setInterval(() => {
    snow.drawSnow()
  }, 100)

}
export default {
  play
}
