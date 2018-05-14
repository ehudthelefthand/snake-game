(function() {
  'use strict'

  const ARROW_UP_KEY = 38
  const ARROW_DOWN_KEY = 40
  const ARROW_LEFT_KEY = 37
  const ARROW_RIGHT_KEY = 39

  const screen = document.getElementById('screen')
  const ctx = screen.getContext('2d')
  const scale = 10;
  const snake = createSnake({ scale, ctx })
  const food = createFood({ scale, ctx })
  let lastTime, step

  screen.width = 600
  screen.height = 600

  document.addEventListener('keydown', function(event) {
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
  })

  draw()

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

  function clearScreen() {
    ctx.clearRect(0, 0, screen.width, screen.height)
  }

  function createSnake(spec) {
    let { scale, ctx } = spec
    let location = { x: 0, y: 0 }
    let dir = { x: 1, y: 0 }
    let speed = 100 // px per sec
    
    function setDir(x, y) {
      if (dir.x != 0 && x != 0) { return }
      if (dir.y != 0 && y != 0) { return }
      dir.x = x
      dir.y = y
    }

    function update(dt) {
      location = addVector(location, multVector(dir, speed * dt))
      location.x = constraint(location.x, 0, screen.width - scale)
      location.y = constraint(location.y, 0, screen.height - scale)
    }

    function draw() {
      ctx.fillStyle = '#fff'
      ctx.fillRect(location.x, location.y, scale, scale)
    } 

    return Object.freeze({
      setDir: setDir,
      update: update, 
      draw: draw
    })
  }

  function createFood(spec) {
    let { scale, ctx } = spec
    let cols = Math.floor(screen.width / scale)
    let rows = Math.floor(screen.height / scale)
    let location = { x: random(cols), y: random(rows) }

    function draw() {
      ctx.fillStyle = '#ff0077'
      ctx.fillRect(location.x, location.y, scale, scale)
    }

    return Object.freeze({
      draw: draw
    })
  }    

  function subVector(v1, v2) {
    return { 
      x: v1.x - v2.x, 
      y: v1.y - v2.y
    }
  }

  function multVector(v, value) {
    return {
      x: v.x * value,
      y: v.y * value
    }
  }

  function addVector(v1, v2) {
    return { 
      x: v1.x + v2.x, 
      y: v1.y + v2.y
    }
  }

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

}())
