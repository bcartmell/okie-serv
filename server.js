/* jshint node: true */
'use strict';

exports = (function(listenOnPort, defaultPage) {
  const sys = require("sys"),
        http = require("http"),
        path = require("path"),
        url = require("url"),
        filesys = require("fs"),
        mime = require("./serverModules/mime.js");

  listenOnPort = listenOnPort || 8080;
  defaultPage = defaultPage || 'index.html';

  function respond404(response) {
    response.writeHeader(404, {"Content-Type": "text/plain"});
    response.write("404 Not Found\n");
    response.end();
  }

  function postHandler(request, response) {
    request.on('data', function(data) {
      process.stdout.write('received post data: \n'+ data);
    });
  };

  function fetchFile(fullPath, response) {
    filesys.readFile(fullPath, "binary", function(err, file) {
      if(err) {
        respond404(response);
      }
      else {
        let responseType = mime.mimeType[ fullPath.split('.').pop() ];
        if (responseType === undefined) responseType = "text/plain";
        response.writeHeader(200, {"Content-Type": responseType});
        response.write(file, 'binary');
        response.end();
      }
    });
  };

  var serverInstance = http.createServer((request,response) => {
    var requestedPath = url.parse(request.url).pathname;

    if (request.method === 'POST') postHandler(request, response);
    if (requestedPath == "/") requestedPath = defaultPage;

    var fullPath = path.join(process.cwd(),requestedPath);
    fetchFile(fullPath, response);
  });

  return {
    start: function(listenOnPort) {
      serverInstance.listen(listenOnPort, ()=> {
        sys.puts("Server Running on " + listenOnPort);			
      });
    },
    stop: function() {
      serverInstance.close( ()=> { sys.puts('Server closed.'); });
    }
  };
}());
