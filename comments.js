// Create web server
// 1. Create a web server
// 2. Handle requests
// 3. Return responses
// 4. Listen for requests on a specific port
// 5. Get comments from comments.json file
// 6. Display comments in the browser

// 1. Create a web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;
const server = http.createServer(handleRequest);

// 2. Handle requests
function handleRequest(req, res) {
    // 5. Get comments from comments.json file
    if (req.url === '/comments' && req.method === 'GET') {
        fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', function(err, data) {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404);
        res.end('Route not found');
    }
}

// 4. Listen for requests on a specific port
server.listen(port, function() {
    console.log('Server is listening on port ' + port);
});

// 6. Display comments in the browser
// http://localhost:3000/comments
// [{"id":1,"name":"John Doe","comment":"Hello, World!"},{"id":2,"name":"Jane Doe","comment":"Hi, there!"}]