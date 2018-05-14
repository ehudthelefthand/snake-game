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
      this.location = new Vector(x, y)
      this.size = scale
      this.ctx = ctx
    }

    draw() {
      ctx.fillStyle = '#ff0077'
      ctx.fillRect(this.location.x, this.location.y, this.size, this.size)
    }
    
  }

  class Snake {

    constructor(scale, ctx) {
      this.location = new Vector(0, 0)
      this.dir = new Vector(1, 0)
      this.speed = 100
      this.size = scale
      this.ctx = ctx
    }

    setDir(x, y) {
      this.dir.x = x
      this.dir.y = y
    }

    update(dt) {
      this.location = Vector.add(this.location, Vector.mult(this.dir, this.speed * dt))
      this.location.x = constraint(this.location.x, 0, screen.width - this.size)
      this.location.y = constraint(this.location.y, 0, screen.height - this.size)
    }

    draw() {
      this.ctx.fillStyle = '#fff'
      this.ctx.fillRect(this.location.x, this.location.y, this.size, this.size)
    }

  }

  const ARROW_UP_KEY = 38
  const ARROW_DOWN_KEY = 40
  const ARROW_LEFT_KEY = 37
  const ARROW_RIGHT_KEY = 39

  let screen = document.getElementById('screen')
  let ctx = screen.getContext('2d')
  let scale = 10;
  let snake = new Snake(scale, ctx)
  let food = createFood()
  let lastTime, step;

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

  function draw(time) {
    if (lastTime) {
      let dt = (time - lastTime) / 1000
      clearScreen()
      snake.update(dt)
      snake.draw()
      food.draw()
    }
    lastTime = time
    requestAnimationFrame(draw)
  }

  document.onkeydown = (event) => {
    console.log(event.keyCode)
    if (event.keyCode === ARROW_UP_KEY) {
      snake.setDir(0, -1)
      event.preventDefault()
    } else if (event.keyCode === ARROW_DOWN_KEY) {
      snake.setDir(0, 1)
      event.preventDefault()
    } else if (event.keyCode === ARROW_LEFT_KEY) {
      snake.setDir(-1, 0)
      event.preventDefault()
    } else if (event.keyCode === ARROW_RIGHT_KEY) {
      snake.setDir(1, 0)
      event.preventDefault()
    }
  }

  draw()

})()