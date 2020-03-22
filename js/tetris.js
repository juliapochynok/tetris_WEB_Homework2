var playground = createPlayground();
var gamePauseFlag = false
delAllObj()
createObj()
console.log(playground);

// will add object positions to the emply playground array
function renderPositions() {
  if (objects.length != 0) {
  objects.forEach( object => {
    object.position.forEach( ([rowIndex, cellIndex]) => {
      playground[rowIndex][cellIndex] = TYPE_COLORS[object.type]
    })
  });
  }
  else {
    playground = createPlayground()
    objects = []
    stopGame()
  }
}

function moveDown(obj) {
  console.log('moving down')

  // 1. get current object - done
  let currentObject = getCurrentObject();
  
  if (!checkIfFallPossible(currentObject)) {
      return 0
  }
  // 2. re-define objects - done
  currentObject.position.forEach(position => (position[0] > 0 && (position[0] -= 1)))
  
  // 3. re-define clear playground
  playground = createPlayground();
  // 4. re-renderPositions
  // 5. re-renderPlayground
  renderPlayground()
}

function moveRight(obj) {
  console.log('moving right')
  let currentObject = getCurrentObject();
  let rightBorder = 4
  let canMove = true

  if (!checkIfFallPossible(currentObject)) {
    return 0
  }

  for (let cell of currentObject.position) {
    if (cell[1] >= rightBorder) {
      canMove = false
      break;
    }
  }
  if (canMove) {
    currentObject.position.forEach(position => (position[1] += 1))
  }
  // 3. re-define clear playground
  playground = createPlayground();

  // 4. re-renderPositions
  // 5. re-renderPlayground
  renderPlayground()
}

function moveLeft(obj) {
  console.log('moving left')
  let currentObject = getCurrentObject();
  let leftBorder = 0
  let canMove = true

  if (!checkIfFallPossible(currentObject)) {
    return 0
  }

  for (let cell of currentObject.position) {
    if (cell[1] <= leftBorder) {
      canMove = false
      break;
    }
  }
  if (canMove) {
    currentObject.position.forEach(position => (position[1] -= 1))
  }
  // 3. re-define clear playground
  playground = createPlayground();

  // 4. re-renderPositions
  // 5. re-renderPlayground
  renderPlayground()
}

function checkIfFallPossible() {
    let currentObject = getCurrentObject()
    if (typeof(currentObject) != 'object') {
      console.log(objects)
      createObj()
      renderPlayground()
      return false
    }
    let objPos = currentObject.position.sort(compare)
    let staticCells = findStaticCells()
    staticCells = staticCells.flat()
    for (let pos of objPos) {
      let positionToCheck = [0, 0]
      positionToCheck[0] = pos[0] - 1
      positionToCheck[1] = pos[1]

      if (checkPresence(pos, staticCells)) {
        playground = createPlayground()
        objects = []
        renderPlayground()
        stopGame()
        return false
      }
      else if (checkPresence(positionToCheck, staticCells) || pos[0] == 0) {
        currentObject.state = 'static'
        checkRowDeletion()
        if (!checkIfGameOver()) {
          createObj()
        }
        renderPlayground()
        return false
      }   
  }
  return true
}

function compare(a, b) {
  return a[0] - b[0]
}
function pauseGame() {
  if (!gamePauseFlag) {
    console.log('pausing the game')
    clearInterval(gameInterval);
  }
  else {
    console.log('resume the game')
    gameInterval = setInterval(() => {
      moveDown();
    }, 2000);
  }
  gamePauseFlag = !gamePauseFlag
}

function stopGame() {
  console.log('stop the game')
  clearInterval(gameInterval);
}


function checkPresence(el, arr) {
  a = JSON.stringify(arr);
  b = JSON.stringify(el);

  var c = a.indexOf(b);
  if(c != -1){
    return true
  }
  return false
}

function createObj() {
  let staticCells = findStaticCells()

  
  let possibleEl = [ 'L', 'T', 'I']
  const newEl = {}
  newEl.type = possibleEl[Math.floor(Math.random() * Math.floor(3))]
  let positionsArray = INITIAL_POSITIONS[newEl.type]
  let positions = positionsArray[Math.floor(Math.random() * positionsArray.length)]
  newEl.position = JSON.parse(JSON.stringify(positions))
  newEl.state = 'falling'
  objects.push(newEl) 
  for (let pos of newEl.position) {
    if (checkPresence(pos, staticCells)) {
      gameOver()
      return false
    }
  }
  return true
}

function delAllObj() {
  objects = []
  return objects
}

function checkRowDeletion() {
  let staticCells = findStaticCells()
  let countFlag = false
  for (let i = 9; i > -1; i--) {
    let counter = 0
    for (let j = 0; j < 5; j++) {
      let pos = [i, j]
      if (checkPresence(pos, staticCells)) {
        counter += 1
      }
      else { 
        counter = 0;
        break
      }
    }
    if (counter == 5) {
      deleteRow(i)
    }
  }
}

function deleteRow(rowNum) {
  for (let obj of objects) {
    for (let i = obj.position.length - 1; i > -1; i--) {
      if (obj.position[i][0] == rowNum) {
        obj.position.splice(i, 1)
      }
      else if (obj.position[i][0] > rowNum) {
        obj.position[i][0] = obj.position[i][0] - 1
      }
    }
 }
 playground = createPlayground();
 renderPlayground()
}

function checkIfGameOver() {
  let staticCells = findStaticCells()
  let countFlag = false
  for (let i = 0; i < 5; i++) {
    let pos = [9, i]
    if (checkPresence(pos, staticCells)) {
      gameOver()
      return true
    }
  } 
  return false  
}

function findStaticCells() {
  let staticCells = []
  for (let obj of objects) {
     if (obj.state === 'static') {
       staticCells.push(obj.position)
     }
  }
  return staticCells
}

function gameOver() {
  playground = createPlayground()
  objects = []
  renderPlayground()
  stopGame()
}


// Events
// 1. move to bottom
// 2. move right
// 3. move left
// 4. pause
// 5. game over
// 6. (re)render playground

renderPlayground()

// interval 1 second
var gameInterval = setInterval(() => {
  moveDown();
}, 2000)