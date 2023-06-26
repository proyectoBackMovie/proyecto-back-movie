const supertest = require('supertest')
const app = require('../app')
require('../models')

const BASE_URL = '/api/v1/actors'
let actorId;

test("POST -> 'BASE_URL', should return status code 201", async () => {
    const actor = {
        firstName: "Keanu",
        lastName: "Reeves",
        nationality: "Canadiense",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTkqugX0WLc78TSUXjzYAQvwT7nqU8vJknuJGldrNv0FO7kD8vl",
        birthday: "1964-09-02"
    };

    const res = await supertest(app)
        .post(BASE_URL)
        .send(actor)

    actorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(actor.firstName)
});

test("GET ALL -> 'BASE_URL', should return status code 200 and res.body.length === 1", async () => {
    const res = await supertest(app)
        .get(BASE_URL)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
});

test("GET ONE -> 'BASE_URL/:id', should return status code 200 and res.body.id === actor.id", async () => {
    const res = await supertest(app)
        .get(`${BASE_URL}/${actorId}`)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe("Keanu")
});

test("PUT -> 'BASE_URL/:id', should return status code 200 and res.body.firstName === actor.firstName", async () => {
    const actor = {
        firstName: "Keanu"
    }
    const res = await supertest(app)
        .put(`${BASE_URL}/${actorId}`)
        .send(actor)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(actor.firstName)
});

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await supertest(app)
        .delete(`${BASE_URL}/${actorId}`)
    expect(res.status).toBe(204)
});


