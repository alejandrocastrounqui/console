var https           = require('https');
var http            = require('http');

var configuration = {
  port: 8080
};

var requests = [];

var server = http.createServer(function(request, response){
  if (request.url == '/') {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('console app');
  }
  else if (request.url.indexOf('/console') == 0) {
    text = '';
    for(var index = 0; index < requests.length; index ++){
      text += requests[index] + '<br/>';
    }
    response.writeHead(200, {'Content-Type': 'text/html'});
    
    console.log("[INFO] - console " + text);
    response.end(text);
  }
  else if (request.url.indexOf('/reset') == 0) {
    requests = [];
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('reset succesfully');
  }
  else {
    console.log("[INFO] - pushing " + request.url);
    requests.push(request.url);
    response.writeHead(200);
    response.end(request.url);
  }
});

console.log("[INFO] - Listening on port " + configuration.port);

server.listen(configuration.port);