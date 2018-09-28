const request = require('supertest')
const http = require('http')

const { health } = require('./health')

test('Health end point returns json with 200', async () => {
    var server = http.createServer(health())
    const response = await request(server).get('/health')
    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toBe('application/json')
    const { status, memory, ts, pid, version } = response.body
    expect(pid).toBe(process.pid)
    expect(status).toBeDefined()
    expect(memory).toBeDefined()
    expect(ts).toBeDefined()
    server.close()
})

test('Health end point returns custom properties with 200', async () => {
    var server = http.createServer(health({ version: '1.0' }))
    const response = await request(server).get('/health')
    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toBe('application/json')
    const { status, memory, ts, pid, version } = response.body
    expect(pid).toBe(process.pid)
    expect(version).toBe('1.0')
    expect(status).toBeDefined()
    expect(memory).toBeDefined()
    expect(ts).toBeDefined()
    server.close()
})

test('Health end point returns error with failing callback', async () => {
    var server = http.createServer(health({ version: '1.0' }, (cb) => cb(new Error('Bad!!'))))
    const response = await request(server).get('/health')
    expect(response.statusCode).toBe(500)
    expect(response.headers['content-type']).toBe('application/json')
    const { status, memory, ts, pid, version } = response.body
    expect(pid).toBe(process.pid)
    expect(version).toBe('1.0')
    expect(status).toBe('Error')
    expect(memory).toBeDefined()
    expect(ts).toBeDefined()
    server.close()
})
