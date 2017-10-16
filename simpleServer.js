var https = require('http');
var util = require('util');
var url = require("url");
path = require("path");

const fs = require('fs');

/*
var options = {
    key: fs.readFileSync("/home/ubuntu/jimmy/mykeys/private.key"),
    cert: fs.readFileSync("/home/ubuntu/jimmy/mykeys/certificate.crt"),//crt
    //ca: [fs.readFileSync("/home/ubuntu/jimmy/mykeys/getacert.cer")]
};
*/

var port = 80;

var server = https.createServer(
                                function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});


/*
var server = https.createServer(options,
                                function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});
*/

/*
server.on('request', function(request, response) {
    response.writeHead(200);
    console.log(request.url);
    console.log(request.method);
    console.log(request.headers);

    console.log(request);
    //console.log(JSON.stringify(request));

    //console.log(request.data.toString());


    response.write('hi');
    response.end();
});
*/

server.on('request', function(request, response) {
   var uri = url.parse(request.url).pathname; 
   var filename = path.join(process.cwd(), uri);
   console.log("filename = "+ filename);

   fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    	if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    	fs.readFile(filename, "binary", function(err, file) {
      	if(err) {
        	response.writeHead(500, {"Content-Type": "text/plain"});
        	response.write(err + "\n");
        	response.end();
        	return;
      	}

      	response.writeHead(200);
     	response.write(file, "binary");
      	response.end();
    	});
    });
});


server.listen(port, function() {
  console.log((new Date()) + " Server is listening on port "+port+":");
});

