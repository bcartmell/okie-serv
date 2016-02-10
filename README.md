# A very simple server for hosting static content

To use, put the following in you index.js file. 

    var server = require('./okie-serv/server.js'); 
    var portNumber = 8020                 // optional - port number to listen on
    var defaultPage = 'resume.html';      // optional - default page (if not index.html)
    server.server.start(portNumber, defaultPage);
