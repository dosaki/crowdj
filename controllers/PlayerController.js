var fs = require('fs');

var exec = require("child_process").exec;
var shell = require("shelljs");

function play(response) {
    var song = "Nothing here...";
    shell.exec("head -n 1 playlists/priorityList", function (error, stdout, stderr) {
        var playlist = "None";
        if(stdout == "")
            playlist = "playlists/songList";
        else
            playlist = "playlists/priorityList";

        shell.exec("head -n 1 " + playlist, function (error, stdout, stderr) {
            song = stdout;
            var body = fs.readFileSync('views/player.html').toString();
            body = body.replace('videoLinkHere', song);
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(body);
            response.end();
        });

        //This should rotate the songs on the normal playlist
        if(playlist.indexOf("songList") != -1){
            shell.exec("echo `head -n 1 playlists/songList` >> playlists/songList", function (error, stdout, stderr) {
                //Remove the song from the list
                shell.exec("sed -i -e '1d' " + playlist, function (error, stdout, stderr) {
                });
            });
        }
        else{
            //Remove the song from the list
            shell.exec("sed -i -e '1d' " + playlist, function (error, stdout, stderr) {
            });
        }
    });
}

function next(response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<script>window.open('/player/play','_self')</script>");
    response.end();    
}

exports.play = play;
exports.next = next;
