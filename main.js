let cvn = document.getElementById("myCanvas");
let ctx = cvn.getContext("2d");
cvn.width = 850;
cvn.height = 850;

// event listener
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
cvn.addEventListener("click",levelType)



let element = true



Character();
floorcolors("greenyellow", "chartreuse");
walls();
randomBarrier()
blackGrid()

//swap levels
function levelType(){
  //make grass
if (element === false){

  Character();
  floorcolors("greenyellow", "lawngreen");
  walls();
  randomBarrier()
  blackGrid()
  
element = true

} else if(element === true){
//make ice

  Character();
  walls();
  floorcolors("powderblue", "skyblue");
  randomBarrier()
  blackGrid()
  
  element = false
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



// make wall grid
function walls() {
  for (let n = 50; n <= 800; n += 100) {
    for (let i = 50; i <= 800; i += 100) {
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
function blackGrid(){
for (let n = 50; n <= 850; n += 50) {
  //x axis lines
  borderwalls(0,n,"black",850,1)
  //y axis lines
  borderwalls(n,0,"black",1,850)
}
}


//make a random barrier across the map


function randomBarrier(){
  let randnum = Math.random()

   for (let n = 100; n <= 750; n += 100) {
    for (let i = 50; i <= 800; i += 50) {
      let randnum = Math.random()
if(randnum < 0.7){
  barrierDesign(n,i)
}
    }
  }

  for (let n = 0; n <= 800; n += 100) {
    for (let i = 50; i <= 750; i += 50) {
      let randnum = Math.random()
    if(randnum < 0.7){
        barrierDesign(i,n)
}
    }
  }
}





//barrier


function barrierDesign(x,y){
  borderwalls(x,y,"	gainsboro",50,50)
  borderwalls(x, y, "white", 3, 50);
borderwalls(x + 2, y, "white", 2, 47);
borderwalls(x, y, "white", 50, 3);
borderwalls(x + 30,y+ 30,"black",20,2)
borderwalls(x + 40,y+ 40,"black",10,2)
borderwalls(x + 40,y+ 20,"black",2,30)
borderwalls(x + 10,y+ 10,"black",2,40)
borderwalls(x + 10,y+ 40,"black",20,2)
borderwalls(x,y+ 20,"black",30,2)
borderwalls(x+30,y,"black",2,22)
borderwalls(x+20,y+10,"black",20,2)
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
