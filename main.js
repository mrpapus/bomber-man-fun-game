//make the canvas
let cvn = document.getElementById("myCanvas");
let ctx = cvn.getContext("2d");
cvn.width = 850;
cvn.height = 650;

//keys for player 1
let leftkeypressed = false;
let rightkeypressed = false;
let upkeypressed = false;
let downkeypressed = false;
let trigger = false;
//keys for player 2
let leftkeypressedL = false;
let rightkeypressedL = false;
let upkeypressedL = false;
let downkeypressedL = false;
let triggerL = false;

// event listener
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
document.addEventListener("click", click);
//cell is basically the world, 2d array
let cells = [];
//character 1 positions
let charX1 = 50;
let charY1 = 300;
//character 2 positions
let charX2 = 760;
let charY2 = 300;

//character 1 powers
let firepower = 2;
let speed1 = 1.5;
let bombpower = 1;
//character 2 powers
let firepower2 = 2;
let speed2 = 1.5;
let bombpower2 = 1;
//character 1 stop fire movements
let hitR = false;
let hitL = false;
let hitU = false;
let hitD = false;
//
//display death and winner
let chardead = "";
// character 2 stop fire movement
let hitR2 = false;
let hitL2 = false;
let hitU2 = false;
let hitD2 = false;
//
//if you click, it restarts the game
function click() {
  if (chardead === "Character Blue" || chardead === "Character Red") {
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
    // makes cells array
    for (let col = 0; col < 17; col++)
      if (!template[row][col] && Math.random() < 0.6) {
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
//make the shapes and colors of the world
function makeEnvironment(row, col) {
  // check where everything is and plot onto canvas
  //make walls

  if (cells[row][col] == "wall") {
    barrierDesign(col * 50, row * 50);
    //make hard zone
  } else if (cells[row][col] == "hard") {
    makeBrickWall(col * 50, row * 50);
    //make bomb
  } else if (cells[row][col][1] > 79) {
    bombDesign(col * 50, row * 50);
    cells[row][col][1] -= 1;
    //make fire
  } else if (cells[row][col][1] > 1) {
    makefireshape(col * 50, row * 50);
    cells[row][col][1] -= 1;
    //make powerups
  } else if (cells[row][col] == "FFup") {
    firepowerupshape(col * 50, row * 50);
  } else if (cells[row][col] == "BBup") {
    bombpowerupshape(col * 50, row * 50);
  } else if (cells[row][col] == "SSup") {
    speedpowerupshape(col * 50, row * 50);
  } else if (cells[row][col][1] == 1) {
    cells[row][col] = "noth";
  }
  //
  //player red points
  makeWords("20px arial", "red", "Fire:" + (firepower - 1), 1, 30);
  makeWords("20px arial", "black", "Bomb:" + bombpower, 70, 30);
  makeWords("20px arial", "blue", "Speed:" + speed1, 155, 30);
  //player blue points
  makeWords("20px arial", "red", "Fire:" + (firepower2 - 1), 785, 30);
  makeWords("20px arial", "black", "Bomb:" + bombpower2, 700, 30);
  makeWords("20px arial", "blue", "Speed:" + speed2, 590, 30);
  //make the fire of the bomb

  if (cells[row][col][1] === 80 && cells[row][col][0] === "bomb1") {
    hitR = false;
    hitL = false;
    hitU = false;
    hitD = false;
    //make fire spread in directions for char1 bomb
    for (let num = 1; num !== firepower; num++) {
      if (hitL === false) {
        fireleft(row, col, num, "bomb1");
      }
      if (hitR === false) {
        fireright(row, col, num, "bomb1");
      }
      if (hitD === false) {
        if (row + num < 13) {
          firedown(row, col, num, "bomb1");
        }
      }
      if (hitU === false) {
        if (row - num > -1) {
          fireup(row, col, num, "bomb1");
        }
      }
    }
    cells[row][col][1] -= 1;
  }
  //make fire spread in directions for char2 bomb
  if (cells[row][col][1] === 80 && cells[row][col][0] === "bomb2") {
    hitR2 = false;
    hitL2 = false;
    hitU2 = false;
    hitD2 = false;
    for (let num = 1; num !== firepower2; num++) {
      if (hitL2 === false) {
        fireleft(row, col, num, "bomb2");
      }
      if (hitR2 === false) {
        fireright(row, col, num, "bomb2");
      }
      if (hitD2 === false) {
        if (row + num < 13) {
          firedown(row, col, num, "bomb2");
        }
      }
      if (hitU2 === false) {
        if (row - num > -1) {
          fireup(row, col, num, "bomb2");
        }
      }
    }
    cells[row][col][1] -= 1;
  }
}

//

//
//randomize the power up spawns
function powerups(row, col, bombtype) {
  let rand = Math.random();
  if (rand < 0.25) {
    cells[row][col] = "BBup";
  } else if (rand < 0.5) {
    cells[row][col] = "SSup";
  } else if (rand < 0.75) {
    cells[row][col] = "FFup";
  } else {
    cells[row][col] = [bombtype, 78];
  }
}
//
//
// left fireball
function fireleft(row, col, num, bombtype) {
  if (cells[row][col - num] === "hard") {
    if (bombtype === "bomb1") {
      hitL = true;
    } else if (bombtype === "bomb2") {
      hitL2 = true;
    }
  } else if (cells[row][col - num] === "noth") {
    cells[row][col - num] = [bombtype, 79];
  } else if (cells[row][col - num] === "wall") {
    powerups(row, col - num, bombtype);
    if (bombtype === "bomb1") {
      hitL = true;
    } else if (bombtype === "bomb2") {
      hitL2 = true;
    }
  } else if (cells[row][col - num][1] > 80) {
    cells[row][col - num] = [bombtype, 81];
  } else if (cells[row][col - num][1] < 80) {
    if (bombtype === "bomb1") {
      hitL = true;
    } else if (bombtype === "bomb2") {
      hitL2 = true;
    }
  } else {
    cells[row][col - num] = [bombtype, 79];
  }
}

//right fireball
function fireright(row, col, num, bombtype) {
  if (cells[row][col + num] === "hard") {
    if (bombtype === "bomb1") {
      hitR = true;
    } else if (bombtype === "bomb2") {
      hitR2 = true;
    }
  } else if (cells[row][col + num] === "noth") {
    cells[row][col + num] = [bombtype, 79];
  } else if (cells[row][col + num] === "wall") {
    powerups(row, col + num, bombtype);
    if (bombtype === "bomb1") {
      hitR = true;
    } else if (bombtype === "bomb2") {
      hitR2 = true;
    }
  } else if (cells[row][col + num][1] > 80) {
    cells[row][col + num] = [bombtype, 81];
  } else if (cells[row][col + num][1] < 80) {
    if (bombtype === "bomb1") {
      hitR = true;
    } else if (bombtype === "bomb2") {
      hitR2 = true;
    }
  } else {
    cells[row][col + num] = [bombtype, 79];
  }
}

// //down fireball
function firedown(row, col, num, bombtype) {
  if (cells[row + num][col] === "hard") {
    if (bombtype === "bomb1") {
      hitD = true;
    } else if (bombtype === "bomb2") {
      hitD2 = true;
    }
  } else if (cells[row + num][col] === "noth") {
    cells[row + num][col] = [bombtype, 79];
  } else if (cells[row + num][col] === "wall") {
    powerups(row + num, col, bombtype);
    if (bombtype === "bomb1") {
      hitD = true;
    } else if (bombtype === "bomb2") {
      hitD2 = true;
    }
  } else if (cells[row + num][col][1] > 80) {
    cells[row + num][col] = [bombtype, 81];
  } else if (cells[row + num][col][1] < 80) {
    if (bombtype === "bomb1") {
      hitD = true;
    } else if (bombtype === "bomb2") {
      hitD2 = true;
    }
  } else {
    cells[row + num][col] = [bombtype, 79];
  }
}

// //up fireball
function fireup(row, col, num, bombtype) {
  if (cells[row - num][col] === "hard") {
    if (bombtype === "bomb1") {
      hitU = true;
    } else if (bombtype === "bomb2") {
      hitU2 = true;
    }
  } else if (cells[row - num][col] === "noth") {
    cells[row - num][col] = [bombtype, 79];
  } else if (cells[row - num][col] === "wall") {
    powerups(row - num, col, bombtype);
    if (bombtype === "bomb1") {
      hitU = true;
    } else if (bombtype === "bomb2") {
      hitU2 = true;
    }
  } else if (cells[row - num][col][1] > 80) {
    cells[row - num][col] = [bombtype, 81];
  } else if (cells[row - num][col][1] < 80) {
    if (bombtype === "bomb1") {
      hitU = true;
    } else if (bombtype === "bomb2") {
      hitU2 = true;
    }
  } else {
    cells[row - num][col] = [bombtype, 79];
  }
}
//
//
//movement for the character
function CharMovement() {
  //character 1
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
  //character 2
  if (rightkeypressedL === true) {
    charX2 += speed2;
    checkWallCollision("right");
  } else if (leftkeypressedL === true) {
    charX2 -= speed2;
    checkWallCollision("left");
  } else if (upkeypressedL === true) {
    charY2 -= speed2;
    checkWallCollision("up");
  } else if (downkeypressedL === true) {
    charY2 += speed2;
    checkWallCollision("down");
  }
  //make the characters
  makeShapes(charX1, charY1, "red", 40, 40);
  makeShapes(charX2, charY2, "blue", 40, 40);
}
//collision
function checkWallCollision(dir) {
  for (let row = 0; row < 13; row++) {
    for (let col = 0; col < 17; col++) {
      collision(row, col, dir);
    }
  }
}

//
//loops for everything
function loopstuff() {
  let bombcount = 1;
  let bombcount2 = 1;

  for (let row = 0; row < 13; row++) {
    for (let col = 0; col < 17; col++) {
      makeEnvironment(row, col);
      collision(row, col);
      //makes the bombup power up your, prevents to many bombs being placed
      if (
        cells[row][col][1] < 250 &&
        cells[row][col][1] > 80 &&
        cells[row][col][0] === "bomb1"
      ) {
        bombcount++;
      } else if (
        cells[row][col][1] < 250 &&
        cells[row][col][1] > 80 &&
        cells[row][col][0] === "bomb2"
      ) {
        bombcount2++;
      }
      //
    }
  }
  //trigger to place the bombs
  if (
    bombcount <= bombpower &&
    trigger === true &&
    cells[Math.round(charY1 / 50)][Math.round(charX1 / 50)] === "noth"
  ) {
    cells[Math.round(charY1 / 50)][Math.round(charX1 / 50)] = ["bomb1", 250];
  }

  if (
    bombcount2 <= bombpower2 &&
    triggerL === true &&
    cells[Math.round(charY2 / 50)][Math.round(charX2 / 50)] === "noth"
  ) {
    cells[Math.round(charY2 / 50)][Math.round(charX2 / 50)] = ["bomb2", 250];
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
//this is the collison section
//walls, and hard
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

    let char2 = {
      x: charX2,
      y: charY2,
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

    if (rectCollide(char2, wall)) {
      if (dir === "left") {
        charX2 = wall.x + wall.w;
      } else if (dir === "right") {
        charX2 = wall.x - char2.w;
      } else if (dir === "up") {
        charY2 = wall.y + wall.h;
      } else if (dir === "down") {
        charY2 = wall.y - char2.h;
      }
    }
  }
  //bomb2 for character 1
  if (cells[row][col][0] === "bomb2") {
    let wall = {
      x: col * 50 + 5,
      y: row * 50 + 5,
      w: 40,
      h: 40,
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
  //bomb1 for character 2
  if (cells[row][col][0] === "bomb1") {
    let wall = {
      x: col * 50 + 5,
      y: row * 50 + 5,
      w: 40,
      h: 40,
    };

    let char2 = {
      x: charX2,
      y: charY2,
      w: 40,
      h: 40,
    };

    if (rectCollide(char2, wall)) {
      if (dir === "left") {
        charX2 = wall.x + wall.w;
      } else if (dir === "right") {
        charX2 = wall.x - char2.w;
      } else if (dir === "up") {
        charY2 = wall.y + wall.h;
      } else if (dir === "down") {
        charY2 = wall.y - char2.h;
      }
    }
  }
  //
  if (cells[row][col][1] < 80) {
    let energysquare = {
      x: col * 50 + 3,
      y: row * 50 + 3,
      w: 44,
      h: 44,
    };
    let char1 = {
      x: charX1,
      y: charY1,
      w: 40,
      h: 40,
    };
    let char2 = {
      x: charX2,
      y: charY2,
      w: 40,
      h: 40,
    };
    if (rectCollide(char1, energysquare)) {
      chardead = "Character Blue";
    }
    if (rectCollide(char2, energysquare)) {
      chardead = "Character Red";
    }
  }
  //
  //
  // powerup collision
  if (cells[row][col] === "BBup") {
    powerupcol(row, col, charX1, charY1, bombpower, 1);
  }
  if (cells[row][col] === "SSup") {
    powerupcol(row, col, charX1, charY1, speed1, 1);
  }
  if (cells[row][col] === "FFup") {
    powerupcol(row, col, charX1, charY1, firepower, 1);
  }

  if (cells[row][col] === "BBup") {
    powerupcol(row, col, charX2, charY2, bombpower2, 2);
  }
  if (cells[row][col] === "SSup") {
    powerupcol(row, col, charX2, charY2, speed2, 2);
  }
  if (cells[row][col] === "FFup") {
    powerupcol(row, col, charX2, charY2, firepower2, 2);
  }
  //
}
//
//easy function for the powerups
function powerupcol(row, col, charx, chary, change, type) {
  let energysquare = {
    x: col * 50,
    y: row * 50,
    w: 50,
    h: 50,
    t: change,
  };
  let char = {
    x: charx,
    y: chary,
    w: 40,
    h: 40,
  };
  if (rectCollide(char, energysquare)) {
    if (type === 1) {
      if (change === bombpower) {
        cells[row][col] = "noth";
        bombpower++;
      } else if (change === speed1) {
        cells[row][col] = "noth";
        speed1 += 0.5;
      } else if (change === firepower) {
        cells[row][col] = "noth";
        firepower++;
      }
    }
    if (type === 2) {
      if (change === bombpower2) {
        cells[row][col] = "noth";
        bombpower2++;
      } else if (change === speed2) {
        cells[row][col] = "noth";
        speed2 += 0.5;
      } else if (change === firepower2) {
        cells[row][col] = "noth";
        firepower2++;
      }
    }
  }
}
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

//animation loop
requestAnimationFrame(loop);
function loop() {
  //display winner
  if (chardead !== "") {
    makeShapes(0, 0, "black", cvn.width, cvn.height);
    makeWords("80px arial", "white", chardead + " Wins", 50, 300);
    makeWords("80px arial", "white", "Click to Start", 170, 400);
  } else {
    //make everything
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
    leftkeypressedL = true;
  } else if (event.keyCode === 38) {
    upkeypressedL = true;
  } else if (event.keyCode === 39) {
    rightkeypressedL = true;
  } else if (event.keyCode === 40) {
    downkeypressedL = true;
  } else if (event.keyCode === 96) {
    triggerL = true;
  }
  //wasd
  else if (event.keyCode === 65) {
    leftkeypressed = true;
  } else if (event.keyCode === 87) {
    upkeypressed = true;
  } else if (event.keyCode === 68) {
    rightkeypressed = true;
  } else if (event.keyCode === 83) {
    downkeypressed = true;
  } else if (event.keyCode === 70) {
    trigger = true;
  }
}

//key up
function keyup() {
  //arrows
  if (event.keyCode === 37) {
    leftkeypressedL = false;
  } else if (event.keyCode === 38) {
    upkeypressedL = false;
  } else if (event.keyCode === 39) {
    rightkeypressedL = false;
  } else if (event.keyCode === 40) {
    downkeypressedL = false;
  } else if (event.keyCode === 96) {
    triggerL = false;
  }
  // wasd
  else if (event.keyCode === 65) {
    leftkeypressed = false;
  } else if (event.keyCode === 87) {
    upkeypressed = false;
  } else if (event.keyCode === 68) {
    rightkeypressed = false;
  } else if (event.keyCode === 83) {
    downkeypressed = false;
  } else if (event.keyCode === 70) {
    trigger = false;
  }
}
