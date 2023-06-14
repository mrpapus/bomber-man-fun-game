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
let leftkeypressedL = false;
let rightkeypressedL = false;
let upkeypressedL = false;
let downkeypressedL = false;
let triggerL = false;
//character
// event listener
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
document.addEventListener("click", click);
let cells = [];
//character 1
let charX1 = 50;
let charY1 = 300;
//character 2
let charX2 = 760;
let charY2 = 300;

//
let firepower = 2;
let speed1 = 1.5;
let bombpower = 1;
//character2
let firepower2 = 2;
let speed2 = 1.5;
let bombpower2 = 1;
//character 1
let hitR = false;
let hitL = false;
let hitU = false;
let hitD = false;
//
let chardead = "";
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
function click() {
  if (chardead === "Characher Blue") {
    location.reload();
  }
}
//handles building world
// the template for where hard and safe zone is
const template = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 1, , , , , , , , , , , , , , 1, 2],
  [2, 1, 2, , 2, , 2, , 2, , 2, , 2, , 2, 1, 2],
  [2, 1, , , , , , , , , , , , , , 1, 2],
  [2, 1, 2, , 2, , 2, , 2, , 2, , 2, , 2, 1, 2],
  [2, 1, , , , , , , , , , , , , , 1, 2],
  [2, 1, 2, , 2, , 2, , 2, , 2, , 2, , 2, 1, 2],
  [2, 1, , , , , , , , , , , , , , 1, 2],
  [2, 1, 2, , 2, , 2, , 2, , 2, , 2, , 2, 1, 2],
  [2, 1, , , , , , , , , , , , , , 1, 2],
  [2, 1, 2, , 2, , 2, , 2, , 2, , 2, , 2, 1, 2],
  [2, 1, , , , , , , , , , , , , , 1, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

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
        cells[row][col] = "noth";
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
  } else if (cells[row][col] == "FFup") {
    firepowerupshape(col * 50, row * 50);
  } else if (cells[row][col] == "BBup") {
    bombpowerupshape(col * 50, row * 50);
  } else if (cells[row][col] == "SSup") {
    speedpowerupshape(col * 50, row * 50);
  } else if (cells[row][col] == 1) {
    cells[row][col] = "noth";
  }
  //
  //power up count
  makeWords("20px arial", "red", "Fire:" + (firepower - 1), 1, 30);
  makeWords("20px arial", "black", "Bomb:" + bombpower, 60, 30);
  makeWords("20px arial", "blue", "Speed:" + speed1, 140, 30);
  //

  //make the fire of the bomb

  if (cells[row][col] === 80) {
    hitR = false;
    hitL = false;
    hitU = false;
    hitD = false;
    for (let num = 1; num !== firepower; num++) {
      if (hitL === false) {
        fireleft(row, col, num);
      }
      if (hitR === false) {
        fireright(row, col, num);
      }
      if (hitD === false) {
        if (row + num < 13) {
          firedown(row, col, num);
        }
      }
      if (hitU === false) {
        if (row - num > -1) {
          fireup(row, col, num);
        }
      }
    }
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
    cells[row][col] = "SSup";
  } else if (rand < 0.75) {
    cells[row][col] = "FFup";
  } else {
    cells[row][col] = 78;
  }
}
//
//
//
//
//
// left fireball
function fireleft(row, col, num) {
  if (cells[row][col - num] > 80) {
    cells[row][col - num] = 81;
    hitL = true;
  } else if (cells[row][col - num] < 80) {
    hitL = true;
  } else if (cells[row][col - num] === "wall") {
    cells[row][col - num] = 79;
    hitL = true;
    powerups(row, col - num);
  } else if (cells[row][col - num] === "hard") {
    hitL = true;
  } else {
    cells[row][col - num] = 79;
  }
}
//right fireball
function fireright(row, col, num) {
  if (cells[row][col + num] > 80) {
    cells[row][col + num] = 81;
    hitR = true;
  } else if (cells[row][col + num] < 80) {
    hitR = true;
  } else if (cells[row][col + num] === "wall") {
    cells[row][col + num] = 79;
    hitR = true;
    powerups(row, col + num);
  } else if (cells[row][col + num] === "hard") {
    hitR = true;
  } else {
    cells[row][col + num] = 79;
  }
}

//down fireball
function firedown(row, col, num) {
  if (cells[row + num][col] > 80) {
    cells[row + num][col] = 81;
    hitD = true;
  } else if (cells[row + num][col] === "wall") {
    cells[row + num][col] = 79;
    hitD = true;
    powerups(row + num, col);
  } else if (cells[row + num][col] === "hard") {
    hitD = true;
  } else {
    cells[row + num][col] = 79;
  }
}

//up fireball
function fireup(row, col, num) {
  if (cells[row - num][col] > 80) {
    cells[row - num][col] = 81;
    hitU = true;
  } else if (cells[row - num][col] === "wall") {
    cells[row - num][col] = 79;
    hitU = true;
    powerups(row - num, col);
  } else if (cells[row - num][col] === "hard") {
    hitU = true;
  } else {
    cells[row - num][col] = 79;
  }
}

//
//
//
//
//
//movement for the character
function CharMovement() {
  if (rightkeypressed === true) {
    charX1 += speed1;
    checkWallCollision("right");
  } else if (leftkeypressed === true) {
    charX1 -= speed1;
    checkWallCollision("left");
  } else if (upkeypressed === true) {
    charY1 -= speed1;
    checkWallCollision("up");
  } else if (downkeypressed === true) {
    charY1 += speed1;
    checkWallCollision("down");
  }

  if (rightkeypressedL === true) {
    charX2 += speed2;
    // checkWallCollision("right");
  } else if (leftkeypressedL === true) {
    charX2 -= speed2;
    // checkWallCollision("left");
  } else if (upkeypressedL === true) {
    charY2 -= speed2;
    // checkWallCollision("up");
  } else if (downkeypressedL === true) {
    charY2 += speed2;
    // checkWallCollision("down");
  }

  makeShapes(charX1, charY1, "red", 40, 40);
  makeShapes(charX2, charY2, "blue", 40, 40);
}

