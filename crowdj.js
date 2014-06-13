var server = require("./server/server");
var router = require("./server/router");
var index = require("./controllers/IndexController");
var player = require("./controllers/PlayerController");
var playlist = require("./controllers/PlaylistController");

var handle = {}
handle["/"] = index.start;
handle["/favicon.ico"] = index.favicon;
handle["/start"] = index.start;

//Playlist Management
handle["/playlist/addLink"] = playlist.addLink;

//Player
handle["/player"] = player.play;
handle["/player/play"] = player.play;
handle["/player/next"] = player.next;

server.start(router.route, handle);

