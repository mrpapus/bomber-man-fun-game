let cvn = document.getElementById("myCanvas");
let ctx = cvn.getContext("2d");
cvn.width = 850;
cvn.height = 850;

// event listener
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

//ice theme
let ice = ["powderblue", "skyblue"];
//grass theme

// create black lines
for (let n = 50; n <= 850; n += 50) {
  //x axis lines
  ctx.fillStyle = "black";
  ctx.fillRect(0, n, 850, 1);

  //y axis lines
  ctx.fillStyle = "black";
  ctx.fillRect(n, 0, 1, 850);
}
Character();
walls();
floorcolors("greenyellow", "chartreuse");

// make walls
function walls() {
  for (let n = 50; n <= 800; n += 100) {
    for (let i = 50; i <= 800; i += 100) {
      makeBrickWall(n, i);
    }
  }
}

function floorcolors(color1, color2) {
  // LIGHT BLue floor
  for (let n = 0; n <= 800; n += 100) {
    for (let i = 0; i <= 800; i += 100) {
      borderwalls(n, i, color1, 50, 50);
    }
  }
  // darker blue floor
  for (let n = 0; n <= 800; n += 100) {
    for (let i = 50; i <= 800; i += 100) {
      borderwalls(i, n, color2, 50, 50);
    }
  }

  for (let n = 50; n <= 800; n += 100) {
    for (let i = 0; i <= 800; i += 100) {
      borderwalls(i, n, color2, 50, 50);
    }
  }
}

function makeBrickWall(x, y) {
  borderwalls(x, y, "silver", 50, 50);
  //blakshadow
  borderwalls(x, y + 47, "black", 50, 3);
  borderwalls(x + 5, y + 45, "black", 42, 2);
  //leftwhite
  borderwalls(x, y, "white", 2, 50);
  borderwalls(x + 2, y, "white", 2, 47);
  //top white
  borderwalls(x, y, "white", 50, 3);
}

function Character() {}

//create color shapes
function borderwalls(Xaxis, Yaxis, color, sizex, sizey) {
  ctx.fillStyle = color;
  ctx.fillRect(Xaxis, Yaxis, sizex, sizey);
}

// keys
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