function checkWallCollision(dir) {
  for (let row = 0; row < 13; row++) {
    for (let col = 0; col < 17; col++) {
      collision(row, col, dir);
    }
  }
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
  let bombcount = 1;
  for (let row = 0; row < 13; row++) {
    for (let col = 0; col < 17; col++) {
      makeEnvironment(row, col);
      collision(row, col);

      if (cells[row][col] < 250 && cells[row][col] > 80) {
        bombcount++;
      }
      //
    }
  }
  if (bombcount <= bombpower) {
    makebomb();
  }
}

//
//

//
//
//
//
//

function makebomb() {
  if (
    trigger === true &&
    cells[Math.round(charY1 / 50)][Math.round(charX1 / 50)] === "noth"
  ) {
    cells[Math.round(charY1 / 50)][Math.round(charX1 / 50)] = 250;
  } else if (
    triggerL === true &&
    cells[Math.round(charY2 / 50)][Math.round(charX2 / 50)] === "noth"
  ) {
    cells[Math.round(charY2 / 50)][Math.round(charX2 / 50)] = 250;
  }
}
//
//
//
//
//
//this is the collison section
//
function collision(row, col, dir) {
  if (cells[row][col] === "hard" || cells[row][col] === "wall") {
    let wall = {
      x: col * 50,
      y: row * 50,
      w: 50,
      h: 50,
    };

    let char1 = {
      x: charX1,
      y: charY1,
      w: 40,
      h: 40,
    };

    if (rectCollide(char1, wall)) {
      if (dir === "left") {
        charX1 = wall.x + wall.w;
      } else if (dir === "right") {
        charX1 = wall.x - char1.w;
      } else if (dir === "up") {
        charY1 = wall.y + wall.h;
      } else if (dir === "down") {
        charY1 = wall.y - char1.h;
      }
    }
  }
  //
  //
  if (cells[row][col] < 80) {
    let energysquare = {
      x: col * 50,
      y: row * 50,
      w: 50,
      h: 50,
    };
    let char1 = {
      x: charX1,
      y: charY1,
      w: 40,
      h: 40,
    };
    if (rectCollide(char1, energysquare)) {
      chardead = "Characher Blue";
    }
  }
  //
  //
  if (cells[row][col] === "FFup") {
    let energysquare = {
      x: col * 50,
      y: row * 50,
      w: 50,
      h: 50,
    };
    let char1 = {
      x: charX1,
      y: charY1,
      w: 40,
      h: 40,
    };
    if (rectCollide(char1, energysquare)) {
      firepower++;
      cells[row][col] = "noth";
    }
  } else if (cells[row][col] === "SSup") {
    let energysquare = {
      x: col * 50,
      y: row * 50,
      w: 50,
      h: 50,
    };
    let char1 = {
      x: charX1,
      y: charY1,
      w: 40,
      h: 40,
    };
    if (rectCollide(char1, energysquare)) {
      speed1 += 0.5;
      cells[row][col] = "noth";
    }
  } else if (cells[row][col] === "BBup") {
    let energysquare = {
      x: col * 50,
      y: row * 50,
      w: 50,
      h: 50,
    };
    let char1 = {
      x: charX1,
      y: charY1,
      w: 40,
      h: 40,
    };
    if (rectCollide(char1, energysquare)) {
      bombpower++;
      cells[row][col] = "noth";
    }
  }
}

//
//
//
function rectCollide(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y + rect1.h > rect2.y &&
    rect1.y < rect2.y + rect2.h
  );
}

//

//

//
requestAnimationFrame(loop);
function loop() {
  if (chardead !== "") {
    makeShapes(0, 0, "black", cvn.width, cvn.height);
    makeWords("80px arial", "white", chardead + " Wins", 50, 300);
    makeWords("80px arial", "white", "Click to Start", 170, 400);
  } else {
    makeShapes(0, 0, "chartreuse", cvn.width, cvn.height);

    loopstuff();

    //enviro
    blackGrid();
    CharMovement();
  }
  requestAnimationFrame(loop);
}
//
//

//
//shape and other thing that are important for looks
//power ups
//fire up
function firepowerupshape(x, y) {
  makeShapes(x, y, "purple", 50, 50);
  makeShapes(x + 5, y + 5, "red", 40, 40);
  makeShapes(x + 10, y + 10, "orange", 30, 30);
  makeShapes(x + 15, y + 15, "yellow", 20, 20);
}
//bombup
function bombpowerupshape(x, y) {
  makeShapes(x, y, "lightblue", 50, 50);
  bombDesign(x, y);
}
//speedup
function speedpowerupshape(x, y) {
  makeShapes(x, y, "yellow", 50, 50);
  triangle("blue", x + 4, y + 5, x + 4, y + 45, x + 22, y + 25);
  triangle("blue", x + 19, y + 5, x + 19, y + 45, x + 37, y + 25);
  triangle("blue", x + 34, y + 5, x + 34, y + 45, x + 48, y + 25);
}
//other tools
//firewall
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
//make polygon
function triangle(color, x, y, x2, y2, x3, y3) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.fill();
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
  } else if (event.keyCode === 70) {
    triggerL = true;
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
  } else if (event.keyCode === 70) {
    triggerL = false;
  }
}
