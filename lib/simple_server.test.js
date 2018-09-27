const request = require('supertest')
const util = require('util')

const server = require('./simple_server')

// const servertestPromised = util.promisify(servertest)

test('Tests that the server return 200 when visiting home', (done) => {
    request(server)
        .get('/')
        .expect('Content-Type', 'text/plain')
        .expect(200, done)
})

test('Tests that the server return 404 when visiting /not-there', (done) => {
    request(server)
        .get('/not-there')
        .expect('Content-Type', 'text/plain')
        .expect(404, done)

})

test('Test using async/await', async () => {
    const response = await request(server).get('/hello')
    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toBe('text/plain')
    expect(response.text).toBe('Hello World')
})
