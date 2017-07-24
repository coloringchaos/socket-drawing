// P5 STUFF

// //prevent scrolling of the page
document.ontouchmove = function(event){
	event.preventDefault();
}

//create color variables to store rgb for each client
//we will send this to the server!
var myFillR, myFillG, myFillB;


function setup() {
	createCanvas(windowWidth, windowHeight);
	
	/*for drawing things, usually 
	have background in setup */
	background('darkcyan'); 

	//generate a random color for each color var
	myFillR = floor(random(0, 255));
	myFillG = floor(random(0, 255));
	myFillB = floor(random(0, 255));
}

function draw() {
	stroke('darkcyan');
	fill(myFillR, myFillG, myFillB);
	ellipse(mouseX, mouseY, 30, 30);

	//send our drawing EVERY time draw loops through
	//value that we pass in is a JSON object
	sendDrawing({
		'x': mouseX,
		'y': mouseY,
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




