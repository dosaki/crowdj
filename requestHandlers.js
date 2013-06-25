var fs = require('fs');
var url = require("url");

var exec = require("child_process").exec;

function validateURL(textval) {
      var urlregex = new RegExp(
            "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
      return urlregex.test(textval);
    }


function start(response) {
	var body = fs.readFileSync('./index.html');

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function addLink(response, getData) {
	response.writeHead(200, {"Content-Type": "text/html"});
	if(validateURL(getData.lnk)) {
		response.write("<h1>Link added successfully!</h1>");
		var hostname = url.parse(getData.lnk, true).hostname;
		if(hostname.indexOf("youtube") !== -1){
			var video = url.parse(getData.lnk, true).query;
			response.write("<iframe width='420' height='315' src='http://www.youtube.com/embed/" + video.v + "' frameborder='0' allowfullscreen></iframe>");

			exec("echo " + video.v + " >> songList", function (error, stdout, stderr) {});
		}
	}
	else{
		response.write("Invalid URL: " + getData.lnk);
	}
	response.end();
}

function favicon(response) {
	var img = fs.readFileSync('./img/icon.jpg');
	response.writeHead(200, {"Content-Type": "image/x-icon"});
	response.end(img,'binary');
}

function play(response) {
	var song = "Nothing here...";

	exec("head -n 1 songList", function (error, stdout, stderr) {
		song = stdout;
		var body = fs.readFileSync('./player.html').toString();
		body = body.replace('videoLinkHere', song);
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(body);
		response.end();
	});
}

function next(response) {
	exec("sed -i -e '1d' songList", function (error, stdout, stderr) {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("<script>window.open('/play','_self')</script>");
		response.end();
	});
}

exports.start = start;
exports.addLink = addLink;
exports.favicon = favicon;
exports.play = play;
exports.next = next;
