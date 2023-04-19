var http = require('http');
var processor = require('./processor.js');
const host = '127.0.0.1';
const port = '3711';

http.createServer(function (request, response) {

    processor.get(request,response);

}).listen(port);

console.log(`Server running at http://127.0.0.1:${port}/`);