// P5 STUFF

// //prevent scrolling of the page
document.ontouchmove = function(event){
	event.preventDefault();
}

//create color variables to store rgb for each client
//we will send this to the server!
var myFillR, myFillG, myFillB;

var myTransX, myTransY;


function setup() {
	createCanvas(windowWidth, windowHeight);
	
	/*for drawing things, usually 
	have background in setup */
	background('darkcyan'); 

	//generate a random color for each color var
	myFillR = floor(random(0, 255));
	myFillG = floor(random(0, 255));
	myFillB = floor(random(0, 255));

	myTransX = floor(random(0, 1000));
	myTransY = floor(random(0, 150));
}

function draw() {
	stroke('darkcyan');
	fill(myFillR, myFillG, myFillB);
	ellipse(mouseX, mouseY, 30, 30);

	if(windowWidth<500){
		// console.log(windowWidth);
		document.getElementById('test').innerHTML = windowWidth;
		document.getElementById('transX').innerHTML = myTransX;
		document.getElementById('transY').innerHTML = myTransY;
	}

	//send our drawing EVERY time draw loops through
	//value that we pass in is a JSON object
	sendDrawing({
		'x': mouseX + myTransX,
		'y': mouseY + myTransY,
		'x': mouseX + myTransX,
		'y': mouseY + myTransY,
		'r': myFillR,
		'g': myFillG,
		'b': myFillB
	});

}

//SEND MY DRAWING DATA 
//'message' is a JSON object that includes x, y, r, g, b
function sendDrawing(message){
	socket.emit('drawing', message);
	// console.log(message);
}

function drawOther(someX, someY, someR, someG, someB){
	fill(someR, someG, someB);
	stroke('darkcyan');
	ellipse(someX, someY, 30, 30);
}




function init(){

	///// ORIENTATION

	// function for orientation
	function handleOrientation(event){
		alpha = Math.floor(event.alpha);
		beta = Math.floor(event.beta);
		gamma = Math.floor(event.gamma);

		//send values to the DOM so that we can see them
		document.getElementById('alpha').innerHTML = alpha;
		document.getElementById('beta').innerHTML = beta;
		document.getElementById('gamma').innerHTML = gamma;

		// socket.emit('orientation', {
		// 	'alpha': alpha,
		// 	'beta': beta,
		// 	'gamma': gamma
		// });
	}

	// event listerner for orientation - built in to js
	window.addEventListener('deviceorientation', handleOrientation, true);



	///// MOTION

	function deviceMotion(event){
		var acc = event.acceleration; //will return acceleration object

		//extract x, y, z from acceleration
		xmotion = Math.abs(acc.x);
		ymotion = Math.abs(acc.y);
		zmotion = Math.abs(acc.z);

		document.getElementById('xmov').innerHTML = Math.floor(xmotion);
		document.getElementById('ymov').innerHTML = Math.floor(ymotion);
		document.getElementById('zmov').innerHTML = Math.floor(zmotion);

	}

	window.addEventListener('devicemotion', deviceMotion, true);


} //end of init function

window.addEventListener('load', init);



