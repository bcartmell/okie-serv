# A very simple server for hosting static content

To use, put the following in you index.js file. 

    var server = require('./okie-serv/server.js').server; 

    // optional - port number to listen on
    var portNumber = 8020                 

    // optional - default page (if not index.html)
    var defaultPage = 'resume.html';      

    server.server.start(portNumber, defaultPage);
