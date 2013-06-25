var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/favicon.ico"] = requestHandlers.favicon;
handle["/start"] = requestHandlers.start;
handle["/addLink"] = requestHandlers.addLink;
handle["/play"] = requestHandlers.play;
handle["/next"] = requestHandlers.next;

server.start(router.route, handle);

