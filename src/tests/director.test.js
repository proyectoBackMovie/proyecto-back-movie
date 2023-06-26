const supertest = require('supertest')
const app = require('../app')
require('../models')
const BASE_URL = '/api/v1/directors'
let directorId;

test("POST -> 'BASE_URL', should return status code 201 and res.body.firstName === director.firstName ", async () => {
    const director = {
        firstName: "Chad",
        lastName: "Stahelski",
        nationality: "Estadounidense",
        image: "https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSerA6pTBnlWm0UbZKk-L0mFrQoZHFLZKeqdZC00GOyLrsFBeLgFNBpSxnAV6WLeReV",
        birthday: "1968-09-20"
    }

    const res = await supertest(app)
        .post(BASE_URL)
        .send(director)
    directorId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(director.firstName)
});

test("GET ALL -> 'BASE_URL', should return status code 200 and res.body.length === 1", async () => {
    const res = await supertest(app)
        .get(BASE_URL)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
});

test("GET ONE -> 'BASE_URL/:id', should return status code 200", async () => {
    const res = await supertest(app)
        .get(`${BASE_URL}/${directorId}`)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe('Chad')
});

test("PUT -> 'BASE_URL/:id', should return status code 200 and res.body.firstName === director.firstName", async () => {
    const director = {
        firstName: "Chad"
    };

    const res = await supertest(app)
        .put(`${BASE_URL}/${directorId}`)
        .send(director)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(director.firstName)
});

test("DELETE -> 'BASE_URL/:id', should return status code 204", async()=>{
    const res = await supertest(app)
        .delete(`${BASE_URL}/${directorId}`)
    expect(res.status).toBe(204)
})
