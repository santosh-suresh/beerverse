module.exports = {
    health
}

function health(opts = {}, fn = (cb) => { cb(null) }) {
    return function (req, res) {
        fn(function (err) {
            const sysHealth = {
                ts: new Date(),
                pid: process.pid,
                uptime: process.uptime(),
                memory: process.memoryUsage(),
                status: err ? 'Error' : 'OK'
            }
            const health = Object.assign(sysHealth, opts)
            const status = err ? 500 : 200
            res.writeHead(status, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(health))
        })
    }
}