const http = require('http')

module.exports = server()

function server() {
    return http.createServer(handler)
}

function handler(req, res) {
    statusCode = req.url === '/not-there' ? 404 : 200
    res.writeHead(statusCode)
    res.end()
}