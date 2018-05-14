(() => {
  'use strict'

  // document.addEventListener('keypress', (event) => {
  //   const keyName = event.key;

  //   alert('keypress event\n\n' + 'key: ' + keyName);
  // });

  class Vector {
    constructor(x, y) {
      this.x = x
      this.y = y
    }

    static sub(v1, v2) {
      return new Vector(v1.x - v2.x, v1.y - v2.y)
    }

    static mult(v, value) {
      return new Vector(v.x * value, v.y * value)
    }

    static add(v1, v2) {
      return new Vector(v1.x + v2.x, v1.y + v2.y)
    }
  }

  class Food {
    constructor(scale, ctx, x, y) {
      this.scale = scale
      this.ctx = ctx

      this.x = x
      this.y = y
    }

    draw() {
      ctx.fillStyle = '#ff0077'
      ctx.fillRect(this.x, this.y, this.scale, this.scale)
    }
    
  }

  class Snake {

    constructor(scale, ctx) {
      this.location = new Vector(0, 0)
      this.speed = new Vector(1, 0)
      this.size = scale
      this.ctx = ctx
    }

    update(dt) {
      this.location = Vector.add(this.location, Vector.mult(this.speed, dt))
      this.location.x = constraint(this.location.x, 0, screen.width - this.size)
      this.location.y = constraint(this.location.y, 0, screen.height - this.size)
    }

    draw() {
      this.ctx.fillStyle = '#fff'
      this.ctx.fillRect(this.x, this.y, this.size, this.size)
    }

  }

  const ARROW_UP_KEY = 108
  const ARROW_DOWN_KEY = 111
  const ARROW_LEFT_KEY = 107
  const ARROW_RIGHT_KEY = 59

  let screen = document.getElementById('screen')
  let ctx = screen.getContext('2d')
  let scale = 10;
  let snake = new Snake(scale, ctx)
  let food = createFood()
  let previousTime;

  screen.width = 600;
  screen.height = 600;



  function constraint(value, from, to) {
    if (value > to) {
      value = to
    } else if (value < from) {
      value = from
    }
    return value
  }

  function random(n) {
    return Math.floor(Math.random() * n)
  }

  function createFood() {
    let cols = Math.floor(screen.width / scale)
    let rows = Math.floor(screen.height / scale)
    let x = random(cols)
    let y = random(rows)

    return new Food(scale, ctx, x, y)
  }

  function dist(pos1, pos2) {
  }

  function clearScreen() {
    ctx.clearRect(0, 0, screen.width, screen.height)
  }

  function draw() {
    clearScreen()
    
    snake.update()
    snake.draw()

    food.draw()

    requestAnimationFrame(draw)
  }

  document.addEventListener('keypress', (event) => {
    if (event.keyCode === ARROW_UP_KEY) {
      snake.dir(0, 1)
    } else if (event.keyCode === ARROW_DOWN_KEY) {
      snake.dir(0, -1)
    } else if (event.keyCode === ARROW_LEFT_KEY) {
      snake.dir(-1, 0)
    } else if (event.keyCode === ARROW_RIGHT_KEY) {
      snake.dir(1, 0)
    }
  })

  draw()

})()