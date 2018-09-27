const request = require('supertest')
const server = require('./server')

test('Home page shows properly', async () => {
    const response = await request(server()).get('/')
    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toBe('text/html')
    expect(response.text).toBe('Welcome, there is nothing here other than api')
})

test('Health end point returns json with 200', async () => {
    const response = await request(server()).get('/health')
    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toBe('application/json')
    expect(response.body.pid).toBe(process.pid)
})

test('Non existent route would return 404 error', async () => {
    const response = await request(server()).get('/not-there')
    expect(response.statusCode).toBe(404)
})