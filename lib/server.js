const http = require('http')
const hashRouter = require('http-hash-router')
const URL = require('url')

const router = hashRouter()

router.set('/favicon.ico', empty)
router.set('/', welcome)
router.set('/health', health)
module.exports = server

function server() {
    return http.createServer(handler)
}

function handler(req, res) {
    router(req, res, { query: getQuery(req.url) }, onError)

    function onError(err) {
        if (err) {
            res.statusCode = err.statusCode || 500
            res.end(err.message)
        }
    }
}

function empty(req, res) {
    res.writeHead(204)
    res.end()
}

function welcome(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('Welcome, there is nothing here other than api')
}

function health(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    const health = {
        ts: new Date(),
        pid: process.pid,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        status: 'OK'
    }
    res.end(JSON.stringify(health))
}


function getQuery(url) {
    return URL.parse(url, true).query
}