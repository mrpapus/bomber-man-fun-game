let cvn = document.getElementById("myCanvas");
let ctx = cvn.getContext("2d");
cvn.width = 850;
cvn.height = 650;

// event listener
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
cvn.addEventListener("click", levelType);

let element = true;

let grid = [];

for (let n = 0; n <= 12; n++) {}

Character();
floorcolors("greenyellow", "chartreuse");
walls();
randomBarrier();
walls();
blackGrid();
//
//swap levels
function levelType() {
  //make grass
  if (element === false) {
    Character();
    floorcolors("greenyellow", "lawngreen");
    randomBarrier();
    walls();
    blackGrid();

    element = true;
  } else if (element === true) {
    //make ice

    Character();

    floorcolors("powderblue", "skyblue");
    randomBarrier();
    walls();
    blackGrid();

    element = false;
  }
}

//make floor
function floorcolors(color1, color2) {
  // darker blue floor
  borderwalls(0, 0, color2, cvn.width, cvn.height);

  // LIGHT BLue floor
  for (let n = 0; n <= 800; n += 100) {
    for (let i = 0; i <= 600; i += 100) {
      borderwalls(n, i, color1, 50, 50);
    }
  }
}

// make wall grid
function walls() {
  for (let n = 50; n <= 800; n += 100) {
    for (let i = 50; i <= 550; i += 100) {
      makeBrickWall(n, i);
    }
  }
}

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

//make a random barrier across the map

function randomBarrier() {
  for (let x = 50; x <= 750; x += 50) {
    for (let y = 0; y <= 600; y += 50) {
      let randnum = Math.random();
      if (randnum < 0.7) {
        barrierDesign(x, y);
      }
    }
  }
}

//barrier

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

// make characters
function Character() {}

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
