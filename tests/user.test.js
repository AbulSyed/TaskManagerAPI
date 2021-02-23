const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async () => {
  await request(app).post('/users').send({
    name: 'Abul',
    email: 'abul@mail.com',
    password: 'test1234'
  }).expect(201)
})