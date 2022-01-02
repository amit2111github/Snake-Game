const snakePositions = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
]

const map = new Map()
const snakeBodySet = new Set(['0 1', '0 2', '0 3', ' 0 4', '0 4'])

const endGame = () => {
  document.querySelector('.box').style.border = '1px solid red'
  clearInterval(timeId)
}
const right = ([x, y]) => {
  const newPart = x + ' ' + (y + 1)
  if (y + 1 >= 50) {
    endGame()
  }
  return [x, y + 1]
}
const left = ([x, y]) => {
  const newPart = x + ' ' + (y - 1)
  if (y - 1 < 0) {
    endGame()
  }
  return [x, y - 1]
}
const up = ([x, y]) => {
  const newPart = x - 1 + ' ' + y
  if (x - 1 < 0) {
    endGame()
  }
  return [x - 1, y]
}
const down = ([x, y]) => {
  const newPart = x + 1 + ' ' + y
  if (x + 1 >= 50) endGame()
  return [x + 1, y]
}

const getFood = () => {
  while (true) {
    const foodX = Math.floor(Math.random() * 50)
    const foodY = Math.floor(Math.random() * 50)
    if (!snakeBodySet.has(foodX + ' ' + foodY)) return [foodX, foodY]
  }
}
function removeSnakeBody([x, y]) {
  const div = map.get(x + ' ' + y)
  div.style.backgroundColor = 'white'
  div.style.border = '1px'
}

function drawFood([x, y]) {
  const div = map.get(x + ' ' + y)
  div.style.backgroundColor = 'blue'
  div.style.borderRadius = '50%'
}
function drawSnake() {
  snakePositions.forEach(([x, y], index) => {
    if (map.has(x + ' ' + y)) {
      const div = map.get(x + ' ' + y)
      div.style.border = '1px solid black'
      div.style.borderRadius = '0%'
      div.style.backgroundColor =
        index === snakePositions.length - 1 ? 'yellow' : 'green'
    }
  })
}

// making canvas
for (let i = 0; i < 50; i++) {
  for (let j = 0; j < 50; j++) {
    const div = document.createElement('div')
    div.style.position = 'absolute'
    div.style.width = 10 + 'px'
    div.style.height = 10 + 'px'
    div.style.left = j * 10 + 'px'
    div.style.top = i * 10 + 'px'
    document.querySelector('.box').appendChild(div)
    map.set(i + ' ' + j, div)
  }
}
const timeId = setInterval(() => {
  const len = snakePositions.length - 1
  const [x, y] = snakePositions[len]
  const newhead = curDir([x, y])
  if (newhead[0] === food[0] && food[1] === newhead[1]) {
    food = getFood()
    drawFood(food)
  } else {
    removeSnakeBody(snakePositions[0])
    snakeBodySet.delete(snakePositions[0][0] + ' ' + snakePositions[0][1])
    snakePositions.shift()
  }
  if (snakeBodySet.has(newhead[0] + ' ' + newhead[1])) endGame()
  snakeBodySet.add(newhead[0] + ' ' + newhead[1])
  snakePositions.push(newhead)

  drawSnake()
}, 100)

let curDir = right
drawSnake()
let food = getFood()
drawFood(food)

// change direction
window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (curDir !== down) {
        curDir = up
      }
      break
    case 'ArrowDown':
      if (curDir !== up) {
        curDir = down
      }
      break

    case 'ArrowLeft':
      if (curDir !== right) {
        curDir = left
      }
      break
    case 'ArrowRight':
      if (curDir !== left) {
        curDir = right
      }
      break
  }
})
