const snakePositions = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
]
const map = new Map()

const endGame = () => {
  document.querySelector('.box').style.border = '1px solid red'
  clearInterval(timeId)
}
const right = ([x, y]) => {
  if (y + 1 >= 50) {
    endGame()
  }
  return [x, y + 1]
}
const left = ([x, y]) => {
  if (y - 1 < 0) {
    endGame()
  }
  return [x, y - 1]
}
const up = ([x, y]) => {
  if (x - 1 < 0) {
    endGame()
  }
  return [x - 1, y]
}
const down = ([x, y]) => {
  if (x + 1 >= 50) endGame()
  return [x + 1, y]
}
let curDir = right
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
function removeSnakeBody([x, y]) {
  const div = map.get(x + ' ' + y)
  div.style = ''
}

function drawSnake() {
  snakePositions.forEach(([x, y]) => {
    if (map.has(x + ' ' + y)) {
      const div = map.get(x + ' ' + y)
      div.style.border = '1px solid #032b08'
      div.style.backgroundColor = 'green'
    }
  })
}
drawSnake()

const timeId = setInterval(() => {
  const len = snakePositions.length - 1
  const [x, y] = snakePositions[len]
  snakePositions.push(curDir([x, y]))
  removeSnakeBody(snakePositions[0])
  snakePositions.shift()

  drawSnake()
}, 100)

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
