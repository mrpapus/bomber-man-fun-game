let cvn = document.getElementById("myCanvas");
let ctx = cvn.getContext("2d");
cvn.width = 850;
cvn.height = 650;

//keys
let leftkeypressed = false;
let rightkeypressed = false;
let upkeypressed = false;
let downkeypressed = false;
let trigger = false;
//character
// event listener
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
let charX1 = 2;
let charY1 = 300;

//
let firepower = 1;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//handles building world
// the template for where hard and safe zone is
const template = [
  [1, 1, , , , , , , , , , , , , , 1, 1],
  [1, 2, , 2, , 2, , 2, , 2, , 2, , 2, , 2, 1],
  [1, , , , , , , , , , , , , , , , 1],
  [1, 2, , 2, , 2, , 2, , 2, , 2, , 2, , 2, 1],
  [1, , , , , , , , , , , , , , , , 1],
  [1, 2, , 2, , 2, , 2, , 2, , 2, , 2, , 2, 1],
  [1, 1, , , , , , , , , , , , , , 1, 1],
  [1, 2, , 2, , 2, , 2, , 2, , 2, , 2, , 2, 1],
  [1, , , , , , , , , , , , , , , , 1],
  [1, 2, , 2, , 2, , 2, , 2, , 2, , 2, , 2, 1],
  [1, , , , , , , , , , , , , , , , 1],
  [1, 2, , 2, , 2, , 2, , 2, , 2, , 2, , 2, 1],
  [1, 1, , , , , , , , , , , , , , 1, 1],
];

let cells = [];
generateLevel();
//generate the level once
function generateLevel() {
  cells = [];

  for (let row = 0; row < 13; row++) {
    cells[row] = [];

    for (let col = 0; col < 17; col++)
      if (!template[row][col] && Math.random() < 0.9) {
        cells[row][col] = "wall";
      } else if (template[row][col] === 1) {
        cells[row][col] = "safe";
      } else if (template[row][col] === 2) {
        cells[row][col] = "hard";
      } else {
        cells[row][col] = "noth";
      }
  }
}

//
//
//make the array items
function makeEnvironment(row, col) {
  // check where everything is and plot onto canvas
  //make walls
  if (cells[row][col] == "wall") {
    barrierDesign(col * 50, row * 50);
    //make hard zone
  } else if (cells[row][col] == "hard") {
    makeBrickWall(col * 50, row * 50);
  } else if (cells[row][col] > 79) {
    bombDesign(col * 50, row * 50);
    cells[row][col] -= 1;
  } else if (cells[row][col] > 1) {
    makefireshape(col * 50, row * 50);
    cells[row][col] -= 1;
  }
  //make the fire of the bomb

  if (cells[row][col] === 80) {
    //down

    if (row !== 12) {
      if (cells[row + 1][col] > 80) {
        cells[row + 1][col] = 81;
      } else if (cells[row + 1][col] !== "hard") {
        cells[row + 1][col] = 79;
      }
    }
    //up
    if (row !== 0) {
      if (cells[row - 1][col] > 80) {
        cells[row - 1][col] = 81;
      } else if (cells[row - 1][col] !== "hard") {
        cells[row - 1][col] = 79;
      }
    }
    //right
    if (cells[row][col + 1] > 80) {
      cells[row][col + 1] = 81;
    } else if (cells[row][col + 1] !== "hard") {
      if (cells[row][col + 1] === "wall") {
      }

      cells[row][col + 1] = 79;
    }
    //left
    fireleft(row, col, 1);
    fireleft(row, col, 2);
    cells[row][col] -= 1;
  }
}

//
//
//
//
//
//
function powerups(row, col) {
  let rand = Math.random();
  if (rand < 0.25) {
    cells[row][col] = "BBup";
  } else if (rand < 0.5) {
    cells[row][col] = "SDup";
  } else if (rand < 0.75) {
    cells[row][col] = "FFup";
  } else {
    cells[row][col] = "noth";
  }
}
//
//
//
//
//
//
function fireleft(row, col, num) {
  if (cells[row][col - num] > 80) {
    cells[row][col - num] = 81;
  } else if (cells[row][col - num] !== "hard") {
    cells[row][col - num] = 79;
  }
}
//
//
//
//
//
//

//
//
//movement for the character
function CharMovement() {
  if (rightkeypressed === true) {
    charX1 += 2;
  } else if (leftkeypressed === true) {
    charX1 -= 2;
  } else if (upkeypressed === true) {
    charY1 -= 2;
  } else if (downkeypressed === true) {
    charY1 += 2;
  }
  characterOne(charX1, charY1);
}
//
//
function characterOne(x, y) {
  makeShapes(x, y, "red", 40, 40);
}
//
//
//
//
//

//
//loops for everything
function loopstuff() {
  for (let row = 0; row < 13; row++) {
    for (let col = 0; col < 17; col++) {
      makeEnvironment(row, col);
      collision(row, col);
      //
    }
  }

  for (let row = 0; row < 13; row++) {
    for (let col = 0; col < 17; col++) {
      //
      makeEnvironment(row, col);
      collision(row, col);
      makebomb(row, col);
      //
    }
  }
}

//
//
//
//
//
//
//
//

