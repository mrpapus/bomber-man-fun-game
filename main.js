let cvn = document.getElementById("myCanvas");
let ctx = cvn.getContext("2d");
cvn.width = 850;
cvn.height = 650;

//keys
let leftkeypressed = false;
let rightkeypressed = false;
let upkeypressed = false;
let downkeypressed = false;

//character 1

// event listener
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
let charX1 = 0;
let charY1 = 350;
makeShapes(0, 0, "chartreuse", cvn.width, cvn.height);

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
      if (!template[row][col] && Math.random() < 0.8) {
        cells[row][col] = "wall";
      } else if (template[row][col] === 1) {
        cells[row][col] = "safe";
      } else if (template[row][col] === 2) {
        cells[row][col] = "hard";
      }
  }
}
//
//

function makeEnvironment() {
  // check where everything is and plot onto canvas
  for (let row = 0; row < 13; row++) {
    for (let col = 0; col < 17; col++) {
      //make walls
      if (cells[row][col] == "wall") {
        barrierDesign(col * 50, row * 50);
        //make hard zone
      } else if (cells[row][col] == "hard") {
        makeBrickWall(col * 50, row * 50);
      } else if (cells[row][col] == "bomb") {
        makeBrickWall(col * 50, row * 50);
      }
    }
  }
}

//
//
//movement for the character
function CharMovement() {
  if (rightkeypressed === true) {
    charX1 += 1;
  } else if (leftkeypressed === true) {
    charX1 -= 1;
  } else if (upkeypressed === true) {
    charY1 -= 1;
  } else if (downkeypressed === true) {
    charY1 += 1;
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
//
//
//
//
//

//
requestAnimationFrame(loop);
function loop() {
  makeShapes(0, 0, "chartreuse", cvn.width, cvn.height);

  makeEnvironment();
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
