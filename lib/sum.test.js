const sum = require('./sum')

test('Sum of 1 and 2 is 3', () => {
    const value = sum(1, 2)
    expect(value).toBe(3)
})

test('Sum of 2 and -1 is 2', () => {
    const value = sum(2, -1)
    expect(value).toBe(2)
})