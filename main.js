let cvn = document.getElementById("myCanvas");
let ctx = cvn.getContext("2d");
cvn.width = 850;
cvn.height = 650;

// // event listener
// document.addEventListener("keydown", keydown);
// document.addEventListener("keyup", keyup);
// cvn.addEventListener("click", levelType);

// let element = true;

// let rowsD = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1];
// let rowW = [2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2];
// let on = 0;
// for (let n = 0; n <= 12; n++) {
//   if (on === 0) {
//     grid.push(rowsD);
//     on = 1;
//   } else if (on === 1) {
//     grid.push(rowW);
//     on = 0;
//   }
// }
borderwalls(0, 0, "chartreuse", cvn.width, cvn.height);
// // make the points on the canvas by multiplying by 50
// const grid = [
//   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
//   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
//   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
//   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
//   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
//   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
//   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
//   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
//   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
//   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
//   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
//   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
//   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
// ];
//
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

blackGrid();

//
//
//
//
//
//
bombdesign(0, 0);
function bombdesign(x, y) {
  ctx.linewidth = 2;
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(x + 25, y + 30, 20, 0, 2 * Math.PI);
  ctx.fill();
  //make words
  ctx.font = "12px arial";
  ctx.fillStyle = "yellow";
  ctx.fillText("BOMB", x + 8, y + 30);
  borderwalls(x + 20, y, "red", 13, 8);
  borderwalls(x + 21, y + 2, "yellow", 9, 8);
  borderwalls(x + 20, y + 4, "Black", 10, 8);
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

//wall design
function makeBrickWall(x, y) {
  borderwalls(x, y, "silver", 50, 50);
  //blakshadow

  borderwalls(x, y + 47, "black", 50, 3);
  borderwalls(x + 5, y + 45, "black", 42, 2);
  //leftwhite
  borderwalls(x, y, "white", 3, 50);
  borderwalls(x + 2, y, "white", 2, 47);
  //top white
  borderwalls(x, y, "white", 50, 3);
}

// create black lines
function blackGrid() {
  for (let n = 50; n <= 850; n += 50) {
    //x axis lines
    borderwalls(0, n, "black", 850, 1);
    //y axis lines
    borderwalls(n, 0, "black", 1, 850);
  }
}

// //barrier
function barrierDesign(x, y) {
  borderwalls(x, y, "	gainsboro", 50, 50);
  borderwalls(x, y, "white", 3, 50);
  borderwalls(x + 2, y, "white", 2, 47);
  borderwalls(x, y, "white", 50, 3);
  borderwalls(x + 30, y + 30, "black", 20, 2);
  borderwalls(x + 40, y + 40, "black", 10, 2);
  borderwalls(x + 40, y + 20, "black", 2, 30);
  borderwalls(x + 10, y + 10, "black", 2, 40);
  borderwalls(x + 10, y + 40, "black", 20, 2);
  borderwalls(x, y + 20, "black", 30, 2);
  borderwalls(x + 30, y, "black", 2, 22);
  borderwalls(x + 20, y + 10, "black", 20, 2);
  borderwalls(x, y + 47, "black", 50, 3);
  borderwalls(x + 5, y + 45, "black", 42, 2);
}

//create color shapes
function borderwalls(Xaxis, Yaxis, color, sizex, sizey) {
  ctx.fillStyle = color;
  ctx.fillRect(Xaxis, Yaxis, sizex, sizey);
}

// keys down
function keydown() {
  if (event.keyCode === 37) {
    leftkeypressed = true;
  } else if (event.keyCode === 38) {
    upkeypressed = true;
  } else if (event.keyCode === 39) {
    rightkeypressed = true;
  } else if (event.keyCode === 40) {
    downkeypressed = true;
  }
}

//key up
function keyup() {
  if (event.keyCode === 37) {
    leftkeypressed = false;
  } else if (event.keyCode === 38) {
    upkeypressed = false;
  } else if (event.keyCode === 39) {
    rightkeypressed = false;
  } else if (event.keyCode === 40) {
    downkeypressed = false;
  }
}
