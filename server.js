// HTTP Portion
var http = require('http');
var fs = require('fs');
var url = require('url');

function requestHandler(req, res) {

	// var parsedUrl = url.parse(req.url);
	// //console.log("The Request is: " + parsedUrl.pathname);
		
	// fs.readFile(__dirname + parsedUrl.pathname, 
	// 	function (err, data) {
	// 		if (err) {
	// 			res.writeHead(500);
	// 			return res.end('Error loading ' + parsedUrl.pathname);
	// 		}
	// 		res.writeHead(200);
	// 		res.end(data);
 //  		}
 //  	);

 	var parsedUrl = url.parse(req.url);

	var path = parsedUrl.pathname;
	
	if (path == "/") {
		path = "/index.html";
		console.log("path: " + __dirname + path);
	}

	fs.readFile(__dirname + path,

		// Callback function for reading
		function (err, fileContents) {
			// if there is an error
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + req.url);
			}
			// Otherwise, send the data, the contents of the file
			res.writeHead(200);
			res.end(fileContents);
  		}
  	);	
	
	// Send a log message to the console
	console.log("Got a request " + req.url);
}

var httpServer = http.createServer(requestHandler);
httpServer.listen(8080);




// WEBSOCKET PORTION

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', 

	function (socket) {
	
		console.log("We have a new client: " + socket.id);
		
		///MY SOCKET EVENTS HERE
		//listen for 'drawing' event from client
		socket.on('drawing', function(data){
			//console log to make sure we're getting data
			// console.log(data);

			//send this drawing data to EVERYONE
			//don't need to send back to the client it came from
			socket.broadcast.emit('otherdrawing', data);
		});

		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
			
		});
	}
);