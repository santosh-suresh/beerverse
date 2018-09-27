const servertest = require('servertest')
const util = require('util')

const server = require('./simple_server')

const servertestPromised = util.promisify(servertest)

test('Tests that the server return 200 when visiting home', (done) => {
    servertest(server, '/', { encoding: 'utf8' }, (err, res) => {
        expect(res.statusCode).toBe(200)
        done()
    })
})

test('Tests that the server return 404 when visiting /not-there', (done) => {
    servertest(server, '/not-there', { encoding: 'utf8' }, (err, res) => {
        expect(err).toBeNull()
        expect(res.statusCode).toBe(404)
        done()
    })
})

test('Tests that the server return 404 when visiting /not-there', async () => {
    const res = await servertestPromised(server, '/not-there', { encoding: 'utf8' })
    expect(res.statusCode).toBe(404)

})
