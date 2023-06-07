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
let speed1 = 5;
let charX1 = 50;
let charY1 = 300;

//
let firepower = 15;

let hitR = false;
let hitL = false;
let hitU = false;
let hitD = false;
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
	} else if (leftkeypressed === true) {
		charX1 -= speed1;
	} else if (upkeypressed === true) {
		charY1 -= speed1;
	} else if (downkeypressed === true) {
		charY1 += speed1;
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
	//left and right

	if (
		cells[Math.round(charY1 / 50)][Math.round((charX1 + 15) / 50)] === "wall" ||
		cells[Math.round(charY1 / 50)][Math.round((charX1 + 15) / 50)] === "hard"
	) {
		rightkeypressed = false;
	}

	//
	//
	//
	else if (
		cells[Math.round(charY1 / 50)][Math.round((charX1 - 26) / 50)] === "wall" ||
		cells[Math.round(charY1 / 50)][Math.round((charX1 - 26) / 50)] === "hard"
	) {
		leftkeypressed = false;
	}
	// up and down
	if (
		cells[Math.round((charY1 - 26) / 50)][Math.round(charX1 / 50)] === "wall" ||
		cells[Math.round((charY1 - 26) / 50)][Math.round(charX1 / 50)] === "hard"
	) {
		upkeypressed = false;
	}
	if (
		cells[Math.round((charY1 + 15) / 50)][Math.round(charX1 / 50)] === "wall" ||
		cells[Math.round((charY1 + 15) / 50)][Math.round(charX1 / 50)] === "hard"
	) {
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

//
requestAnimationFrame(loop);
function loop() {
	makeShapes(0, 0, "chartreuse", cvn.width, cvn.height);

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
