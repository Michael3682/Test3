const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')
const balls = []
const width = window.innerWidth
const height = window.innerHeight
canvas.width = width
canvas.height = height

window.addEventListener('resize', () => {
    canvas.width = width
    canvas.height = height
})

class Ball {
    constructor(x, y, velx, vely, size) {
        this.x = x
        this.y = y
        this.velx = velx
        this.vely = vely
        this.size = size
        this.color = `hsl(${Math.floor(Math.random() * 250 + 10)}, 100%, ${Math.floor(Math.random() * 70 + 35)}%)`
    }
    update() {
        if (this.x + this.size >= width || this.x - this.size <= 0) {
            this.velx = -this.velx
            this.color = `hsl(${Math.floor(Math.random() * 250 + 10)}, 100%, ${Math.floor(Math.random() * 70 + 35)}%)`
        }
        if (this.y + this.size >= height || this.y - this.size <= 0) {
            this.vely = -this.vely
            this.color = `hsl(${Math.floor(Math.random() * 250 + 10)}, 100%, ${Math.floor(Math.random() * 70 + 35)}%)`
        }
        this.x += this.velx
        this.y += this.vely
    }
    draw() {
        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        c.fill()
    }
}

function handleBall() {
    while (balls.length < 20) {
        const ball = new Ball(Math.ceil(Math.random() * 100 + 100), Math.ceil(Math.random() * 100 + 100), Math.floor(Math.random() * 10 + 5), Math.floor(Math.random() * 10 + 5), Math.floor(Math.random() * 30 + 10))
        balls.push(ball)
    }
    for (let i = 0; i < balls.length; i++) {
        balls[i].update()
        balls[i].draw()
    }
}

function loop() {
    handleBall()
    c.fillStyle = 'rgb(0, 0, 0, 0.25)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(loop)
}

loop()