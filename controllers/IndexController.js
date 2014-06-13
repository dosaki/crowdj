var fs = require('fs');
var url = require("url");

var exec = require("child_process").exec;

function start(response) {
	var body = fs.readFileSync('views/index.html');

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function favicon(response) {
	var img = fs.readFileSync('img/icon.jpg');
	response.writeHead(200, {"Content-Type": "image/x-icon"});
	response.end(img,'binary');
}

exports.start = start;
exports.favicon = favicon;
