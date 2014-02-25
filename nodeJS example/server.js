var http = require("http");
var url = require("url");

// for nodeJS cluster
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;


function start(route, handle) {

	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		
		var postData = "";
		request.setEncoding("utf8");
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Receive data chunk '" + postDataChunk + "' .");
		})
		
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		})

	}
	
	http.createServer(onRequest).listen(8888);
	
		
}


exports.start = start;





// function start(route, handle) {
// 
// 	if (cluster.isMaster) {	// master
// 		for (var i = 0; i < numCPUs; i++) {
// 			var worker = cluster.fork();
// 			console.log('... worker ' + worker.process.pid + ' initiated');
// 		}
// 		cluster.on('exit', function(worker, code, signal) {
//     		console.log('worker ' + worker.process.pid + ' died');
//   		});
// 	} else {	// worker
// 	
// 		function onRequest(request, response) {
// 			var pathname = url.parse(request.url).pathname;
// 			console.log("Request for " + pathname + " received.");
// 			
// 			var postData = "";
// 			request.setEncoding("utf8");
// 			request.addListener("data", function(postDataChunk) {
// 				postData += postDataChunk;
// 				console.log("Receive data chunk '" + postDataChunk + "' .");
// 			})
// 			
// 			request.addListener("end", function() {
// 				route(handle, pathname, response, postData);
// 			})
// 
// 		}
// 	
// 		http.createServer(onRequest).listen(8888);
// 	}
// 		
// }
