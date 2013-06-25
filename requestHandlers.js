var fs = require('fs');

var exec = require("child_process").exec;

function start(response) {
	var body = fs.readFileSync('./index.html');

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function addLink(response) {
	console.log("Request handler 'addLink' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello AddLink");
	response.end();
}

exports.start = start;
exports.addLink = addLink;
