let cvn = document.getElementById("myCanvas");
let ctx = cvn.getContext("2d");
cvn.width = 800;
cvn.height = 800;

// event listener
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

for (let n = 50; n <= 800; n += 50) {
  //x axis lines
  ctx.fillStyle = "black";
  ctx.fillRect(0, n, 1000, 1);
  console.log(n);
  //y axis lines
  ctx.fillStyle = "black";
  ctx.fillRect(n, 0, 1, 1000);
}

borderwalls(50, 50);
borderwalls(50, 100);
borderwalls(100, 100);

//funtion of combining walls and collision
funtion;

//red squarewalls
function borderwalls(Xaxis, Yaxis) {
  ctx.fillStyle = "red";
  ctx.fillRect(Xaxis, Yaxis, 50, 50);
}

//hit
function collision(point1, point2, object) {
  if (object >= point1 && object <= point2) {
    return "hit";
  }
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
