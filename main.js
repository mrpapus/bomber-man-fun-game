let cvn = document.getElementById("myCanvas");
let ctx = cvn.getContext("2d");
cvn.width = 850;
cvn.height = 850;

// event listener
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
document.addEventListener("click",levelType)



let element = true

//ice theme
let ice = ["powderblue", "skyblue"];
//grass theme


Character();
walls();

floorcolors("greenyellow", "chartreuse");
// floorcolors("powderblue", "skyblue");
function levelType(){
if (element === true){

  Character();
  walls();
  floorcolors("greenyellow", "chartreuse");
element === false
} else if(element === false){


  haracter();
  walls();
  floorcolors("powderblue", "skyblue");

}





}


// make wall grid
function walls() {
  for (let n = 50; n <= 800; n += 100) {
    for (let i = 50; i <= 800; i += 100) {
      makeBrickWall(n, i);
    }
  }
}

//make floor
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

//wall design
function makeBrickWall(x, y,elementType) {
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
for (let n = 50; n <= 850; n += 50) {
  //x axis lines
  borderwalls(0,n,"black",850,1)
  //y axis lines
  borderwalls(n,0,"black",1,850)
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
