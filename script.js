let order         = []
let clickedOrder  = []
let score           = 0;

const blue          = document.querySelector('.blue')
const red           = document.querySelector('.red')
const green         = document.querySelector('.green')
const yellow        = document.querySelector('.yellow')

const lightcolor = (elementColor, number) => {
  number = number * 500
  setTimeout(() => {
    elementColor.classList.add('selected')
  }, number - 250)

  // fix multiple selection state
  setTimeout(() => {
    elementColor.classList.remove('selected')
  }, number)
}

const checkOrder = () => {
  for (const i in clickedOrder) {
      if (clickedOrder[i] !== order[i]) {
        gameOver()
        break
      }
  }
  if (clickedOrder.length === order.length) {
    alert(`Score: ${score}\nYou got it right. Next level!`);
    nextLevel()
  }
}

const click = (color) => {
  clickedOrder[clickedOrder.length] = color
  createColorElement(color).classList.add('selected')

  // fix multiple selection state
  setTimeout(() => {
    createColorElement(color).classList.remove('selected')
  }, 150)

  checkOrder()
}

const shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4)
  order[order.length] = colorOrder
  clickedOrder.length = 0

  for (const i in order) {
      const elementColor = createColorElement(order[i])
      lightcolor(elementColor, Number(i) + 1)
    }
}

const createColorElement = (color) => {
  // 0: green, 1: red, 2: yellow, 3: blue
  if (color === 0) {
    return green
  } else if (color === 1) {
    return red
  } else if (color === 2) {
    return yellow
  } else {
    return blue
  }
} 

const nextLevel = () => {
  score++
  shuffleOrder()
}

const gameOver = () => {
  alert(`Game Over\nScore: ${score}`);
  order.length = 0
  clickedOrder.length = 0

  playGame()
}

const playGame = () => {
  alert('Welcome!')
  score = 0

  nextLevel()
}

green.onclick = () => click(0)
red.onclick = () => click(1)
yellow.onclick = () => click(2)
blue.onclick = () => click(3)

playGame()