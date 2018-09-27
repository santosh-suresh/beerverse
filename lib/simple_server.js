const http = require('http')

module.exports = server()

function server() {
    return http.createServer(handler)
}

function handler(req, res) {
    statusCode = req.url === '/not-there' ? 404 : 200
    res.writeHead(statusCode, { 'Content-Type': 'text/plain' })
    if (req.url === '/hello') {
        res.write('Hello World')
    }
    res.end()
}