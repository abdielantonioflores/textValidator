const request = require('supertest')
var chai = require('chai');
const expect = require('chai').expect;
const { assert } = require('chai');
const app = require('../index')
const path = require("path");
// pass this instead of server to avoid error
const API = process.env.API

// Prueba llamada a api sin parametros
describe('/GET Api Response without parameters ', () => {
    it('Validate API test', (done) => {
        request(API)
            .get('/webapi/validate/text/json')
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                console.log(res.body)
                assert.equal(res.body.statusCode, '401')
                done()
            })
    })
})


// Prueba llamada a api con parametros de tipo texto
describe('/GET Api Response with text type parameters', () => {
    it('Validate API test', (done) => {
        request(API)
            .get('/webapi/validate/text/json?text=oso')
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                console.log(res.body)
                assert.equal(res.body.statusCode, '200')
                done()
            })
    })
})

// Prueba llamada a api con parametros de tipo numerico
describe('/GET Api Response with number type parameters ', () => {
    it('Validate API test', (done) => {
        request(API)
            .get('/webapi/validate/text/json?text=123')
            .send({ text: 'test' })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                console.log(res.body)
                assert.equal(res.body.statusCode, '400')
                done()
            })
    })
})