function makebomb() {
  if (trigger === true) {
    cells[Math.round(charY1 / 50)][Math.round(charX1 / 50)] = 200;
  }
}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//
//
//this is the collison section
//
function collision(row, col) {
  if (cells[row][col] === "wall" || cells[row][col] === "hard") {
    //left and right
    if (
      charX1 + 40 === col * 50 &&
      charY1 < row * 50 + 50 &&
      charY1 > row * 50 - 40
    ) {
      rightkeypressed = false;
    } else if (
      charX1 === col * 50 + 50 &&
      charY1 < row * 50 + 50 &&
      charY1 > row * 50 - 40
    ) {
      leftkeypressed = false;
    }
    //up and down
    else if (
      charY1 + 40 === row * 50 &&
      charX1 < col * 50 + 50 &&
      charX1 > col * 50 - 40
    ) {
      downkeypressed = false;
    } else if (
      charY1 === row * 50 + 50 &&
      charX1 < col * 50 + 50 &&
      charX1 > col * 50 - 40
    ) {
      upkeypressed = false;
    }
  }
}
//
function makeborder() {
  if (charX1 < 2) {
    leftkeypressed = false;
  }
  if (charX1 > 810) {
    rightkeypressed = false;
  }
  if (charY1 < 1) {
    upkeypressed = false;
  }
  if (charY1 > 610) {
    downkeypressed = false;
  }
}
//
//
//
//
//
//
//
//
//
//
//
//

//
//
//

//
requestAnimationFrame(loop);
function loop() {
  makeShapes(0, 0, "chartreuse", cvn.width, cvn.height);
  makeborder();

  loopstuff();

  //enviro
  blackGrid();
  CharMovement();

  requestAnimationFrame(loop);
}
//
//
//
//
//
//

//
//
//
//
//
//
//
//
//shape and other thing that are important for looks

function makefireshape(x, y) {
  makeShapes(x, y, "red", 50, 50);
  makeShapes(x + 10, y + 10, "orange", 30, 30);
  makeShapes(x + 20, y + 20, "yellow", 10, 10);
}

//wall design
function makeBrickWall(x, y) {
  makeShapes(x, y, "silver", 50, 50);
  //blakshadow

  makeShapes(x, y + 47, "black", 50, 3);
  makeShapes(x + 5, y + 45, "black", 42, 2);
  //leftwhite
  makeShapes(x, y, "white", 3, 50);
  makeShapes(x + 2, y, "white", 2, 47);
  //top white
  makeShapes(x, y, "white", 50, 3);
}

// create black lines
function blackGrid() {
  for (let n = 50; n <= 850; n += 50) {
    //x axis lines
    makeShapes(0, n, "black", 850, 1);
    //y axis lines
    makeShapes(n, 0, "black", 1, 850);
  }
}

// //barrier
function barrierDesign(x, y) {
  makeShapes(x, y, "	gainsboro", 50, 50);
  makeShapes(x, y, "white", 3, 50);
  makeShapes(x + 2, y, "white", 2, 47);
  makeShapes(x, y, "white", 50, 3);
  makeShapes(x + 30, y + 30, "black", 20, 2);
  makeShapes(x + 40, y + 40, "black", 10, 2);
  makeShapes(x + 40, y + 20, "black", 2, 30);
  makeShapes(x + 10, y + 10, "black", 2, 40);
  makeShapes(x + 10, y + 40, "black", 20, 2);
  makeShapes(x, y + 20, "black", 30, 2);
  makeShapes(x + 30, y, "black", 2, 22);
  makeShapes(x + 20, y + 10, "black", 20, 2);
  makeShapes(x, y + 47, "black", 50, 3);
  makeShapes(x + 5, y + 45, "black", 42, 2);
}
// bomb design
function bombDesign(x, y) {
  ctx.linewidth = 2;
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(x + 25, y + 30, 20, 0, 2 * Math.PI);
  ctx.fill();
  //make words
  makeWords("12px arial", "yellow", "BOMB", x + 8, y + 30);
  makeShapes(x + 19, y, "red", 13, 8);
  makeShapes(x + 22, y + 2, "yellow", 6, 8);
  makeShapes(x + 20, y + 6, "Black", 10, 8);
}

//helpers that make stuff and shapes
// make words on canvas
function makeWords(fontSizeAfont, color, words, x, y) {
  ctx.font = fontSizeAfont;
  ctx.fillStyle = color;
  ctx.fillText(words, x, y);
}
//create color shapes
function makeShapes(Xaxis, Yaxis, color, sizex, sizey) {
  ctx.fillStyle = color;
  ctx.fillRect(Xaxis, Yaxis, sizex, sizey);
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//keys for movement
// keys down
function keydown() {
  //arrows
  if (event.keyCode === 37) {
    leftkeypressed = true;
  } else if (event.keyCode === 38) {
    upkeypressed = true;
  } else if (event.keyCode === 39) {
    rightkeypressed = true;
  } else if (event.keyCode === 40) {
    downkeypressed = true;
  } else if (event.keyCode === 96) {
    trigger = true;
  }
  //wasd
  else if (event.keyCode === 65) {
    leftkeypressedL = true;
  } else if (event.keyCode === 87) {
    upkeypressedL = true;
  } else if (event.keyCode === 68) {
    rightkeypressedL = true;
  } else if (event.keyCode === 83) {
    downkeypressedL = true;
  }
}

//key up
function keyup() {
  //arrows
  if (event.keyCode === 37) {
    leftkeypressed = false;
  } else if (event.keyCode === 38) {
    upkeypressed = false;
  } else if (event.keyCode === 39) {
    rightkeypressed = false;
  } else if (event.keyCode === 40) {
    downkeypressed = false;
  } else if (event.keyCode === 96) {
    trigger = false;
  }
  // wasd
  else if (event.keyCode === 65) {
    leftkeypressedL = false;
  } else if (event.keyCode === 87) {
    upkeypressedL = false;
  } else if (event.keyCode === 68) {
    rightkeypressedL = false;
  } else if (event.keyCode === 83) {
    downkeypressedL = false;
  }
}
